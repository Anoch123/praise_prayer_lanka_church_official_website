
"use client";

import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  seminaryEnrollmentSchema,
  type SeminaryEnrollmentFormValues,
} from "@/lib/validations/seminary-enrollment.schema";

import type {
  EnrollmentApiResponse,
  EnrollmentResult,
} from "@/lib/types/helper.type";

import {
  defaultValues,
  PROGRAMME_VALUE_TO_CODE,
} from "@/lib/constants/helper_data";

interface NicCheckResponse {
  success: boolean;
  exists?: boolean;
  message?: string;
}

export function useSeminaryEnrollment() {
  const [result, setResult] = useState<EnrollmentResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isCheckingNic, setIsCheckingNic] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string | null>(null);

  const nicCheckRequest = useRef(0);

  const form = useForm<SeminaryEnrollmentFormValues>({
    resolver: zodResolver(seminaryEnrollmentSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  // Check whether the NIC / Passport number already exists.
  const checkNicPassport = async (nic: string): Promise<boolean> => {
    const normalizedNic = nic.trim();

    // NIC / Passport is optional.
    if (!normalizedNic) {
      return true;
    }

    const requestId = ++nicCheckRequest.current;

    setIsCheckingNic(true);
    form.clearErrors("nicPassport");

    try {
      const response = await fetch("/api/enrollment/check-nic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nic_passport_number: normalizedNic,
        }),
      });

      const data = (await response.json()) as NicCheckResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to verify NIC / Passport number.",
        );
      }

      // Ignore outdated responses.
      if (requestId !== nicCheckRequest.current) {
        return false;
      }

      if (data.exists) {
        form.setError("nicPassport", {
          type: "server",
          message:
            "An application with this NIC / Passport number already exists.",
        });

        return false;
      }

      form.clearErrors("nicPassport");

      return true;
    } catch (error) {
      if (requestId === nicCheckRequest.current) {
        form.setError("nicPassport", {
          type: "server",
          message:
            error instanceof Error
              ? error.message
              : "Unable to verify NIC / Passport number.",
        });
      }

      return false;
    } finally {
      if (requestId === nicCheckRequest.current) {
        setIsCheckingNic(false);
      }
    }
  };

  const onSubmit: SubmitHandler<SeminaryEnrollmentFormValues> = async (
    values,
  ) => {
    setSubmissionError(null);
    setResult(null);

    // Perform the final duplicate check only when a number was supplied.
    const nicPassport = values.nicPassport.trim();

    if (nicPassport) {
      const nicAvailable = await checkNicPassport(nicPassport);

      if (!nicAvailable) {
        return;
      }
    }

    const requestKey = idempotencyKey ?? crypto.randomUUID();

    setIdempotencyKey(requestKey);

    const selectedProgrammeCodes = values.programme.map(
      (programme) => PROGRAMME_VALUE_TO_CODE[programme],
    );

    const application = {
      full_name: values.fullName,
      date_of_birth: values.dob,
      nic_passport_number: nicPassport,
      nationality: values.nationality,
      residential_address: values.address,
      district_city: values.district,
      postal_code: values.postalCode,
      mobile_whatsapp: values.mobile,
      email: values.email,
      preferred_language: values.language,
      programme_interest: selectedProgrammeCodes[0] ?? "",

      highest_qualification: values.qualification,
      institution_name: values.institution,
      year_completed: values.yearCompleted,
      field_of_study: values.fieldOfStudy,
      other_theological_training: values.otherTraining,

      programmes: selectedProgrammeCodes,

      preferred_starting_period: values.startPeriod,
      heard_about_heartland: values.heardFrom,

      current_church: values.church,
      denomination_affiliation: values.denomination,
      church_address: values.churchAddress,
      church_pastor_name: values.pastor,
      ministry_role: values.role,
      years_in_church_ministry: values.yearsInMinistry,
      current_ministry_setting: values.ministrySetting,

      spiritual_background: values.spiritualFormation,
      theological_study_purpose: values.purpose,

      declaration_accepted: values.declaration,
      declaration_signed_name: values.signature,
      declaration_date: values.signDate,
    };

    const references = [
      {
        reference_type: "CHURCH_ENDORSEMENT",
        referee_name: values.endorsementName,
        referee_email: values.endorsementEmail,
        referee_phone: values.endorsementPhone,
      },
      {
        reference_type: "PASTORAL_RECOMMENDATION",
        referee_name: values.recommendName,
        referee_email: values.recommendEmail,
        referee_phone: values.recommendPhone,
      },
    ];

    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idempotency_key: requestKey,
          application,
          references,
        }),
      });

      const data = (await response.json()) as EnrollmentApiResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to submit your application. Please try again.",
        );
      }

      if (!data.application_id || !data.reference_number) {
        throw new Error(
          "The application response was incomplete. Please contact the seminary.",
        );
      }

      setResult({
        success: true,
        duplicate: Boolean(data.duplicate),
        application_id: data.application_id,
        reference_number: data.reference_number,
      });

      setIdempotencyKey(null);
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );

      // Retain the idempotency key for a safe retry.
    }
  };

  const resetEnrollment = () => {
    nicCheckRequest.current += 1;

    form.reset(defaultValues);

    setResult(null);
    setSubmissionError(null);
    setIdempotencyKey(null);
    setIsCheckingNic(false);
  };

  return {
    form,
    onSubmit,
    result,
    submissionError,
    isSubmitting: form.formState.isSubmitting,
    resetEnrollment,
    checkNicPassport,
    isCheckingNic,
  };
}
