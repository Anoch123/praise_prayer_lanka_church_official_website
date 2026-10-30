import Link from "next/link";
import Navbar from "./Navbar";
import { Arrow, Cross, SectionIcon } from "./icon-widgets/icons";
import { COMMON_TEXTS, WEEKLY_SERVICES } from "@/lib/constants/helper_data";
import { NextGathering } from "./widgets/FooterWidgets";
export default function Header() {
  return (
    <>
      <Navbar />

      <section className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden pt-[84px] md:pt-[124px]">
        {/* Parallax background photo */}
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: `url('/images/hero-bg-3000.jpg')` }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 -z-20 bg-[#1c1411]/60" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#1c1411] via-[#1c1411]/50 to-transparent" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#1c1411] via-transparent to-[#1c1411]/50" />

        {/* Oversized decorative cross */}
        <Cross className="pointer-events-none absolute -left-24 top-1/2 -z-10 hidden h-[640px] w-auto -translate-y-1/2 -rotate-6 text-white/[0.04] xl:block" />

        {/* Main content */}
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 px-6 py-14 md:px-8 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Left: message */}
          <div className="lg:col-span-7">
            <p className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-red-400">
              <span className="h-px w-12 bg-red-500" />
              Welcome to {COMMON_TEXTS.App_name}
            </p>

            <h1 className="mt-6 font-serif text-[44px] font-semibold leading-[1.05] tracking-tight text-[#fbf7f0] sm:text-6xl md:text-7xl xl:text-[84px]">
              A place to belong.
              <span className="block italic text-red-500">
                A people to grow with.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-300 md:text-[19px]">
              We are a Christ-centred community devoted to worshipping God,
              loving one another and serving our city. Wherever you are on your
              journey, there is a seat saved for you and a family ready to
              welcome you.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/40 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#fbf7f0] transition-colors hover:border-[#fbf7f0] hover:bg-[#fbf7f0] hover:text-[#1c1411]"
              >
                Watch Sermons
              </Link>
            </div>

            {/* Quick trust points */}
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-300">
              {[
                "All are welcome",
                "Programs for every age",
                "Join in person or online",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Cross className="h-3 w-auto text-red-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: first-visit card (no video here – messages live in the section below) */}
          <aside
            aria-labelledby="first-visit-heading"
            className="hidden md:flex md:col-span-5 lg:pl-6 xl:pl-12"
          >
            <div className="w-full rounded-3xl bg-[#fbf7f0] p-8 text-[#1c1411] shadow-[0_30px_70px_rgba(0,0,0,0.35)] md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
                New here?
              </p>
              <h2
                id="first-visit-heading"
                className="mt-2 font-serif text-3xl font-semibold leading-tight"
              >
                Join us this Sunday
              </h2>
              <p className="mt-2 text-base leading-relaxed text-stone-700">
                Everyone is welcome. Here is when we meet.
              </p>

              <div className="mt-6">
                <NextGathering />
              </div>

              <ul className="mt-6 divide-y divide-[#1c1411]/10 border-t border-[#1c1411]/10">
                {WEEKLY_SERVICES.map((s, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-1 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-red-700">
                        <SectionIcon name="clock" size={18} />
                      </span>
                      <span className="font-serif text-lg font-semibold">
                        {s.name}
                      </span>
                    </span>
                    <span className="pl-8 text-base text-stone-700 lg:pl-0">
                      {s.dayName} · {s.timeLabel}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Scripture bar */}
        <div className="border-t border-white/10 bg-[#1c1411]/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 md:flex-row md:items-center md:px-8">
            <p className="font-serif text-[17px] italic text-stone-200 md:text-lg">
              &ldquo;For where two or three gather in my name, there am I with
              them.&rdquo;
              <span className="ml-3 font-sans text-[12px] font-semibold not-italic uppercase tracking-[0.2em] text-red-400">
                Matthew 18:20
              </span>
            </p>
            <Link
              href="/calendar"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#fbf7f0] transition-colors hover:text-red-400"
            >
              Upcoming Events
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
