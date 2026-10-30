import type { Dispatch, SetStateAction } from "react";
import { COMMON_TEXTS } from "@/lib/constants/helper_data";
import { Arrow, Cross } from "../icon-widgets/icons";
import Link from "next/link";

export default function FeaturCardNewHere({
  setOpenDesktopMenu,
}: {
  setOpenDesktopMenu: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <>
      {/* Featured card */}
      <div className="relative col-span-4 overflow-hidden rounded-3xl bg-[#1c1411] p-8 text-white">
        <Cross className="absolute -right-3 -top-4 h-40 w-auto rotate-12 text-white/[0.06]" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">
          New here?
        </p>
        <h3 className="mt-4 font-serif text-[28px] leading-tight">
          There&apos;s a seat saved for you this Sunday.
        </h3>
        <p className="mt-3 text-sm text-stone-400">
          {COMMON_TEXTS.Service_time}
        </p>
        <Link
          href="/plan-a-visit"
          onClick={() => setOpenDesktopMenu(null)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1c1411] transition-colors hover:bg-red-600 hover:text-white"
        >
          Plan your visit <Arrow />
        </Link>
      </div>
    </>
  );
}
