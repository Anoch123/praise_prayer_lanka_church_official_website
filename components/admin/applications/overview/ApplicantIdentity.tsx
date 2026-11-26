import { getInitials, type ApplicationRow } from "./utils";

export default function ApplicantIdentity({
  application,
}: {
  application: ApplicationRow;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2f62b5]/10 text-sm font-semibold text-[#2f62b5]"
      >
        {getInitials(application.full_name)}
      </span>
      <div className="min-w-0">
        <p className="truncate font-semibold text-[#0f1a2b]">
          {application.full_name}
        </p>
        <p className="truncate text-xs text-slate-500">{application.email}</p>
      </div>
    </div>
  );
}