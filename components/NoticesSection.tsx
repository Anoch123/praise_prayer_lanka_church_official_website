import Link from "next/link";
import { Arrow, Calendar, Cross, Pin } from "./icon-widgets/icons";
import { parseDate } from "@/lib/utils/common-functions";
import BackgroundDesignConOne from "./design-widgets/background-design-con-one";
import { NOTICES } from "@/lib/constants/helper_data";

export default function NoticesSection() {
  if (!NOTICES?.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
      <BackgroundDesignConOne />
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
            <Cross className="text-red-700" />
            Church News
          </p>
          <h2
            id="notices-heading"
            className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#1c1411] md:text-5xl"
          >
            Notices &amp; <span className="italic text-red-700">announcements</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-700">
            News, reminders and updates from our church family, all in one place.
          </p>
        </div>

        {/* Notice list */}
        <ul className="mx-auto mt-14 flex max-w-4xl flex-col gap-5">
          {NOTICES.map((n, i) => {
            const important = n.tag === "Important";
            const date = parseDate(n.date);

            return (
              <li key={i}>
                <article
                  className={`flex gap-5 rounded-3xl border p-6 md:gap-7 md:p-8 ${
                    important
                      ? "border-red-700/30 bg-red-50"
                      : "border-stone-200 bg-[#fbf7f0]"
                  }`}
                >
                  {/* Date block */}
                  <div
                    className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl text-center text-white md:h-24 md:w-24 ${
                      important ? "bg-red-700" : "bg-[#1c1411]"
                    }`}
                    aria-hidden={date ? undefined : "true"}
                  >
                    {date ? (
                      <>
                        <span className="font-serif text-3xl font-semibold leading-none md:text-4xl">
                          {date.day}
                        </span>
                        <span className="mt-1.5 text-sm font-semibold uppercase tracking-wider text-white/90">
                          {date.month}
                        </span>
                      </>
                    ) : (
                      <Calendar />
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-sm font-semibold ${
                          important
                            ? "bg-red-700 text-white"
                            : "border border-stone-300 bg-white text-[#1c1411]"
                        }`}
                      >
                        {important && <Pin />}
                        {n.tag}
                      </span>
                      <span className="text-base text-stone-600">{n.date}</span>
                    </div>

                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-[#1c1411]">
                      {n.title}
                    </h3>
                    <p className="mt-2 text-lg leading-relaxed text-stone-700">{n.body}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {/* Calendar call to action */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-5 rounded-3xl bg-[#1c1411] p-8 text-center text-white md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-700">
              <Calendar />
            </span>
            <div>
              <p className="font-serif text-2xl font-semibold">
                Want to see what&apos;s coming up?
              </p>
              <p className="mt-1 text-base text-stone-300">
                Find every service, group and event on our calendar.
              </p>
            </div>
          </div>
          <Link
            href="/calendar"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-lg font-semibold text-[#1c1411] transition hover:bg-red-700 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
          >
            View calendar
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}