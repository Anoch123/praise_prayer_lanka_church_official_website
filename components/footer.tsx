import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants/navbar";
import { COMMON_TEXTS } from "@/lib/constants/helper_texts";
import { common_images } from "@/lib/constants/common_images";
import { Arrow, Cross } from "./icons";
import { SectionIcon } from "./SectionDecor";
import { WEEKLY_SERVICES } from "@/lib/constants/services";
import { BackToTop, NextGathering, VerseOfTheDay } from "./FooterWidgets";

// TODO: replace "#" with your real social links
const SOCIALS = [
  { name: "facebook", href: "#", label: "Facebook" },
  { name: "youtube", href: "#", label: "YouTube" },
  { name: "instagram", href: "#", label: "Instagram" },
];

const GET_INVOLVED = [
  { label: "Plan a Visit", href: "/plan-a-visit" },
  { label: "Upcoming Events", href: "/calendar" },
  { label: "Watch Sermons", href: "/pplc-sermons" },
  { label: "Give", href: "/give" },
  { label: "Partner With Us", href: "/partner" },
];

function SocialIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    youtube:
      "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z",
    facebook:
      "M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V13h2.7v8h3.2Z",
    instagram:
      "M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 12c0-2.4 0-2.7-.1-3.7-.1-1-.3-1.8-.7-2.4a4 4 0 0 0-1.6-1.6c-.6-.4-1.4-.6-2.4-.7C15.2 3.5 14.9 3.5 12.5 3.5h-1c-2.4 0-2.7 0-3.7.1-1 .1-1.8.3-2.4.7a4 4 0 0 0-1.6 1.6c-.4.6-.6 1.4-.7 2.4C3 8.3 3 8.6 3 11v2c0 2.4 0 2.7.1 3.7.1 1 .3 1.8.7 2.4a4 4 0 0 0 1.6 1.6c.6.4 1.4.6 2.4.7 1 .1 1.3.1 3.7.1h1c2.4 0 2.7 0 3.7-.1 1-.1 1.8-.3 2.4-.7a4 4 0 0 0 1.6-1.6c.4-.6.6-1.4.7-2.4.1-1 .1-1.3.1-3.7Z",
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">
      <span className="h-px w-6 bg-red-500" />
      {children}
    </h3>
  );
}

const linkClass =
  "group inline-flex items-center gap-2 text-[15px] text-stone-300 transition-colors hover:text-white";

  async function TimeZone() {
  "use cache";
  return new Date().getFullYear();
}

