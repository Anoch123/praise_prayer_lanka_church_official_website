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

import type { SeminaryApplicationDetails as Application } from "@/lib/types/helper.type";

import ApplicationHero from "../applications/details/ApplicationHero";
import DetailList from "../applications/details/DetailList";
import DetailSection from "../applications/details/DetailSection";
import ProgrammeList from "../applications/details/ProgrammeList";
import StatusProgress from "../applications/details/StatusProgress";
import { formatDate } from "../applications/details/utils";

interface ApplicationDetailsProps {
  application: Application;
}

export default function ApplicationDetails({
  application,
}: ApplicationDetailsProps) {
  const { fullName } = useAdmin();

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

      <ApplicationHero
        name={application.full_name}
        reference={application.reference_number}
        status={application.status}
        programme={application.programme_interest}
        submittedAt={application.submitted_at}
        email={application.email}
        phone={application.mobile_whatsapp}
      />

      <StatusProgress status={application.status} />

      <div className="grid items-start gap-6 xl:grid-cols-3">
        {/* Applicant details */}
        <div className="space-y-6 xl:col-span-2">
          <DetailSection title="Personal Information" icon={User}>
            <DetailList
              items={[
                { label: "Full Name", value: application.full_name },
                {
                  label: "Date of Birth",
                  value: formatDate(application.date_of_birth),
                },
                {
                  label: "NIC / Passport Number",
                  value: application.nic_passport_number,
                },
                { label: "Nationality", value: application.nationality },
                { label: "Email Address", value: application.email },
                {
                  label: "Mobile / WhatsApp",
                  value: application.mobile_whatsapp,
                },
                {
                  label: "Preferred Language",
                  value: application.preferred_language,
                },
                { label: "District / City", value: application.district_city },
                { label: "Postal Code", value: application.postal_code },
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
                { label: "Institution", value: application.institution_name },
                { label: "Year Completed", value: application.year_completed },
                { label: "Field of Study", value: application.field_of_study },
                {
                  label: "Other Theological Training",
                  value: application.other_theological_training,
                  wide: true,
                },
              ]}
            />
          </DetailSection>

          <DetailSection title="Church and Ministry Information" icon={Church}>
            <DetailList
              items={[
                { label: "Current Church", value: application.current_church },
                {
                  label: "Denomination",
                  value: application.denomination_affiliation,
                },
                {
                  label: "Church Pastor",
                  value: application.church_pastor_name,
                },
                { label: "Ministry Role", value: application.ministry_role },
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

        {/* Summary column */}
        <div className="space-y-6">
          <DetailSection title="Selected Programmes" icon={GraduationCap}>
            <ProgrammeList programmes={application.selected_programmes ?? []} />
          </DetailSection>

          <DetailSection title="Programme Preferences" icon={CalendarClock}>
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

          <DetailSection title="Applicant Declaration" icon={FileSignature}>
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

          <DetailSection title="Administrative Information" icon={ShieldCheck}>
            <DetailList
              columns={1}
              items={[
                { label: "Application ID", value: application.id },
                {
                  label: "Created At",
                  value: formatDate(application.created_at),
                },
                {
                  label: "Last Updated",
                  value: formatDate(application.updated_at),
                },
                { label: "Internal Notes", value: application.internal_notes },
              ]}
            />
          </DetailSection>
        </div>
      </div>
    </AdminShell>
  );
}