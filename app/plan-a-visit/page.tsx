import type { Metadata } from "next";
import Link from "next/link";
import PlanVisitForm from "@/components/PlanVisitForm";
import { Arrow, Cross, Eyebrow } from "@/components/icons";
import PageHero from "@/components/page-hero";
import { DarkDecor, Divider, LightDecor, SectionIcon } from "@/components/SectionDecor";
import Footer from "@/components/footer";
import { FAQS } from "@/lib/constants/helper_texts";

export const metadata: Metadata = {
  title: "Plan a Visit",
  description:
    "New here? Find our service times and location, see what to expect on your first Sunday, and let us know you're coming.",
};

/* ─────────────────────────────────────────────────────────────────────────────
   EDIT YOUR CONTENT HERE – everything marked TODO should be replaced with your
   church's real details.
   ───────────────────────────────────────────────────────────────────────────── */

const SERVICES = [
  { id: "sun-1", name: "Sunday Worship", day: "Sunday", time: "9:00 AM" }, // TODO
  { id: "sun-2", name: "Sunday Worship", day: "Sunday", time: "11:00 AM" }, // TODO
  { id: "wed", name: "Midweek Prayer", day: "Wednesday", time: "7:00 PM" }, // TODO
];

const ADDRESS_LINE_1 = "123 Church Street"; // TODO
const ADDRESS_LINE_2 = "Your City, Country"; // TODO
const DIRECTIONS_URL = "#"; // TODO: Google Maps link, e.g. https://maps.google.com/?q=...
const MAP_EMBED_URL = ""; // TODO: Google Maps → Share → Embed a map → copy the src="…" URL

const AT_A_GLANCE = [
  { icon: "clock", label: "When", value: "Sundays at 9:00 AM & 11:00 AM" }, // TODO
  { icon: "pin", label: "Where", value: `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}` },
  { icon: "heart", label: "What to wear", value: "Come as you are. Casual or smart, both are welcome." },
  { icon: "smile", label: "Children", value: "Warmly welcomed, with a dedicated programme." }, // TODO
];

const STEPS = [
  { title: "Arrive & be welcomed", text: "Friendly greeters will meet you at the door, answer any questions and show you where to go. Arriving about 10 minutes early helps you settle in." },
  { title: "Worship together", text: "We sing and pray together for about half an hour. Join in or simply listen, whatever feels comfortable." },
  { title: "Hear a message", text: "A practical talk from the Bible, explained in everyday language, for believers and newcomers alike." },
  { title: "Stay for tea", text: "Linger afterwards, meet some of our church family and ask anything on your mind. There is no pressure at all." },
];

const GOOD_TO_KNOW = [
  { icon: "clock", title: "How long?", text: "Around 90 minutes." }, // TODO
  { icon: "car", title: "Parking", text: "Free parking on site. Greeters can direct you." }, // TODO
  { icon: "users", title: "Accessibility", text: "Step-free entrance and accessible facilities." }, // TODO
  { icon: "coffee", title: "Cost", text: "Free. Nobody is expected to give anything." },
];

/* ───────────────────────────────── Page ───────────────────────────────── */

