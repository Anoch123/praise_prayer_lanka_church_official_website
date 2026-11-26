"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useSeminaryEnrollment } from "@/hooks/useSeminaryEnrollment";

import {
  Check,
  Field,
  PageFooter,
  SectionBar,
  SelectField,
  TextArea,
} from "../FormControls";

import EnrollmentResult from "../EnrollmentResult";
import { getTodayISO } from "@/lib/utils/common-functions";
import { EnrollmentFormProps } from "@/lib/types/helper.type";

const PDF_HREF =
  "/forms/Heartland_Theological_Seminary_Sri_Lanka_Enrollment_Application.pdf";

export default function EnrollmentForm({ fontClassName }: EnrollmentFormProps) {
  const {
    form,
    onSubmit,
    result,
    submissionError,
    isSubmitting,
    resetEnrollment,
  } = useSeminaryEnrollment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(getTodayISO());
  }, []);

  const formErrorCount = Object.keys(errors).length;

  return (
    <main
      className={`${fontClassName} min-h-screen bg-[#eef1f6] px-4 py-10 text-[#1b2a41]`}
    >
      {/* Download bar */}
      <div className="mx-auto mb-6 flex max-w-[860px] flex-wrap items-center justify-between gap-3">
        <p className="text-[14px] text-[#4b5565]">
          Prefer to fill it in by hand? Download the printable copy.
        </p>

        <a
          href={PDF_HREF}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-[#1b2a41] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#e8b923] hover:text-[#1b2a41]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download form (PDF)
        </a>
      </div>

      {/* Successful submission */}
      {result ? (
        <EnrollmentResult
          referenceNumber={result.reference_number}
          onNewApplication={resetEnrollment}
        />
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex max-w-[860px] flex-col gap-8"
        >
          {/* Validation summary */}
          {formErrorCount > 0 && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
            >
              <p className="font-bold">Please review your application.</p>

              <p className="mt-1">
                There {formErrorCount === 1 ? "is" : "are"} {formErrorCount}{" "}
                validation {formErrorCount === 1 ? "issue" : "issues"}. Please
                correct the highlighted fields before submitting.
              </p>
            </div>
          )}

          {/* ================= PAGE 1 ================= */}
          <section className="rounded-sm bg-white px-6 pb-8 pt-10 shadow-[0_8px_30px_rgba(27,42,65,0.10)] sm:px-[44px]">
            <header className="flex items-center gap-4 border-b-[5px] border-[#e8b923] pb-5 sm:gap-6">
              <Image
                src="/forms/heartland-logo.png"
                alt="Heartland Theological Seminary seal"
                width={84}
                height={84}
                priority
                className="h-[68px] w-[68px] shrink-0 sm:h-[84px] sm:w-[84px]"
              />

              <div>
                <h1 className="text-[26px] font-black uppercase leading-none tracking-[0.005em] text-[#1b2a41] sm:text-[32px]">
                  Heartland
                </h1>

                <p className="mt-1.5 text-[17px] font-bold uppercase leading-tight text-[#1b2a41] sm:text-[24px]">
                  Theological Seminary
                </p>

                <p className="mt-3 text-[11px] font-black uppercase tracking-[0.02em] text-[#9a6c00] sm:mt-4 sm:text-[13px]">
                  Sri Lanka Extension Programme
                </p>

                <p className="mt-2 text-[11px] text-[#4b5565] sm:text-[13.5px]">
                  76, Model Town Road, Moratuwa, Sri Lanka | Tel: +94 11 261
                  1278
                </p>
              </div>
            </header>

            <div className="mt-7">
              <h2 className="text-[25px] font-black uppercase leading-tight text-[#1b2a41] sm:text-[30px]">
                Student Enrollment Application
              </h2>

              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2 text-[13.5px] text-[#4b5565]">
                <span>
                  Complete in BLOCK LETTERS or type directly into the form.
                </span>

                <span className="font-bold">
                  Director: Pastor Anthony Simon
                </span>
              </div>

              <p className="mt-3 text-xs text-[#6b7686]">
                Fields marked with{" "}
                <span className="font-bold text-red-600">*</span> are required.
              </p>
            </div>

            {/* 01 Personal information */}
            <div className="mt-6">
              <SectionBar num="01" title="Personal & Contact Information" />

              <div className="mt-4 flex flex-col gap-4">
                <Field
                  label="Full name (as on official documents)"
                  registration={register("fullName")}
                  error={errors.fullName?.message}
                  required
                  maxLength={150}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Date of birth"
                    type="date"
                    registration={register("dob")}
                    error={errors.dob?.message}
                    required
                    max={today}
                  />

                  <Field
                    label="NIC / Passport no. (if applicable)"
                    registration={register("nicPassport")}
                    error={errors.nicPassport?.message}
                    maxLength={30}
                  />

                  <Field
                    label="Nationality"
                    registration={register("nationality")}
                    error={errors.nationality?.message}
                    maxLength={100}
                  />
                </div>

                <Field
                  label="Residential / mailing address"
                  registration={register("address")}
                  error={errors.address?.message}
                  required
                  maxLength={500}
                />

                <div className="grid gap-4 sm:grid-cols-[1.05fr_0.55fr_0.8fr]">
                  <Field
                    label="District / City"
                    registration={register("district")}
                    error={errors.district?.message}
                    required
                    maxLength={100}
                  />

                  <Field
                    label="Postal code"
                    registration={register("postalCode")}
                    error={errors.postalCode?.message}
                    maxLength={20}
                  />

                  <Field
                    label="Mobile / WhatsApp number"
                    type="tel"
                    registration={register("mobile")}
                    error={errors.mobile?.message}
                    required
                    placeholder="+94..."
                    maxLength={20}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.9fr_1fr]">
                  <Field
                    label="Email address"
                    type="email"
                    registration={register("email")}
                    error={errors.email?.message}
                    required
                    maxLength={254}
                  />

                  <SelectField
                    label="Preferred language"
                    registration={register("language")}
                    error={errors.language?.message}
                    options={[
                      { label: "Select language", value: "" },
                      { label: "English", value: "English" },
                      { label: "Sinhala", value: "Sinhala" },
                      { label: "Tamil", value: "Tamil" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* 02 Educational background */}
            <div className="mt-6">
              <SectionBar num="02" title="Educational Background" />

              <div className="mt-4 flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
                  <Field
                    label="Highest completed qualification"
                    registration={register("qualification")}
                    error={errors.qualification?.message}
                    required
                    maxLength={200}
                  />

                  <Field
                    label="School / College / Seminary"
                    registration={register("institution")}
                    error={errors.institution?.message}
                    required
                    maxLength={200}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-[0.55fr_1.45fr]">
                  <Field
                    label="Year completed"
                    registration={register("yearCompleted")}
                    error={errors.yearCompleted?.message}
                    placeholder="e.g. 2024"
                    maxLength={4}
                    type="text"
                  />

                  <Field
                    label="Field of study / specialization"
                    registration={register("fieldOfStudy")}
                    error={errors.fieldOfStudy?.message}
                    maxLength={200}
                  />
                </div>

                <Field
                  label="Other theological study or training (if any)"
                  registration={register("otherTraining")}
                  error={errors.otherTraining?.message}
                  maxLength={1000}
                />
              </div>
            </div>

            {/* 03 Programme interest */}
            <div className="mt-6">
              <SectionBar num="03" title="Programme Interest" />

              <p className="mt-4 px-1 text-[13.5px] text-[#4b5565]">
                Please indicate the programme you wish to discuss (subject to
                eligibility and availability).
              </p>

              <div className="mt-4 grid gap-x-6 gap-y-4 px-1 sm:grid-cols-2">
                <Check
                  registration={register("programme")}
                  value="Certificate in Ministerial Studies"
                  label="Certificate in Ministerial Studies"
                />

                <Check
                  registration={register("programme")}
                  value="M.A. in Applied Theology"
                  label="M.A. in Applied Theology"
                />

                <Check
                  registration={register("programme")}
                  value="Master of Divinity (M.Div.)"
                  label="Master of Divinity (M.Div.)"
                />

                <Check
                  registration={register("programme")}
                  value="Diploma in theology (Dip.Th)"
                  label="Diploma in theology (Dip.Th.)"
                />

                <Check
                  registration={register("programme")}
                  value="Bachelor of theology (B.Th)"
                  label="Bachelor of theology (B.Th.)"
                />

                <Check
                  registration={register("programme")}
                  value="Doctor of Ministry (D.Min.)"
                  label="Doctor of Ministry (D.Min.)"
                />

                <Check
                  registration={register("programme")}
                  value="unsure"
                  label="Unsure / Request academic advice"
                />
              </div>

              {errors.programme?.message && (
                <p
                  role="alert"
                  className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
                >
                  {errors.programme.message}
                </p>
              )}

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Preferred starting period (month / year)"
                  registration={register("startPeriod")}
                  error={errors.startPeriod?.message}
                  placeholder="e.g. January 2027"
                  maxLength={100}
                />

                <Field
                  label="How did you hear about Heartland?"
                  registration={register("heardFrom")}
                  error={errors.heardFrom?.message}
                  maxLength={200}
                />
              </div>
            </div>

            {/* Office use only */}
            <div className="mt-7 rounded-lg border border-dashed border-[#d9dfe9] bg-[#f8fafc] p-4">
              <p className="text-[12.5px] font-bold text-[#4b5565]">
                For office use only
              </p>

              <p className="mt-1 text-[13px] text-[#6b7686]">
                The seminary will complete the received date and application
                reference number after submission.
              </p>
            </div>

            <PageFooter page={1} />
          </section>

          {/* ================= PAGE 2 ================= */}
          <section className="rounded-sm bg-white px-6 pb-8 pt-10 shadow-[0_8px_30px_rgba(27,42,65,0.10)] sm:px-[44px]">
            <header className="flex items-center gap-4 border-b-[5px] border-[#e8b923] pb-4 sm:gap-5">
              <Image
                src="/forms/heartland-logo.png"
                alt="Heartland Theological Seminary seal"
                width={84}
                height={84}
                className="h-[68px] w-[68px] shrink-0 sm:h-[84px] sm:w-[84px]"
              />

              <div>
                <p className="text-[16px] font-black uppercase leading-tight text-[#1b2a41] sm:text-[20px]">
                  Heartland Theological Seminary
                </p>

                <p className="mt-1 text-[11px] text-[#4b5565] sm:text-[13.5px]">
                  Sri Lanka Extension Programme | 76, Model Town Road, Moratuwa
                </p>

                <p className="text-[11px] text-[#4b5565] sm:text-[13.5px]">
                  Tel: +94 11 261 1278
                </p>
              </div>
            </header>

            <h2 className="mt-7 text-[25px] font-black uppercase leading-tight text-[#1b2a41] sm:text-[30px]">
              Church, Ministry &amp; References
            </h2>

            {/* 04 Church and ministry */}
            <div className="mt-6">
              <SectionBar num="04" title="Church Affiliation & Ministry" />

              <div className="mt-4 flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-[1.75fr_1fr]">
                  <Field
                    label="Current church / congregation"
                    registration={register("church")}
                    error={errors.church?.message}
                    required
                    maxLength={200}
                  />

                  <Field
                    label="Denomination / affiliation"
                    registration={register("denomination")}
                    error={errors.denomination?.message}
                    maxLength={200}
                  />
                </div>

                <Field
                  label="Church address (town / district)"
                  registration={register("churchAddress")}
                  error={errors.churchAddress?.message}
                  required
                  maxLength={500}
                />

                <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr]">
                  <Field
                    label="Church pastor / senior leader"
                    registration={register("pastor")}
                    error={errors.pastor?.message}
                    maxLength={150}
                  />

                  <Field
                    label="Your role / ministry involvement"
                    registration={register("role")}
                    error={errors.role?.message}
                    maxLength={150}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-[0.7fr_1.3fr]">
                  <Field
                    label="Years in church / ministry"
                    registration={register("yearsInMinistry")}
                    error={errors.yearsInMinistry?.message}
                    placeholder="e.g. 5"
                    maxLength={3}
                  />

                  <SelectField
                    label="Current ministry setting"
                    registration={register("ministrySetting")}
                    error={errors.ministrySetting?.message}
                    options={[
                      { label: "Select ministry setting", value: "" },
                      { label: "Church", value: "CHURCH" },
                      { label: "Parachurch", value: "PARACHURCH" },
                      { label: "Other", value: "OTHER" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* 05 Spiritual background */}
            <div className="mt-6">
              <SectionBar num="05" title="Spiritual Background & Purpose" />

              <div className="mt-5 flex flex-col gap-5">
                <TextArea
                  label="Briefly describe your conversion or Christian spiritual formation"
                  registration={register("spiritualFormation")}
                  error={errors.spiritualFormation?.message}
                  required
                  rows={5}
                  maxLength={3000}
                />

                <TextArea
                  label="Why do you want to pursue theological study? What ministry do you hope to develop?"
                  registration={register("purpose")}
                  error={errors.purpose?.message}
                  rows={5}
                  maxLength={3000}
                />
              </div>
            </div>

            {/* 06 References */}
            <div className="mt-6">
              <SectionBar num="06" title="References & Endorsement" />

              <p className="mt-4 px-1 text-[13.5px] text-[#4b5565]">
                Please provide contacts for a church endorsement and a pastoral
                recommendation.
              </p>

              <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_1fr_0.5fr]">
                <Field
                  label="Church endorsement - name / role"
                  registration={register("endorsementName")}
                  error={errors.endorsementName?.message}
                  required
                  maxLength={150}
                />

                <Field
                  label="Email"
                  type="email"
                  registration={register("endorsementEmail")}
                  error={errors.endorsementEmail?.message}
                  required
                  maxLength={254}
                />

                <Field
                  label="Phone"
                  type="tel"
                  registration={register("endorsementPhone")}
                  error={errors.endorsementPhone?.message}
                  required
                  maxLength={20}
                />

                <Field
                  label="Pastoral recommendation - name"
                  registration={register("recommendName")}
                  error={errors.recommendName?.message}
                  required
                  maxLength={150}
                />

                <Field
                  label="Email"
                  type="email"
                  registration={register("recommendEmail")}
                  error={errors.recommendEmail?.message}
                  required
                  maxLength={254}
                />

                <Field
                  label="Phone"
                  type="tel"
                  registration={register("recommendPhone")}
                  error={errors.recommendPhone?.message}
                  required
                  maxLength={20}
                />
              </div>

              <p className="mt-4 px-1 text-[13.5px] text-[#4b5565]">
                Supporting documents: academic transcripts, church endorsement
                and pastoral recommendation.
              </p>
            </div>

            {/* Declaration */}
            <div className="mt-6 rounded-lg bg-[#f8fafc] px-4 py-3">
              <h3 className="text-[14px] font-black uppercase text-[#1b2a41]">
                Applicant Declaration
              </h3>

              <Check
                registration={register("declaration")}
                className="mt-2"
                label="I certify the information is accurate and authorize admission review and referee contact."
              />

              {errors.declaration?.message && (
                <p
                  role="alert"
                  className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
                >
                  {errors.declaration.message}
                </p>
              )}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[2.1fr_1fr]">
              <Field
                label="Applicant signature / typed name"
                registration={register("signature")}
                error={errors.signature?.message}
                required
                maxLength={150}
              />

              <Field
                label="Date"
                type="date"
                registration={register("signDate")}
                error={errors.signDate?.message}
                required
                max={today}
              />
            </div>

            <PageFooter page={2} />
          </section>

          {/* Submission buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3">
            <a
              href={PDF_HREF}
              download
              className="rounded-lg border border-[#1b2a41] px-6 py-3 text-[14px] font-bold text-[#1b2a41] transition hover:bg-[#1b2a41] hover:text-white"
            >
              Download PDF
            </a>

            <button
              type="submit"
              disabled={isSubmitting || Boolean(result)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e8b923] px-8 py-3 text-[14px] font-black uppercase tracking-wide text-[#1b2a41] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1b2a41] border-t-transparent" />
              )}

              {isSubmitting
                ? "Submitting application..."
                : result
                  ? "Application submitted"
                  : "Submit application"}
            </button>
          </div>

          <p className="text-right text-xs text-[#6b7686]">
            Fields marked with <span className="font-bold text-red-600">*</span>{" "}
            are required.
          </p>
        </form>
      )}

      {/* Server submission error */}
      {submissionError && (
        <div
          role="alert"
          className="mx-auto mb-6 max-w-[860px] rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
        >
          <p className="font-bold">Application submission failed</p>
          <p className="mt-1">{submissionError}</p>
          <p className="mt-1">
            Your entered information has been preserved. You can try again.
          </p>
        </div>
      )}
    </main>
  );
}
