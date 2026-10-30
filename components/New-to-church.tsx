import Link from "next/link";
import { Arrow, DarkDecor } from "./icon-widgets/icons";

export default function NewToChurch() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1c1411] px-6 py-20 md:py-24">
      <DarkDecor />
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-4xl font-semibold leading-tight text-[#fbf7f0] md:text-5xl">
          New to our church?
          <span className="block italic text-red-500">
            We&apos;d love to meet you.
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-stone-300">
          Pick any event above, or join us on a Sunday. Let us know you&apos;re
          coming and we&apos;ll save you a seat.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/plan-a-visit"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ff0000] px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(255,0,0,0.35)] transition-all hover:-translate-y-px hover:bg-red-700"
          >
            Plan Your Visit
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Arrow />
            </span>
          </Link>
          <Link
            href="/pplc-sermons"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#fbf7f0] transition-colors hover:border-[#fbf7f0] hover:bg-[#fbf7f0] hover:text-[#1c1411]"
          >
            Watch Online
          </Link>
        </div>
      </div>
    </section>
  );
}
