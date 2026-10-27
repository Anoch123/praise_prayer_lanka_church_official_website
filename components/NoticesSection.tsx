import Link from "next/link";
import { NOTICES } from "@/lib/constants/home";

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5.5 0h3v5.5H14v3H8.5V18h-3V8.5H0v-3h5.5V0Z" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Pin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 2.5l7 7-2.2.7-3.6 3.6.3 4.4-1.7 1.7-4.5-4.5-5.6 5.6-1-1 5.6-5.6-4.5-4.5L5.5 8.2l4.4.3 3.6-3.6.7-2.4Z" />
    </svg>
  );
}

function Calendar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  );
}

// If the date string can be parsed, show it as a day / month block; otherwise show a calendar icon.
function parseDate(input: string): { day: string; month: string } | null {
  const d = new Date(input);
  if (isNaN(d.getTime())) return null;
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}

export default function NoticesSection() {
  if (!NOTICES?.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-20 md:py-28">
      {/* ───────── Background designs ───────── */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1c1411_1px,transparent_1px)] opacity-[0.07] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-48 -right-40 -z-10 h-[560px] w-[560px] rounded-full bg-[#fbf7f0] blur-2xl" />
      <div className="pointer-events-none absolute -right-52 -top-10 -z-10 h-[560px] w-[560px] rounded-full border border-[#1c1411]/[0.07]" />
      <div className="pointer-events-none absolute -right-28 top-14 -z-10 h-[360px] w-[360px] rounded-full border border-red-600/15" />
      <Cross className="pointer-events-none absolute -left-16 bottom-10 -z-10 h-[420px] w-auto -rotate-12 text-[#1c1411]/[0.035]" />
      <Cross className="pointer-events-none absolute right-10 top-24 -z-10 h-[220px] w-auto rotate-12 text-red-600/[0.06]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1c1411]/15 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ───────── Intro ───────── */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-red-600">
              <span className="h-px w-12 bg-red-600" />
              Stay Informed
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-5xl">
              Notices &amp; <span className="italic text-red-600">Announcements</span>
            </h2>

            <div className="mt-6 flex items-center gap-4 text-[#1c1411]/25">
              <span className="h-px w-14 bg-current" />
              <Cross className="text-red-600" />
              <span className="h-px w-14 bg-current" />
            </div>

            <p className="mt-6 max-w-sm text-lg leading-relaxed text-stone-600">
              The latest news, reminders and updates from our church family, so you never
              miss what&apos;s happening.
            </p>

            {/* Calendar card */}
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-[#1c1411] p-7 text-white">
              <Cross className="pointer-events-none absolute -right-3 -top-4 h-36 w-auto rotate-12 text-white/[0.06]" />
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600">
                <Calendar />
              </span>
              <p className="mt-5 font-serif text-2xl font-semibold leading-snug">
                Looking for what&apos;s coming up?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                See every service, group and event in one place.
              </p>
              <Link
                href="/calendar"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1c1411] transition-colors hover:bg-red-600 hover:text-white"
              >
                View Calendar
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Arrow />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ───────── Notice board ───────── */}
        <div className="lg:col-span-8">
          <ul className="flex flex-col gap-5">
            {NOTICES.map((n, i) => {
              const important = n.tag === "Important";
              const date = parseDate(n.date);

              return (
                <li key={i}>
                  <article
                    className={`group relative flex gap-5 overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(28,20,17,0.1)] md:gap-7 md:p-8 ${
                      important
                        ? "border-red-600/25 bg-gradient-to-br from-red-50/70 to-white"
                        : "border-stone-200 bg-[#fbf7f0]"
                    }`}
                  >
                    {/* Accent bar */}
                    <span
                      className={`absolute inset-y-0 left-0 w-1.5 ${
                        important ? "bg-red-600" : "bg-[#1c1411]/15 group-hover:bg-[#1c1411]/40"
                      } transition-colors`}
                    />
                    <Cross
                      className={`pointer-events-none absolute -bottom-4 -right-3 h-28 w-auto rotate-12 ${
                        important ? "text-red-600/[0.07]" : "text-[#1c1411]/[0.04]"
                      }`}
                    />

                    {/* Date block */}
                    <div
                      className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl text-center md:h-24 md:w-24 ${
                        important ? "bg-red-600 text-white" : "bg-[#1c1411] text-white"
                      }`}
                    >
                      {date ? (
                        <>
                          <span className="font-serif text-3xl font-semibold leading-none md:text-4xl">
                            {date.day}
                          </span>
                          <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                            {date.month}
                          </span>
                        </>
                      ) : (
                        <Calendar />
                      )}
                    </div>

                    {/* Content */}
                    <div className="relative min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                            important
                              ? "bg-red-600 text-white"
                              : "border border-[#1c1411]/15 bg-white text-[#1c1411]"
                          }`}
                        >
                          {important && <Pin />}
                          {n.tag}
                        </span>
                        {/* Show the raw date text when it couldn't be parsed into the block */}
                        {!date && <span className="text-sm text-stone-500">{n.date}</span>}
                        {date && <span className="text-sm text-stone-500">{n.date}</span>}
                      </div>

                      <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug text-[#1c1411] md:text-[26px]">
                        {n.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-stone-600">{n.body}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}