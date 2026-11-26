import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ApplicantIdentity from "./ApplicantIdentity";
import StatusBadge from "./StatusBadge";
import { formatDate, type ApplicationRow } from "./utils";

export default function ApplicationCards({
  applications,
}: {
  applications: ApplicationRow[];
}) {
  return (
    <ul className="grid gap-3 px-4 pb-4 md:grid-cols-2 md:px-6 md:pb-6 xl:hidden">
      {applications.map((application) => (
        <li key={application.id} className="min-w-0">
          <Link
            href={`/admin/applications/${application.id}`}
            className="flex h-full flex-col gap-4 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-[#2f62b5]/[0.07]"
          >
            <ApplicantIdentity application={application} />

            <div className="text-sm">
              <p className="font-medium text-[#0f1a2b]">
                {application.programme_interest ?? "—"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {application.reference_number ?? "—"} ·{" "}
                {formatDate(application.submitted_at)}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <StatusBadge status={application.status} />
              <ArrowRight size={17} className="text-[#2f62b5]" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}