export default function PlanAVisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan a Visit"
        title="We've saved you"
        accent="a seat."
        description="Visiting a church for the first time can feel like a big step. Here is everything you need to know, so you can walk in relaxed and feel at home."
        breadcrumbs={[{ label: "Plan a Visit" }]}
        image={"/images/hero-bg-3000.jpg"}
      />

      {/* ═════════ At a glance ═════════ */}
      <section className="relative isolate overflow-hidden bg-[#fbf7f0] px-6 py-16 md:py-24">
        <LightDecor tone="left" />
        <div className="mx-auto max-w-7xl">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AT_A_GLANCE.map((g) => (
              <li
                key={g.label}
                className="group rounded-3xl border border-stone-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(28,20,17,0.1)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1c1411] text-white transition-colors group-hover:bg-red-600">
                  <SectionIcon name={g.icon} />
                </span>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-600">{g.label}</p>
                <p className="mt-2 font-serif text-xl font-semibold leading-snug text-[#1c1411]">{g.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ First Sunday ═════════ */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-20 md:py-28">
        <LightDecor tone="right" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Your first Sunday</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              What to <span className="italic text-red-600">expect</span>
            </h2>
            <Divider />

            <ol className="relative mt-12">
              <span className="absolute bottom-6 left-7 top-6 w-px bg-gradient-to-b from-red-600 via-[#1c1411]/20 to-transparent" />
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-600 font-serif text-xl font-semibold text-white ring-8 ring-white">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-serif text-2xl font-semibold text-[#1c1411]">{s.title}</h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-stone-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[28px] bg-[#1c1411] p-8 text-white shadow-[0_30px_70px_rgba(28,20,17,0.25)] md:p-10 lg:sticky lg:top-32">
              <Cross className="pointer-events-none absolute -right-4 -top-5 h-44 w-auto rotate-12 text-white/[0.06]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">Before you come</p>
              <h3 className="mt-3 font-serif text-3xl font-semibold">Good to know</h3>

              <ul className="mt-8 divide-y divide-white/15">
                {GOOD_TO_KNOW.map((g) => (
                  <li key={g.title} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-red-400">
                      <SectionIcon name={g.icon} size={20} />
                    </span>
                    <div>
                      <p className="font-serif text-lg font-semibold">{g.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-stone-300">{g.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ═════════ Let us know you're coming ═════════ */}
      <section id="plan" className="relative isolate scroll-mt-24 overflow-hidden bg-[#1c1411] px-6 py-20 md:py-28">
        <DarkDecor />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow light>Let us know</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#fbf7f0] md:text-6xl">
              Tell us you&apos;re <span className="italic text-red-500">coming</span>
            </h2>
            <Divider dark />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-300">
              It&apos;s completely optional, but letting us know means we can have a
              friendly face ready to welcome you.
            </p>

            <ul className="mt-10 space-y-5">
              {[
                "A personal welcome at the door",
                "A seat saved for you and your guests",
                "Help finding the children's programme",
              ].map((t) => (
                <li key={t} className="flex items-center gap-4 text-stone-200">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                    <SectionIcon name="check" size={18} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_40px_80px_rgba(0,0,0,0.4)] md:p-10">
              <PlanVisitForm services={SERVICES} />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ Find us ═════════ */}
      <section className="relative isolate overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
        <LightDecor tone="left" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center"><Eyebrow>Find us</Eyebrow></div>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              Where &amp; <span className="italic text-red-600">when</span>
            </h2>
            <Divider center />
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            {/* Map */}
            <div className="relative lg:col-span-7">
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[30px] bg-[#1c1411] md:-bottom-4 md:-right-4" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-stone-200 ring-1 ring-[#1c1411]/10 md:aspect-video">
                {MAP_EMBED_URL ? (
                  <iframe
                    src={MAP_EMBED_URL}
                    title="Map to our church"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#2a1d18] to-[#1c1411] p-8 text-center text-white">
                    <Cross className="pointer-events-none absolute -right-6 -top-6 h-60 w-auto rotate-12 text-white/[0.05]" />
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                      <SectionIcon name="pin" size={28} />
                    </span>
                    <p className="font-serif text-2xl font-semibold">{ADDRESS_LINE_1}</p>
                    <p className="text-stone-300">{ADDRESS_LINE_2}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Times + address */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_30px_70px_rgba(28,20,17,0.1)]">
                <div className="flex items-center justify-between bg-[#1c1411] px-7 py-6 text-white">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">Join us</p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold">Service Times</h3>
                  </div>
                  <Cross className="h-8 w-auto text-red-500" />
                </div>

                <ul className="divide-y divide-stone-200 px-7">
                  {SERVICES.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-4 py-5">
                      <div>
                        <p className="font-serif text-lg font-semibold text-[#1c1411]">{s.name}</p>
                        <p className="text-sm text-stone-500">{s.day}</p>
                      </div>
                      <span className="rounded-full bg-[#1c1411] px-4 py-1.5 text-[13px] font-semibold tracking-wide text-white">
                        {s.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-stone-200 bg-[#fbf7f0] px-7 py-6">
                  <div className="flex items-start gap-3 text-[#1c1411]">
                    <span className="mt-0.5 text-red-600"><SectionIcon name="pin" size={18} /></span>
                    <p className="leading-snug">
                      <span className="block font-medium">{ADDRESS_LINE_1}</span>
                      <span className="block text-stone-500">{ADDRESS_LINE_2}</span>
                    </p>
                  </div>
                  <a
                    href={DIRECTIONS_URL}
                    className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(255,0,0,0.3)] transition-colors hover:bg-red-700"
                  >
                    Get Directions
                    <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ FAQ ═════════ */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-20 md:py-28">
        <LightDecor tone="right" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Good questions</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-5xl">
                Still <span className="italic text-red-600">wondering?</span>
              </h2>
              <Divider />
              <p className="mt-6 text-lg leading-relaxed text-stone-600">
                A few things first-time visitors often ask. More answers are on our{" "}
                <Link href="/about" className="font-medium text-red-600 underline decoration-red-600/30 underline-offset-4 hover:decoration-red-600">
                  About page
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-8">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border border-stone-200 bg-[#fbf7f0] transition-colors open:border-red-600/30 open:bg-white open:shadow-[0_20px_50px_rgba(28,20,17,0.08)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-7 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-serif text-xl font-semibold leading-snug text-[#1c1411] md:text-2xl">{f.q}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1c1411]/15 text-[#1c1411] transition-all duration-300 group-open:rotate-45 group-open:border-red-600 group-open:bg-red-600 group-open:text-white">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="px-7 pb-7 pr-20 leading-relaxed text-stone-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}