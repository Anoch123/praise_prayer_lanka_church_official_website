
import {
  CalendarDays,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";

import {
  formatDate,
  getInitials,
  statusColors,
} from "./utils";

import type {
  SeminaryApplicationProgramme,
} from "@/lib/types/helper.type";

interface ApplicationHeroProps {
  name: string;
  reference: string | null | undefined;
  status: string;
  programme: SeminaryApplicationProgramme[];
  submittedAt: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
}

const actionClass =
  "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors";

export default function ApplicationHero({
  name,
  reference,
  status,
  programme,
  submittedAt,
  email,
  phone,
}: ApplicationHeroProps) {
  return (
    <header className="relative isolate overflow-hidden rounded-3xl bg-[#0f1a2b] p-6 text-white md:p-8">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-[#2f62b5]/45 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
      />

      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <span
          aria-hidden="true"
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#2f62b5] text-2xl font-semibold"
        >
          {getInitials(name)}
        </span>

        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0f1a2b]">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  statusColors[status] ?? "#64748b",
              }}
            />
            {status.replaceAll("_", " ")}
          </span>

          <h1 className="mt-3 break-words text-2xl font-semibold tracking-tight md:text-3xl">
            {name}
          </h1>

          <p className="mt-1 text-sm text-slate-300">
            Reference / NIC / Passport: {reference ?? "Not assigned"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {email && (
            <a
              href={`mailto:${email}`}
              className={`${actionClass} bg-white text-[#0f1a2b] hover:bg-slate-200`}
            >
              <Mail size={17} />
              Email
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className={`${actionClass} bg-white/10 text-white hover:bg-white/20`}
            >
              <Phone size={17} />
              Call
            </a>
          )}
        </div>
      </div>

      <dl className="mt-8 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <GraduationCap
            size={20}
            className="shrink-0 text-[#9cc0ee]"
          />

          <div>
            <dt className="text-xs text-slate-400">
              Selected Programmes
            </dt>

            <dd className="mt-2">
              {programme.length > 0 ? (
                <ul className="space-y-2">
                  {programme.map((item) => (
                    <li
                      key={`${item.application_id}-${item.programme_code}`}
                      className="font-semibold text-white"
                    >
                      {item.programme_label}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-sm text-slate-400">
                  No programmes selected
                </span>
              )}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CalendarDays
            size={20}
            className="shrink-0 text-[#9cc0ee]"
          />

          <div>
            <dt className="text-xs text-slate-400">
              Submitted Date
            </dt>

            <dd className="mt-1 font-semibold">
              {formatDate(submittedAt)}
            </dd>
          </div>
        </div>
      </dl>
    </header>
  );
}
