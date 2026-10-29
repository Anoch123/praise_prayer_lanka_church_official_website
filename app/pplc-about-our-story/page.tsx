import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { Arrow, Clock, Cross, Eyebrow, Icon, Pin } from "@/components/icons";
import { BELIEFS, COMMON_TEXTS, FAQS, FIRST_VISIT, GLOSSARY, NUTSHELL, SERVICE_TIMES, TEAM, TIMELINE, VALUES, VISIT_FACTS } from "@/lib/constants/helper_texts";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Our Story | About Us",
  description:
    "Who we are, what we believe and what to expect when you visit. Everyone is welcome, whether you are a lifelong believer or just curious.",
};

function Divider({ dark = false, center = false }: { dark?: boolean; center?: boolean }) {
  return (
    <div className={`mt-6 flex items-center gap-4 ${center ? "justify-center" : ""} ${dark ? "text-white/25" : "text-[#1c1411]/25"}`}>
      <span className="h-px w-14 bg-current" />
      <Cross className="text-red-600" />
      <span className="h-px w-14 bg-current" />
    </div>
  );
}

// Decorative backdrop for light sections
function LightDecor({ tone = "left" }: { tone?: "left" | "right" }) {
  const side = tone === "left";
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1c1411_1px,transparent_1px)] opacity-[0.07] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className={`absolute top-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-red-500/10 blur-3xl ${side ? "-left-44" : "-right-44"}`} />
      <div className={`pointer-events-none absolute top-16 -z-10 h-[560px] w-[560px] rounded-full border border-[#1c1411]/[0.07] ${side ? "-right-52" : "-left-52"}`} />
      <div className={`pointer-events-none absolute top-40 -z-10 h-[360px] w-[360px] rounded-full border border-red-600/15 ${side ? "-right-28" : "-left-28"}`} />
      <Cross className={`pointer-events-none absolute bottom-10 -z-10 h-[420px] w-auto text-[#1c1411]/[0.035] ${side ? "-left-16 -rotate-12" : "-right-16 rotate-12"}`} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1c1411]/15 to-transparent" />
    </>
  );
}

// Decorative backdrop for dark sections
function DarkDecor() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2a1d18] via-[#1c1411] to-[#1c1411]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.05] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-48 bottom-0 -z-10 h-[520px] w-[520px] rounded-full border border-white/[0.07]" />
      <Cross className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-[560px] w-auto -translate-y-1/2 rotate-12 text-white/[0.04]" />
    </>
  );
}

/* ───────────────────────────────── Page ───────────────────────────────── */

