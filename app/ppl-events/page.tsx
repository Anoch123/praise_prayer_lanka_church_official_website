import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { Arrow, Cross, DarkDecor, Divider, Eyebrow, LightDecor, SectionIcon } from "@/components/icon-widgets/icons";
import PageHero from "@/components/page-hero";
import { getUpcomingEvents } from "@/lib/utils/events";
import EventsExplorer from "@/components/EventsExplorer";
import Footer from "@/components/footer";
import { WEEKLY_SERVICES } from "@/lib/constants/helper_data";
import NewToChurch from "@/components/New-to-church";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "Services, prayer nights, youth and children's events and community days. See what's coming up at our church and add it to your calendar.",
};

export const instant = false;

export default async function PPLCEventsPage() {
  await connection();

  const events = getUpcomingEvents();
  const next = events[0];
  const rest = events.slice(1);

  return (
    <>
      <PageHero
        eyebrow="What's On"
        title="Upcoming"
        accent="events."
        description="Services, prayer nights, youth and children's events and community days. There is always something happening, and everyone is welcome."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "EVENTS" }]}
        image={"/images/hero-bg-3000.jpg"}
      />

      {/* ═════════ Next up ═════════ */}
      {next && (
        <section className="relative isolate overflow-hidden bg-[#fbf7f0] px-6 py-16 md:py-24">
          <LightDecor tone="left" />
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <Eyebrow>Next up</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-5xl">
                Mark your <span className="italic text-red-600">calendar</span>
              </h2>
            </div>

            <article className="relative overflow-hidden rounded-[32px] bg-[#1c1411] text-white shadow-[0_40px_80px_rgba(28,20,17,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a1d18] via-[#1c1411] to-[#1c1411]" />
              <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
              <Cross className="pointer-events-none absolute -right-8 top-1/2 h-[420px] w-auto -translate-y-1/2 rotate-12 text-white/[0.05]" />

              <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-12 lg:items-center lg:gap-14">
                {/* Big date */}
                <div className="lg:col-span-3">
                  <div className="inline-flex flex-col items-center justify-center rounded-3xl bg-red-600 px-10 py-8 text-center shadow-[0_20px_50px_rgba(255,0,0,0.3)]">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/80">
                      {next.monthShort}
                    </span>
                    <span className="mt-1 font-serif text-7xl font-semibold leading-none">{next.day}</span>
                    <span className="mt-2 text-[12px] font-semibold uppercase tracking-[0.25em] text-white/80">
                      {next.weekday}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-9">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    {next.category}
                  </span>
                  <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight md:text-5xl">{next.title}</h3>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-300">{next.description}</p>

                  <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-stone-200">
                    <div className="flex items-center gap-3">
                      <span className="text-red-400"><SectionIcon name="clock" size={20} /></span>
                      <dt className="sr-only">Time</dt>
                      <dd>{next.timeLabel}</dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-red-400"><SectionIcon name="pin" size={20} /></span>
                      <dt className="sr-only">Location</dt>
                      <dd>{next.location}</dd>
                    </div>
                  </dl>

                  <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <a
                      href={next.gcalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ff0000] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(255,0,0,0.35)] transition-all hover:-translate-y-px hover:bg-red-700"
                    >
                      <SectionIcon name="plus" size={16} />
                      Add to Calendar
                    </a>
                    {next.href && (
                      <Link
                        href={next.href}
                        className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#fbf7f0] transition-colors hover:border-[#fbf7f0] hover:bg-[#fbf7f0] hover:text-[#1c1411]"
                      >
                        More Info
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ═════════ All upcoming events ═════════ */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-20 md:py-28">
        <LightDecor tone="right" />
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <Eyebrow>{next ? "Coming up" : "Events"}</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              {next ? "More to " : "Upcoming "}
              <span className="italic text-red-600">{next ? "come" : "events"}</span>
            </h2>
            <Divider />
          </div>

          {rest.length ? (
            <EventsExplorer events={rest} />
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-[#fbf7f0] px-6 py-20 text-center">
              <p className="font-serif text-2xl font-semibold text-[#1c1411]">
                {next ? "That's everything for now" : "No upcoming events right now"}
              </p>
              <p className="mt-2 text-stone-500">New events are added regularly. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═════════ Every week ═════════ */}
      <section className="relative isolate overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
        <LightDecor tone="left" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center"><Eyebrow>Our rhythm</Eyebrow></div>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              Every <span className="italic text-red-600">week</span>
            </h2>
            <Divider center />
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
              Our regular gatherings. Drop in any time, no booking needed.
            </p>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WEEKLY_SERVICES.map((w) => (
              <li
                key={w.name}
                className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1c1411] hover:shadow-[0_28px_60px_rgba(28,20,17,0.2)]"
              >
                <Cross className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-auto rotate-12 text-[#1c1411]/[0.045] transition-colors group-hover:text-white/[0.06]" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c1411] text-white transition-colors group-hover:bg-red-600">
                  <SectionIcon name="calendar" size={22} />
                </span>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-red-600 transition-colors group-hover:text-red-400">
                  {w.day}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1c1411] transition-colors group-hover:text-[#fbf7f0]">
                  {w.name}
                </h3>
                <p className="mt-1 font-medium text-[#1c1411] transition-colors group-hover:text-stone-200">{w.timeLabel}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NewToChurch />

      <Footer />
    </>
  );
}