export default function Footer() {
  // Flatten the navbar so sub-links (About Us, What We Believe, Calendar…) appear too
  const explore = NAV_LINKS.flatMap((l) => (l.children?.length ? l.children : [l])).filter(
    (l, i, all) => all.findIndex((x) => x.href === l.href && x.label === l.label) === i,
  );

  return (
    <footer className="relative isolate overflow-hidden bg-[#1c1411] text-stone-300">
      {/* ───────── Background designs ───────── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2a1d18] via-[#1c1411] to-[#140d0b]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.045] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-52 top-1/3 -z-10 h-[560px] w-[560px] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute -left-28 top-1/3 -z-10 mt-24 h-[360px] w-[360px] rounded-full border border-red-600/15" />
      <Cross className="pointer-events-none absolute -right-16 top-24 -z-10 h-[520px] w-auto rotate-12 text-white/[0.035]" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-red-600/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-20 md:px-8 md:pt-28">
        {/* ───────── The open door ───────── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-red-400">
              <span className="h-px w-12 bg-red-500" />
              You&apos;re always welcome
            </p>
            <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-[#fbf7f0] sm:text-5xl md:text-6xl">
              The door is always open.
              <span className="block italic text-red-500">A seat is saved for you.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
              Whether you are searching, struggling or simply curious, come as you are.
              You will find a family here.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/plan-a-visit"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ff0000] px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(255,0,0,0.35)] transition-all hover:-translate-y-px hover:bg-red-700"
              >
                Plan Your Visit
                <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
              </Link>
              <Link
                href="/pplc-sermons"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#fbf7f0] transition-colors hover:border-[#fbf7f0] hover:bg-[#fbf7f0] hover:text-[#1c1411]"
              >
                Watch Online
              </Link>
            </div>

            <div className="mt-12 max-w-2xl">
              <VerseOfTheDay />
            </div>
          </div>

          {/* The arched window */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[40px] border border-white/10" />
              <div className="absolute -inset-6 hidden rounded-t-[999px] rounded-b-[48px] border border-white/[0.05] sm:block" />

              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[32px] bg-[#fbf7f0] px-7 pb-8 pt-24 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                {/* Window glow + frame */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.16),transparent_65%)]" />
                <div className="pointer-events-none absolute inset-2.5 rounded-t-[999px] rounded-b-[24px] border border-[#1c1411]/10" />
                <span className="absolute left-1/2 top-8 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_12px_30px_rgba(255,0,0,0.35)]">
                  <Cross className="h-6 w-auto" />
                </span>

                <div className="relative">
                  <NextGathering />

                  <ul className="mt-8 divide-y divide-[#1c1411]/10 border-t border-[#1c1411]/10">
                    {WEEKLY_SERVICES.map((s, i) => (
                      <li key={i} className="flex items-center justify-between gap-3 py-3.5 text-[#1c1411]">
                        <span className="flex items-center gap-3">
                          <span className="text-red-600"><SectionIcon name="clock" size={16} /></span>
                          <span className="font-serif text-[17px] font-semibold">{s.name}</span>
                        </span>
                        <span className="text-sm text-stone-500">
                          {s.dayName} · {s.timeLabel}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────── Links ───────── */}
        <div className="mt-24 grid gap-12 border-t border-white/10 pt-16 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fbf7f0] p-2">
                <Image
                  src={common_images.App_logo}
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
            <p className="mt-6 max-w-xs leading-relaxed text-stone-400">
              A family of faith, hope and love. Come as you are, and find a place to belong.
            </p>

            <ul className="mt-7 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-stone-200 transition-all hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-600 hover:text-white"
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
            <ul className="mt-6 space-y-3.5">
              {explore.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className={linkClass}>
                    <span className="h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <nav aria-label="Footer – get involved" className="lg:col-span-2">
            <ColumnTitle>Get Involved</ColumnTitle>
            <ul className="mt-6 space-y-3.5">
              {GET_INVOLVED.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    <span className="h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit us */}
          <div className="lg:col-span-3">
            <ColumnTitle>Visit Us</ColumnTitle>
            <ul className="mt-6 space-y-5 text-[15px]">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-400"><SectionIcon name="pin" size={18} /></span>
                <span className="leading-snug text-stone-300">{COMMON_TEXTS.Address}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
                <a
                  href={`tel:${COMMON_TEXTS.Phone.replace(/[^\d+]/g, "")}`}
                  className="text-stone-300 transition-colors hover:text-white"
                >
                  {COMMON_TEXTS.Phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ───────── Giant outlined wordmark ───────── */}
      <div className="pointer-events-none mt-16 select-none px-4 text-center" aria-hidden="true">
        <p className="font-serif text-[clamp(2.5rem,10vw,9rem)] font-semibold leading-[0.95] tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]">
          {COMMON_TEXTS.App_name}
        </p>
      </div>

      {/* ───────── Bottom bar ───────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-7 text-center md:flex-row md:px-8 md:text-left">
          <div className="space-y-1 text-sm text-stone-400">
            <p>
              © {TimeZone()} {COMMON_TEXTS.App_name} · {COMMON_TEXTS.Address}
            </p>
            <p>{COMMON_TEXTS.App_name} is a 501(c)(3) non-profit organization</p>
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}