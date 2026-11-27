"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  Church,
  FileSignature,
  GraduationCap,
  Inbox,
  Loader2,
  Mail,
  Phone,
  Sparkles,
  User,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import AdminShell from "@/components/admin/layout/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminApplication } from "@/hooks/useAdminApplication";

import type { ApplicationStatus } from "@/lib/types/helper.type";

import ProgrammeList from "../applications/details/ProgrammeList";
import { formatDate } from "../applications/details/utils";

interface ApplicationDetailsProps {
  applicationId: string;
}

const APPLICATION_STATUSES: {
  value: ApplicationStatus;
  label: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  selected: string;
  iconColor: string;
}[] = [
  {
    value: "UNDER_REVIEW",
    label: "Under Review",
    description: "The admissions team is reviewing the application.",
    icon: CalendarClock,
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    selected: "border-amber-600 bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    value: "ACCEPTED",
    label: "Accepted",
    description: "The applicant has been accepted.",
    icon: CheckCircle2,
    badge: "bg-green-50 text-green-700 ring-green-200",
    selected: "border-green-600 bg-green-50",
    iconColor: "text-green-600",
  },
  {
    value: "REJECTED",
    label: "Rejected",
    description: "The application has been rejected.",
    icon: XCircle,
    badge: "bg-red-50 text-red-700 ring-red-200",
    selected: "border-red-600 bg-red-50",
    iconColor: "text-red-600",
  },
];

const getStatus = (value: ApplicationStatus) => {
  if (value === "SUBMITTED") {
    return {
      label: "Submitted",
      badge: "bg-blue-50 text-[#2f62b5] ring-blue-200",
    };
  }

  return APPLICATION_STATUSES.find((item) => item.value === value);
};

type TabId =
  | "personal"
  | "education"
  | "ministry"
  | "calling"
  | "declaration";

const TABS: { id: TabId; label: string; title: string; icon: LucideIcon }[] = [
  { id: "personal", label: "Personal", title: "Personal Information", icon: User },
  { id: "education", label: "Education", title: "Educational Background", icon: BookOpen },
  { id: "ministry", label: "Ministry", title: "Church and Ministry Information", icon: Church },
  { id: "calling", label: "Calling", title: "Spiritual Background", icon: Sparkles },
  { id: "declaration", label: "Declaration", title: "Applicant Declaration", icon: FileSignature },
];

interface Field {
  label: string;
  value: ReactNode;
  wide?: boolean;
}