export default function PPLCAboutOurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A family of faith,"
        accent="hope and love."
        description="Whether you have followed Jesus for years, are curious about faith, or are simply looking for a place to belong, you are welcome here. This page explains who we are, what we believe and what to expect when you visit."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Our Story" }]}
        image={"/images/hero-bg-3000.jpg"}
      />

      {/* ═════════ 2. Who we are (plain words) ═════════ */}
      <section id="who-we-are" className="relative isolate scroll-mt-24 overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
        <LightDecor tone="left" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              In <span className="italic text-red-600">plain words</span>
            </h2>
            <Divider />
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              We are a Christian church, a community of people who follow Jesus Christ.
              Each week we gather to worship, learn from the Bible, pray for one another
              and serve our neighbours.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              You do not need to be religious, have all the answers or be &ldquo;good
              enough&rdquo; to belong here. You are welcome exactly as you are.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#1c1411]/15 bg-white px-5 py-3 text-sm font-medium text-[#1c1411]">
              <Cross className="text-red-600" />
              {COMMON_TEXTS.App_name}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-5 sm:grid-cols-1">
              sdfdshfsdhfdis
              {NUTSHELL.map((n, i) => (
                <li
                  key={n.title}
                  className="group relative flex items-start gap-6 overflow-hidden rounded-3xl border border-stone-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(28,20,17,0.1)] md:p-8"
                >
                  <span className="absolute inset-y-0 left-0 w-1.5 bg-red-600/0 transition-colors group-hover:bg-red-600" />
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1c1411] text-white transition-colors group-hover:bg-red-600">
                    <Icon name={n.icon} />
                  </span>
                  <div>
                    <p className="font-serif text-sm italic text-red-600">0{i + 1}</p>
                    <h3 className="font-serif text-2xl font-semibold text-[#1c1411]">{n.title}</h3>
                    <p className="mt-2 leading-relaxed text-stone-600">{n.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═════════ 3. Church words, explained ═════════ */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-20 md:py-28">
        <LightDecor tone="right" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>New to church?</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              Church words, <span className="italic text-red-600">explained</span>
            </h2>
            <Divider center />
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
              Some of the words we use can sound unfamiliar. Here is what they simply mean.
            </p>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GLOSSARY.map((g) => (
              <li
                key={g.word}
                className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-[#fbf7f0] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/30 hover:shadow-[0_24px_50px_rgba(28,20,17,0.08)]"
              >
                <Cross className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-auto rotate-12 text-[#1c1411]/[0.045]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-600">Word</p>
                <h3 className="mt-2 font-serif text-3xl font-semibold text-[#1c1411]">{g.word}</h3>
                <p className="mt-3 leading-relaxed text-stone-600">{g.meaning}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ 4. Mission & Vision ═════════ */}
      <section className="relative isolate overflow-hidden bg-[#1c1411] px-6 py-20 md:py-28">
        <DarkDecor />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Eyebrow light>Why we exist</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#fbf7f0] md:text-6xl">
              Our mission &amp; <span className="italic text-red-500">vision</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              { label: "Our Mission", sub: "What we do", text: COMMON_TEXTS.Mission },
              { label: "Our Vision", sub: "What we hope for", text: COMMON_TEXTS.Vission },
            ].map((m) => (
              <div
                key={m.label}
                className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.06] p-8 backdrop-blur-sm md:p-12"
              >
                <Cross className="pointer-events-none absolute -right-4 -top-5 h-44 w-auto rotate-12 text-white/[0.06]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">{m.sub}</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold text-[#fbf7f0]">{m.label}</h3>
                <p className="mt-6 font-serif text-2xl italic leading-snug text-stone-200 md:text-[28px]">
                  &ldquo;{m.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 5. Our story timeline ═════════ */}
      <section id="our-story" className="relative isolate scroll-mt-24 overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
        <LightDecor tone="left" />
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>Our history</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              How our <span className="italic text-red-600">story</span> began
            </h2>
            <Divider center />
          </div>

          <ol className="relative mt-16">
            {/* centre line */}
            <span className="absolute bottom-0 left-5 top-2 w-px bg-gradient-to-b from-red-600 via-[#1c1411]/20 to-transparent md:left-1/2" />

            {TIMELINE.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <li key={i} className="relative mb-12 pl-16 last:mb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
                  <span className="absolute left-5 top-8 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 ring-8 ring-[#fbf7f0] md:left-1/2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>

                  <div
                    className={`rounded-3xl border border-stone-200 bg-white p-7 shadow-[0_20px_50px_rgba(28,20,17,0.06)] md:p-8 ${
                      left ? "md:col-start-1 md:text-right" : "md:col-start-2"
                    }`}
                  >
                    <p className="font-serif text-5xl font-semibold leading-none text-red-600">{t.year}</p>
                    <h3 className="mt-4 font-serif text-2xl font-semibold text-[#1c1411]">{t.title}</h3>
                    <p className="mt-2 leading-relaxed text-stone-600">{t.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ═════════ 6. What we value ═════════ */}
      <section className="relative isolate overflow-hidden bg-white px-6 py-20 md:py-28">
        <LightDecor tone="right" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>What matters to us</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
                Our core <span className="italic text-red-600">values</span>
              </h2>
              <Divider />
            </div>
            <p className="max-w-md text-lg leading-relaxed text-stone-600">
              These simple values shape everything we do, from Sunday services to how we
              treat our neighbours.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <li
                key={v.title}
                className="group rounded-3xl border border-stone-200 bg-[#fbf7f0] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1c1411] hover:shadow-[0_28px_60px_rgba(28,20,17,0.2)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Icon name={v.icon} />
                </span>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-[#1c1411] transition-colors group-hover:text-[#fbf7f0]">
                  {v.title}
                </h3>
                <p className="mt-2 leading-relaxed text-stone-600 transition-colors group-hover:text-stone-300">
                  {v.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ 7. What we believe ═════════ */}
      <section id="beliefs" className="relative isolate scroll-mt-24 overflow-hidden bg-[#1c1411] px-6 py-20 md:py-28">
        <DarkDecor />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow light>What we believe</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#fbf7f0] md:text-5xl">
                Our faith in <span className="italic text-red-500">simple terms</span>
              </h2>
              <Divider dark />
              <p className="mt-6 text-lg leading-relaxed text-stone-300">
                You do not have to agree with everything to visit us. Here are the core
                beliefs that bring us together, explained simply.
              </p>
              <Link
                href="/beliefs"
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#fbf7f0] transition-colors hover:border-[#fbf7f0] hover:bg-[#fbf7f0] hover:text-[#1c1411]"
              >
                Read Our Full Beliefs
                <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
              </Link>
            </div>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {BELIEFS.map((b, i) => (
              <li
                key={b.title}
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors hover:border-red-500/50 hover:bg-white/10"
              >
                <span className="font-serif text-5xl font-semibold leading-none text-white/10">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-[#fbf7f0]">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-stone-300">{b.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════ 8. First visit ═════════ */}
      <section id="first-visit" className="relative isolate scroll-mt-24 overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
        <LightDecor tone="left" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>Plan your visit</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              Your first <span className="italic text-red-600">Sunday</span>
            </h2>
            <Divider center />
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
              Wondering what to expect? Here is how a typical visit goes, so you can
              walk in feeling relaxed.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Steps + quick facts */}
            <div className="lg:col-span-7">
              <ol className="flex flex-col gap-5">
                {FIRST_VISIT.map((s, i) => (
                  <li key={s.title} className="flex gap-6 rounded-3xl border border-stone-200 bg-white p-7 shadow-[0_20px_50px_rgba(28,20,17,0.05)]">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-600 font-serif text-xl font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-[#1c1411]">{s.title}</h3>
                      <p className="mt-2 leading-relaxed text-stone-600">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {VISIT_FACTS.map((f) => (
                  <div key={f.label} className="rounded-2xl border border-stone-200 bg-white/70 p-5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-600">{f.label}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-[#1c1411]">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Times + location card */}
            <aside className="lg:col-span-5">
              <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_30px_70px_rgba(28,20,17,0.12)] lg:sticky lg:top-32">
                <div className="flex items-center justify-between bg-[#1c1411] px-7 py-6 text-white">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">Join us</p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold">Service Times</h3>
                  </div>
                  <Cross className="h-8 w-auto text-red-500" />
                </div>

                <ul className="divide-y divide-stone-200 px-7">
                  {SERVICE_TIMES.map((s, i) => (
                    <li key={i} className="flex items-center justify-between gap-4 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-red-600"><Clock /></span>
                        <div>
                          <p className="font-serif text-lg font-semibold text-[#1c1411]">{s.name}</p>
                          <p className="text-sm text-stone-500">{s.day}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#1c1411] px-4 py-1.5 text-[13px] font-semibold tracking-wide text-white">
                        {s.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-stone-200 bg-[#fbf7f0] px-7 py-6">
                  <div className="flex items-start gap-3 text-[#1c1411]">
                    <span className="mt-0.5 text-red-600"><Pin /></span>
                    <p className="font-medium leading-snug">{COMMON_TEXTS.Address}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={COMMON_TEXTS.Direction_URLS}
                      className="group inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(255,0,0,0.3)] transition-colors hover:bg-red-700"
                    >
                      Get Directions
                      <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
                    </a>
                    <Link
                      href="/calendar"
                      className="inline-flex items-center rounded-full border border-[#1c1411]/20 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1c1411] transition-colors hover:border-[#1c1411] hover:bg-[#1c1411] hover:text-white"
                    >
                      Full Calendar
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═════════ 9. Leadership ═════════ */}
      <section id="team" className="relative isolate scroll-mt-24 overflow-hidden bg-white px-6 py-20 md:py-28">
        <LightDecor tone="right" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>Meet the team</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              People who <span className="italic text-red-600">care</span>
            </h2>
            <Divider center />
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
              Our leaders are ordinary people who love God and love serving. Say hello,
              they would love to meet you.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((p, i) => (
              <li
                key={i}
                className="group overflow-hidden rounded-3xl border border-stone-200 bg-[#fbf7f0] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(28,20,17,0.12)]"
              >
                {/* Replace this block with <Image /> of the leader's photo */}
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[#2a1d18] to-[#1c1411]">
                  <Cross className="absolute -right-4 -top-5 h-40 w-auto rotate-12 text-white/[0.06]" />
                  <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 font-serif text-3xl font-semibold text-white backdrop-blur-sm">
                    {p.name
                      .split(" ")
                      .filter((w) => w[0] === w[0]?.toUpperCase())
                      .slice(-2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>
                <div className="p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-600">{p.role}</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1c1411]">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{p.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ 10. FAQ ═════════ */}
      <section id="faq" className="relative isolate scroll-mt-24 overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
        <LightDecor tone="left" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Good questions</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-5xl">
                Things first-time visitors <span className="italic text-red-600">ask</span>
              </h2>
              <Divider />
              <p className="mt-6 text-lg leading-relaxed text-stone-600">
                No question is too small. If you do not see yours here, just ask when you
                visit or get in touch.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-8">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border border-stone-200 bg-white shadow-[0_12px_30px_rgba(28,20,17,0.04)] transition-colors open:border-red-600/30 open:shadow-[0_20px_50px_rgba(28,20,17,0.08)]"
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

      {/* ═════════ 11. Closing call to action ═════════ */}
      <section className="relative isolate overflow-hidden bg-[#1c1411] px-6 py-24 md:py-32">
        <DarkDecor />
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow light center>You are invited</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-[#fbf7f0] md:text-6xl">
            There is a seat saved
            <span className="block italic text-red-500">for you.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            Come this Sunday, or watch online first. Either way, we would love to meet you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/partner"
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
        </div>
      </section>

      <Footer />
    </>
  );
}