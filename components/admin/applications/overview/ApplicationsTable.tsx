import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ApplicantIdentity from "./ApplicantIdentity";
import StatusBadge from "./StatusBadge";
import { formatDate, type ApplicationRow } from "./utils";

export default function ApplicationsTable({
  applications,
}: {
  applications: ApplicationRow[];
}) {
  return (
    <div className="hidden overflow-x-auto xl:block">
      <table className="w-full text-left text-sm">
        <thead className="border-y border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-6 py-4 font-semibold">Applicant</th>
            <th className="px-4 py-4 font-semibold">NIC</th>
            <th className="px-4 py-4 font-semibold">Programme</th>
            <th className="px-4 py-4 font-semibold">Submitted</th>
            <th className="px-4 py-4 font-semibold">Status</th>
            <th className="px-6 py-4">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {applications.map((application) => (
            <tr
              key={application.id}
              className="group transition-colors hover:bg-[#2f62b5]/[0.04]"
            >
              <td className="max-w-64 px-6 py-4">
                <ApplicantIdentity application={application} />
              </td>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-600">
                {application.nic_passport_number ?? "—"}
              </td>
              <td className="px-4 py-4 text-slate-600">
                <div className="space-y-1">
                  {application.selected_programmes.length > 0 ? (
                    application.selected_programmes.map((programme) => (
                      <div
                        key={programme.programme_code}
                        className="text-sm text-slate-600"
                      >
                        {programme.programme_label}
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                {formatDate(application.submitted_at)}
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={application.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/admin/applications/${application.id}`}
                  aria-label={`View application from ${application.full_name}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#0f1a2b] transition-colors hover:!bg-[#274f94] hover:text-white group-hover:bg-[#2f62b5] group-hover:text-white"
                >
                  <ArrowRight size={17} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