export default function ApplicationDetails({
  applicationId,
}: ApplicationDetailsProps) {
  const { fullName } = useAdmin();

  const {
    application,
    isLoading,
    error,
    isUpdatingStatus,
    statusUpdateMessage,
    statusUpdateError,
    emailResult,
    updateApplicationStatus,
  } = useAdminApplication(applicationId);

  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus>("UNDER_REVIEW");
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

useEffect(() => {
  if (application) {
    setSelectedStatus(
      application.status === "SUBMITTED"
        ? "UNDER_REVIEW"
        : application.status,
    );
  }
}, [application]);

  const handleConfirm = async () => {
    setIsConfirmOpen(false);

    if (!application || selectedStatus === application.status) {
      return;
    }

    await updateApplicationStatus(selectedStatus);
  };

  const renderDetails = () => {
    if (!application) return null;

    const fields: Record<TabId, Field[]> = {
      personal: [
        { label: "Full Name", value: application.full_name },
        { label: "Date of Birth", value: formatDate(application.date_of_birth) },
        { label: "NIC / Passport Number", value: application.nic_passport_number },
        { label: "Nationality", value: application.nationality },
        { label: "Email Address", value: application.email },
        { label: "Mobile / WhatsApp", value: application.mobile_whatsapp },
        { label: "Preferred Language", value: application.preferred_language },
        { label: "District / City", value: application.district_city },
        { label: "Postal Code", value: application.postal_code },
        { label: "Residential Address", value: application.residential_address, wide: true },
      ],
      education: [
        { label: "Highest Qualification", value: application.highest_qualification },
        { label: "Institution", value: application.institution_name },
        { label: "Year Completed", value: application.year_completed },
        { label: "Field of Study", value: application.field_of_study },
        { label: "Other Theological Training", value: application.other_theological_training, wide: true },
      ],
      ministry: [
        { label: "Current Church", value: application.current_church },
        { label: "Denomination", value: application.denomination_affiliation },
        { label: "Church Pastor", value: application.church_pastor_name },
        { label: "Ministry Role", value: application.ministry_role },
        { label: "Years in Ministry", value: application.years_in_church_ministry },
        { label: "Current Ministry Setting", value: application.current_ministry_setting },
        { label: "Church Address", value: application.church_address, wide: true },
      ],
      calling: [
        { label: "Spiritual Background", value: application.spiritual_background, wide: true },
        { label: "Purpose of Theological Study", value: application.theological_study_purpose, wide: true },
      ],
      declaration: [
        { label: "Declaration Accepted", value: application.declaration_accepted ? "Yes" : "No" },
        { label: "Signed Name", value: application.declaration_signed_name },
        { label: "Declaration Date", value: formatDate(application.declaration_date) },
      ],
    };

    const currentStatus = getStatus(application.status);
    const nextStatus = getStatus(selectedStatus);
    const hasChange = selectedStatus !== application.status;
    const tab = TABS.find((item) => item.id === activeTab) ?? TABS[0];

    const initials = (application.full_name ?? "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return (
      <>
        {/* Applicant header */}
        <header className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2f62b5] to-[#1d3a6e] text-white shadow-sm">
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold ring-1 ring-white/25">
              {initials || <User size={26} />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                  {application.full_name}
                </h1>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${currentStatus?.badge ?? "bg-gray-50 text-gray-700 ring-gray-200"}`}
                >
                  {currentStatus?.label ?? application.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-blue-100">
                {application.nic_passport_number} · Submitted{" "}
                {formatDate(application.submitted_at)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${application.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#2f62b5] transition hover:bg-blue-50"
              >
                <Mail size={16} />
                Email
              </a>
              <a
                href={`tel:${application.mobile_whatsapp}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/30 transition hover:bg-white/20"
              >
                <Phone size={16} />
                Call
              </a>
            </div>
          </div>
        </header>

        <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-6">
            {/* Programme overview */}
            <section className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-5">
              <div className="p-5 sm:p-6 lg:col-span-3">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <GraduationCap size={18} className="text-[#2f62b5]" />
                  Selected Programmes
                </h2>
                <ProgrammeList
                  programmes={application.selected_programmes ?? []}
                />
              </div>

              <div className="border-t border-gray-200 bg-gray-50 p-5 sm:p-6 lg:col-span-2 lg:border-l lg:border-t-0">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <CalendarClock size={18} className="text-[#2f62b5]" />
                  Preferences
                </h2>
                <FieldGrid
                  single
                  items={[
                    { label: "Preferred Starting Period", value: application.preferred_starting_period },
                    { label: "How They Heard About Heartland", value: application.heard_about_heartland },
                  ]}
                />
              </div>
            </section>

            {/* Tabbed application */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <nav
                aria-label="Application sections"
                className="flex gap-1 overflow-x-auto border-b border-gray-200 bg-gray-50 p-2"
              >
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={activeTab === id}
                    onClick={() => setActiveTab(id)}
                    className={`inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2f62b5] ${
                      activeTab === id
                        ? "bg-white text-[#2f62b5] shadow-sm ring-1 ring-gray-200"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </nav>

              <div className="p-5 sm:p-8">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">
                  {tab.title}
                </h2>
                <FieldGrid items={fields[activeTab]} />
              </div>
            </section>
          </div>

          {/* Decision rail */}
          <aside className="space-y-4 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Decision</h2>
              <p className="mt-1 text-sm text-gray-500">
                The applicant is emailed when the status changes.
              </p>

              <fieldset disabled={isUpdatingStatus} className="mt-4 space-y-2">
                <legend className="sr-only">Application Status</legend>

                {APPLICATION_STATUSES.map((status) => {
                  const Icon = status.icon;
                  const isSelected = selectedStatus === status.value;

                  return (
                    <label
                      key={status.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#2f62b5] has-[:focus-visible]:ring-offset-2 ${
                        isSelected
                          ? status.selected
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="application-status"
                        value={status.value}
                        checked={isSelected}
                        onChange={() => setSelectedStatus(status.value)}
                        className="sr-only"
                      />
                      <Icon
                        size={20}
                        className={`shrink-0 ${isSelected ? status.iconColor : "text-gray-400"}`}
                      />
                      <span className="flex-1">
                        <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          {status.label}
                          {application.status === status.value && (
                            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-gray-500 ring-1 ring-gray-200">
                              Current
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500">
                          {status.description}
                        </span>
                      </span>
                      {isSelected && (
                        <Check size={17} className={status.iconColor} />
                      )}
                    </label>
                  );
                })}
              </fieldset>

              <button
                type="button"
                onClick={() => setIsConfirmOpen(true)}
                disabled={isUpdatingStatus || !hasChange}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f62b5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#274f94] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
              >
                {isUpdatingStatus ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Updating Status...
                  </>
                ) : hasChange ? (
                  <>
                    Update to {nextStatus?.label ?? selectedStatus}
                    <ArrowRight size={17} />
                  </>
                ) : (
                  "Select a new status"
                )}
              </button>

              <div aria-live="polite">
                {statusUpdateMessage && (
                  <Notice tone="success" title="Status Updated">
                    {statusUpdateMessage}
                  </Notice>
                )}

                {emailResult?.sent && (
                  <Notice tone="success" title="Email Sent Successfully">
                    {emailResult.message}
                  </Notice>
                )}

                {emailResult && !emailResult.sent && !emailResult.skipped && (
                  <Notice tone="warning" title="Email Delivery Failed">
                    {emailResult.message}
                    <span className="mt-1 block text-xs">
                      The application status has still been updated. You may
                      need to contact the applicant manually.
                    </span>
                  </Notice>
                )}

                {statusUpdateError && (
                  <Notice tone="error" title="Status Update Failed">
                    {statusUpdateError}
                  </Notice>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <h2 className="mb-4 text-sm font-semibold text-gray-900">
                Record
              </h2>
              <FieldGrid
                single
                items={[
                  { label: "Application ID", value: application.id },
                  { label: "Created At", value: formatDate(application.created_at) },
                  { label: "Last Updated", value: formatDate(application.updated_at) },
                ]}
              />
            </section>
          </aside>
        </div>

        {isConfirmOpen && (
          <ConfirmDialog
            title={`Change status to ${nextStatus?.label ?? selectedStatus}?`}
            email={application.email}
            onCancel={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirm}
          />
        )}
      </>
    );
  };

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

      {isLoading && <LoadingSkeleton />}

      {!isLoading && error && (
        <EmptyState title="Unable to Load Application" message={error} isError />
      )}

      {!isLoading && !error && !application && (
        <EmptyState
          title="Application Not Found"
          message="The requested application could not be found. It may have been deleted or the application ID may be invalid."
        />
      )}

      {!isLoading && !error && renderDetails()}
    </AdminShell>
  );
}

function FieldGrid({ items, single }: { items: Field[]; single?: boolean }) {
  return (
    <dl className={`grid gap-x-8 gap-y-5 ${single ? "" : "sm:grid-cols-2"}`}>
      {items.map(({ label, value, wide }) => (
        <div key={label} className={wide && !single ? "sm:col-span-2" : ""}>
          <dt className="text-xs font-medium text-gray-500">{label}</dt>
          <dd className="mt-1 whitespace-pre-line break-words text-sm font-semibold leading-6 text-gray-900">
            {value === null || value === undefined || value === "" ? (
              <span className="font-normal text-gray-400">Not provided</span>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const NOTICE_TONES = {
  success: "border-green-200 bg-green-50 text-green-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-red-200 bg-red-50 text-red-800",
};

function Notice({
  tone,
  title,
  children,
}: {
  tone: keyof typeof NOTICE_TONES;
  title: string;
  children: ReactNode;
}) {
  const Icon = tone === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div className={`mt-3 flex items-start gap-3 rounded-xl border p-3.5 ${NOTICE_TONES[tone]}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div className="min-w-0 break-words">
        <p className="text-sm font-semibold">{title}</p>
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </div>
  );
}

function ConfirmDialog({
  title,
  email,
  onCancel,
  onConfirm,
}: {
  title: string;
  email: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();

    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-status-title"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2f62b5]">
        <Mail size={21} />
      </div>

      <h2 id="confirm-status-title" className="mt-4 text-lg font-semibold text-gray-900">
        {title}
      </h2>
      <p className="mt-2 break-words text-sm leading-6 text-gray-500">
        An email notification will be sent to{" "}
        <strong className="text-gray-800">{email}</strong>.
      </p>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          autoFocus
          onClick={onCancel}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-xl bg-[#2f62b5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#274f94]"
        >
          Confirm and send
        </button>
      </div>
    </dialog>
  );
}

function LoadingSkeleton() {
  return (
    <div role="status" className="mt-4 animate-pulse space-y-6">
      <span className="sr-only">Loading application details...</span>
      <div className="h-32 rounded-2xl bg-gray-200" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-96 rounded-2xl bg-gray-100" />
        <div className="h-80 rounded-2xl bg-gray-100" />
      </div>
    </div>
  );
}

function EmptyState({
  title,
  message,
  isError,
}: {
  title: string;
  message: string;
  isError?: boolean;
}) {
  const Icon = isError ? AlertCircle : Inbox;

  return (
    <div className="mt-6 flex flex-col items-center rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          isError ? "bg-red-50 text-red-600" : "bg-blue-50 text-[#2f62b5]"
        }`}
      >
        <Icon size={23} />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-gray-500">{message}</p>
      <Link
        href="/admin/applications"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2f62b5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#274f94]"
      >
        <ArrowLeft size={16} />
        Back to Applications
      </Link>
    </div>
  );
}