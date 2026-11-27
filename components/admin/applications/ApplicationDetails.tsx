
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarClock,
  Church,
  FileSignature,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import AdminShell from "@/components/admin/layout/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminApplication } from "@/hooks/useAdminApplication";

import ApplicationHero from "../applications/details/ApplicationHero";
import DetailList from "../applications/details/DetailList";
import DetailSection from "../applications/details/DetailSection";
import ProgrammeList from "../applications/details/ProgrammeList";
import StatusProgress from "../applications/details/StatusProgress";
import { formatDate } from "../applications/details/utils";

interface ApplicationDetailsProps {
  applicationId: string;
}

export default function ApplicationDetails({
  applicationId,
}: ApplicationDetailsProps) {
  const { fullName } = useAdmin();

  const {
    application,
    isLoading,
    error,
  } = useAdminApplication(applicationId);

  return (
    <AdminShell
      title="Application Details"
      subtitle="View the complete seminary application"
      adminName={fullName}
    >
      <Link
        href="/admin/applications"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2f62b5] hover:text-[#274f94]"
      >
        <ArrowLeft
          size={17}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to Applications
      </Link>

      {/* Loading State */}
      {isLoading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#2f62b5] border-t-transparent" />
            <p className="text-sm font-medium text-gray-500">
              Loading application details...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to Load Application
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <Link
            href="/admin/applications"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2f62b5] hover:underline"
          >
            <ArrowLeft size={16} />
            Return to Applications
          </Link>
        </div>
      )}

      {/* Not Found State */}
      {!isLoading && !error && !application && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Application Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The requested application could not be found. It may have been
            deleted or the application ID may be invalid.
          </p>

          <Link
            href="/admin/applications"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2f62b5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#274f94]"
          >
            <ArrowLeft size={16} />
            Back to Applications
          </Link>
        </div>
      )}

      {/* Application Details */}
      {!isLoading && !error && application && (
        <>
          <ApplicationHero
            name={application.full_name}
            reference={application.nic_passport_number}
            status={application.status}
            programme={application.selected_programmes}
            submittedAt={application.submitted_at}
            email={application.email}
            phone={application.mobile_whatsapp}
          />

          <StatusProgress status={application.status} />

          <div className="grid items-start gap-6 xl:grid-cols-3">
            {/* Applicant Details */}
            <div className="space-y-6 xl:col-span-2">
              <DetailSection title="Personal Information" icon={User}>
                <DetailList
                  items={[
                    {
                      label: "Full Name",
                      value: application.full_name,
                    },
                    {
                      label: "Date of Birth",
                      value: formatDate(application.date_of_birth),
                    },
                    {
                      label: "NIC / Passport Number",
                      value: application.nic_passport_number,
                    },
                    {
                      label: "Nationality",
                      value: application.nationality,
                    },
                    {
                      label: "Email Address",
                      value: application.email,
                    },
                    {
                      label: "Mobile / WhatsApp",
                      value: application.mobile_whatsapp,
                    },
                    {
                      label: "Preferred Language",
                      value: application.preferred_language,
                    },
                    {
                      label: "District / City",
                      value: application.district_city,
                    },
                    {
                      label: "Postal Code",
                      value: application.postal_code,
                    },
                    {
                      label: "Residential Address",
                      value: application.residential_address,
                      wide: true,
                    },
                  ]}
                />
              </DetailSection>

              <DetailSection title="Educational Background" icon={BookOpen}>
                <DetailList
                  items={[
                    {
                      label: "Highest Qualification",
                      value: application.highest_qualification,
                    },
                    {
                      label: "Institution",
                      value: application.institution_name,
                    },
                    {
                      label: "Year Completed",
                      value: application.year_completed,
                    },
                    {
                      label: "Field of Study",
                      value: application.field_of_study,
                    },
                    {
                      label: "Other Theological Training",
                      value: application.other_theological_training,
                      wide: true,
                    },
                  ]}
                />
              </DetailSection>

              <DetailSection
                title="Church and Ministry Information"
                icon={Church}
              >
                <DetailList
                  items={[
                    {
                      label: "Current Church",
                      value: application.current_church,
                    },
                    {
                      label: "Denomination",
                      value: application.denomination_affiliation,
                    },
                    {
                      label: "Church Pastor",
                      value: application.church_pastor_name,
                    },
                    {
                      label: "Ministry Role",
                      value: application.ministry_role,
                    },
                    {
                      label: "Years in Ministry",
                      value: application.years_in_church_ministry,
                    },
                    {
                      label: "Current Ministry Setting",
                      value: application.current_ministry_setting,
                    },
                    {
                      label: "Church Address",
                      value: application.church_address,
                      wide: true,
                    },
                  ]}
                />
              </DetailSection>

              <DetailSection title="Spiritual Background" icon={Sparkles}>
                <DetailList
                  items={[
                    {
                      label: "Spiritual Background",
                      value: application.spiritual_background,
                      wide: true,
                    },
                    {
                      label: "Purpose of Theological Study",
                      value: application.theological_study_purpose,
                      wide: true,
                    },
                  ]}
                />
              </DetailSection>
            </div>

            {/* Summary Column */}
            <div className="space-y-6">
              <DetailSection title="Selected Programmes" icon={GraduationCap}>
                <ProgrammeList
                  programmes={application.selected_programmes ?? []}
                />
              </DetailSection>

              <DetailSection
                title="Programme Preferences"
                icon={CalendarClock}
              >
                <DetailList
                  columns={1}
                  items={[
                    {
                      label: "Preferred Starting Period",
                      value: application.preferred_starting_period,
                    },
                    {
                      label: "How They Heard About Heartland",
                      value: application.heard_about_heartland,
                    },
                  ]}
                />
              </DetailSection>

              <DetailSection
                title="Applicant Declaration"
                icon={FileSignature}
              >
                <DetailList
                  columns={1}
                  items={[
                    {
                      label: "Declaration Accepted",
                      value: application.declaration_accepted ? "Yes" : "No",
                    },
                    {
                      label: "Signed Name",
                      value: application.declaration_signed_name,
                    },
                    {
                      label: "Declaration Date",
                      value: formatDate(application.declaration_date),
                    },
                  ]}
                />
              </DetailSection>

              <DetailSection
                title="Administrative Information"
                icon={ShieldCheck}
              >
                <DetailList
                  columns={1}
                  items={[
                    {
                      label: "Application ID",
                      value: application.id,
                    },
                    {
                      label: "Created At",
                      value: formatDate(application.created_at),
                    },
                    {
                      label: "Last Updated",
                      value: formatDate(application.updated_at),
                    },
                    // {
                    //   label: "Internal Notes",
                    //   value: application.internal_notes,
                    // },
                  ]}
                />
              </DetailSection>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
