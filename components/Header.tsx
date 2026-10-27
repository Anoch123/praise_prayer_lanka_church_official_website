import Link from "next/link";
import Navbar from "./Navbar";
import { Arrow, Cross } from "./icons";
import { common_texts } from "@/lib/constants/common_text";

// TODO: adjust to match your actual first-visit experience
const FIRST_VISIT = [
  {
    title: "Come as you are",
    text: "Dress comfortably. Friendly faces will greet you at the door and help you find your way.",
  },
  {
    title: "Worship together",
    text: "About an hour of uplifting worship, prayer and practical teaching from God's Word.",
  },
  {
    title: "Stay and connect",
    text: "Meet our team over tea after the service and learn about groups and ministries.",
  },
];

const NEXT_GATHERING = "Sunday · 9:00 AM"; // TODO

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
              Welcome to {common_texts.App_name}
            </p>

            <h1 className="mt-6 font-serif text-[44px] font-semibold leading-[1.05] tracking-tight text-[#fbf7f0] sm:text-6xl md:text-7xl xl:text-[84px]">
              A place to belong.
              <span className="block italic text-red-500">A people to grow with.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-300 md:text-[19px]">
              We are a Christ-centred community devoted to worshipping God, loving one
              another and serving our city. Wherever you are on your journey, there is a
              seat saved for you and a family ready to welcome you.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/partner"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ff0000] px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(255,0,0,0.35)] transition-all hover:-translate-y-px hover:bg-red-700"
              >
                Plan Your Visit
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Arrow />
                </span>
              </Link>
              <Link
                href="/sermons"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/40 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#fbf7f0] transition-colors hover:border-[#fbf7f0] hover:bg-[#fbf7f0] hover:text-[#1c1411]"
              >
                Watch Sermons
              </Link>
            </div>

            {/* Quick trust points */}
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-300">
              {["All are welcome", "Programs for every age", "Join in person or online"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <Cross className="h-3 w-auto text-red-500" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Right: first-visit card (no video here – messages live in the section below) */}
          <aside className="hidden md:flex md:col-span-5 lg:pl-6 xl:pl-12">
            <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-8 text-[#fbf7f0] shadow-[0_40px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-9">
              <Cross className="pointer-events-none absolute -right-4 -top-5 h-44 w-auto rotate-12 text-white/[0.06]" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">
                New here?
              </p>
              <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight">
                Your first Sunday with us
              </h2>

              <ol className="mt-7 divide-y divide-white/15">
                {FIRST_VISIT.map((s, i) => (
                  <li key={s.title} className="flex gap-5 py-5 first:pt-0">
                    <span className="font-serif text-lg italic text-red-400">0{i + 1}</span>
                    <div>
                      <p className="font-serif text-xl font-semibold">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-300">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-2 flex items-center justify-between gap-4 border-t border-white/15 pt-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                    Next Gathering
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold">{NEXT_GATHERING}</p>
                </div>
                <Link
                  href="/partner"
                  className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-red-400"
                >
                  What to expect
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <Arrow />
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Scripture bar */}
        <div className="border-t border-white/10 bg-[#1c1411]/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 md:flex-row md:items-center md:px-8">
            <p className="font-serif text-[17px] italic text-stone-200 md:text-lg">
              &ldquo;For where two or three gather in my name, there am I with them.&rdquo;
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