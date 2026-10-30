import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import {
  Arrow,
  ColumnTitle,
  Cross,
  Phone,
  SectionIcon,
  SocialIcon,
} from "./icon-widgets/icons";
import {
  COMMON_TEXTS,
  DEVELOPER_DETAILS,
  GET_INVOLVED,
  NAV_LINKS,
  SOCIALS,
  WEEKLY_SERVICES,
} from "@/lib/constants/helper_data";
import { COMMON_IMAGES } from "@/lib/constants/helper_images";
import { NextGathering, VerseOfTheDay } from "./widgets/FooterWidgets";
import CurrentYear from "@/lib/utils/common-functions";
import BackToTop from "./widgets/BackToTop";

export default function Footer() {
  // Flatten the navbar so sub-links (About Us, What We Believe, Calendar…) appear too
  const explore = NAV_LINKS.flatMap((l) =>
    l.children?.length ? l.children : [l],
  ).filter(
    (l, i, all) =>
      all.findIndex((x) => x.href === l.href && x.label === l.label) === i,
  );

  return (
    <footer className="bg-[#1c1411] text-stone-200">
      <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        {/* ───────── Welcome + service times ───────── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Welcome */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
              <Cross className="text-red-300" />
              You are welcome here
            </p>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#fbf7f0] md:text-5xl">
              Come as you are.
              <span className="block italic text-red-300">
                There is a place for you.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-stone-300 lg:mx-0">
              Whether you are searching, struggling or just curious, you will
              find a caring church family here.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/plan-a-visit"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-red-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
              >
                Plan your visit
                <Arrow />
              </Link>
              <Link
                href="/pplc-sermons"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/50 px-8 py-4 text-lg font-semibold text-[#fbf7f0] transition hover:border-[#fbf7f0] hover:bg-[#fbf7f0] hover:text-[#1c1411] focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
              >
                Watch online
              </Link>
            </div>
          </div>

          {/* Service times card */}
          <div className="rounded-3xl bg-[#fbf7f0] p-7 text-[#1c1411] shadow-xl md:p-8">
            <h3 className="font-serif text-2xl font-semibold">
              Join us for worship
            </h3>
            <p className="mt-1 text-base text-stone-600">
              Our regular service times
            </p>

            <div className="mt-6">
              <NextGathering />
            </div>

            <ul className="mt-6 divide-y divide-[#1c1411]/10 border-t border-[#1c1411]/10">
              {WEEKLY_SERVICES.map((s, i) => (
                <li
                  key={i}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-red-700">
                      <SectionIcon name="clock" size={18} />
                    </span>
                    <span className="font-serif text-lg font-semibold">
                      {s.name}
                    </span>
                  </span>
                  <span className="pl-8 text-base text-stone-700 sm:pl-0">
                    {s.dayName} · {s.timeLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verse */}
        <div className="mx-auto mt-14 max-w-3xl">
          <VerseOfTheDay />
        </div>

        {/* ───────── Links ───────── */}
        <div className="mt-16 grid gap-12 border-t border-white/15 pt-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-4 rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fbf7f0] p-2">
                <Image
                  src={COMMON_IMAGES.App_logo}
                  width={80}
                  height={80}
                  alt={`${COMMON_TEXTS.App_name} logo`}
                  className="h-full w-auto object-contain"
                />
              </span>
              <span className="font-serif text-2xl font-semibold leading-tight text-[#fbf7f0]">
                {COMMON_TEXTS.App_name}
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-stone-300">
              A family of faith, hope and love. Come as you are, and find a
              place to belong.
            </p>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
              Follow us
            </p>
            <ul className="mt-3 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-stone-100 transition hover:border-red-500 hover:bg-red-700 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Footer – explore" className="lg:col-span-3">
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {explore.map((l) =>
                l.label !== "Events" ? (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="inline-block text-base text-stone-200 underline-offset-4 transition-colors hover:text-white hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 rounded"
                      >
                        {l.label}
                      </Link>
                    </li>
                ) : null,
              )}
            </ul>
          </nav>

          {/* Get involved */}
          <nav aria-label="Footer – get involved" className="lg:col-span-2">
            <ColumnTitle>Get involved</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {GET_INVOLVED.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block text-base text-stone-200 underline-offset-4 transition-colors hover:text-white hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <ColumnTitle>Find us</ColumnTitle>
            <ul className="mt-5 space-y-5 text-base">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-300">
                  <SectionIcon name="pin" size={20} />
                </span>
                <span className="leading-snug text-stone-200">
                  {COMMON_TEXTS.Address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone />
                <a
                  href={`tel:${COMMON_TEXTS.Phone.replace(/[^\d+]/g, "")}`}
                  className="inline-block text-base text-stone-200 underline-offset-4 transition-colors hover:text-white hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 rounded"
                >
                  {COMMON_TEXTS.Phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ───────── Bottom bar ───────── */}
      <div className="mt-14 border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-7 text-center md:flex-row md:text-left">
          <div className="space-y-1 text-sm text-stone-300">
            <p>
              ©{" "}
              <Suspense fallback={null}>
                <CurrentYear />
              </Suspense>{" "}
              {COMMON_TEXTS.App_name} · {COMMON_TEXTS.Address}
            </p>
            <a
              href={DEVELOPER_DETAILS.Developer_company}
              className="hover:text-red-300"
            >
              <p>Design & Developed by {DEVELOPER_DETAILS.Develped_by}</p>
            </a>
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
