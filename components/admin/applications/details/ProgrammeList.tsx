import type { SeminaryApplicationDetails } from "@/lib/types/helper.type";

import { formatDate } from "./utils";

type Programmes = NonNullable<
  SeminaryApplicationDetails["selected_programmes"]
>;

export default function ProgrammeList({
  programmes,
}: {
  programmes: Programmes;
}) {
  if (programmes.length === 0) {
    return (
      <p className="text-sm italic text-slate-400">
        No selected programmes found.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {programmes.map((programme) => (
        <li
          key={programme.programme_code}
          className="rounded-xl bg-slate-50 p-4"
        >
          <span className="inline-block rounded-md bg-[#2f62b5] px-2 py-1 text-[11px] font-semibold text-white">
            {programme.programme_code}
          </span>
          <p className="mt-3 text-sm font-semibold text-[#0f1a2b]">
            {programme.programme_label}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Selected: {formatDate(programme.created_at)}
          </p>
        </li>
      ))}
    </ul>
  );
}