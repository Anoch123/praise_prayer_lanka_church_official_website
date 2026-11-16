import Footer from "@/components/footer";
import { Arrow, Cross, SectionIcon } from "@/components/icon-widgets/icons";
import Navbar from "@/components/Navbar";
import { COMMON_TEXTS } from "@/lib/constants/helper_data";
import { getMinistry } from "@/lib/utils/common-functions";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `Youth Ministry | ${COMMON_TEXTS.App_name}`,
  description: getMinistry("youth")?.intro,
};

const focusRing =
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300";

export default function YouthMinistryPage() {
  const m = getMinistry("youth");
  const kids = getMinistry("kids");
  if (!m) notFound();

  return (
    <>
    <Navbar />
      <main className="py-20">
        {/* ───────── Hero: bold and dark ───────── */}
        <section className="bg-[#1c1411] px-6 pb-20 pt-14 text-white md:pb-28 md:pt-20">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="text-sm text-stone-300">
              <Link
                href="/ministries"
                className="underline-offset-4 hover:text-white hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
              >
                Ministries
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span aria-current="page" className="text-white">
                Youth
              </span>
            </nav>

            <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
                  For teenagers &amp; young people
                </p>
                <h1 className="mt-5 font-serif text-6xl font-semibold leading-[0.95] md:text-8xl">
                  Youth
                  <span className="block italic text-red-300">ministry.</span>
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-relaxed text-stone-200">
                  {m.intro}
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/plan-a-visit"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-red-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
                  >
                    Plan your visit
                    <Arrow />
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center rounded-full border-2 border-white/60 px-8 py-4 text-lg font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#1c1411] focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="flex aspect-square max-w-xs flex-col items-start justify-between rounded-3xl bg-red-700 p-8 lg:ml-auto">
                  <Cross className="h-16 w-auto text-white" />
                  <p className="font-serif text-4xl font-semibold leading-tight">
                    Come as
                    <br />
                    you are.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Red band ───────── */}
        <div className="bg-red-700 py-4 text-white">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 text-sm font-semibold uppercase tracking-[0.2em]">
            {m.whatWeDo.map((item, i) => (
              <li key={item.title} className="flex items-center gap-6">
                {i > 0 && (
                  <span aria-hidden="true" className="text-white/60">
                    •
                  </span>
                )}
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* ───────── About: big statement ───────── */}
        <section
          aria-labelledby="youth-about"
          className="bg-[#fbf7f0] px-6 py-16 md:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-16">
            <h2
              id="youth-about"
              className="font-serif text-4xl font-semibold leading-[1.05] text-[#1c1411] md:text-6xl lg:col-span-6"
            >
              {m.tagline}
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-stone-700 lg:col-span-6">
              {m.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <ul className="flex flex-wrap gap-3 pt-2">
                {m.values.map((v) => (
                  <li
                    key={v}
                    className="rounded-full border-2 border-[#1c1411] bg-white px-5 py-2 text-base font-semibold text-[#1c1411]"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── What we do: numbered, hard shadows ───────── */}
        <section
          aria-labelledby="youth-do"
          className="bg-white px-6 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="youth-do"
              className="font-serif text-4xl font-semibold text-[#1c1411] md:text-5xl"
            >
              What we do <span className="italic text-red-700">each week</span>
            </h2>

            <ul className="mt-12 grid gap-8 sm:grid-cols-2">
              {m.whatWeDo.map((item, i) => (
                <li
                  key={item.title}
                  className="rounded-2xl border-2 border-[#1c1411] bg-[#fbf7f0] p-7 shadow-[6px_6px_0_0_#1c1411] md:p-8"
                >
                  <span className="font-serif text-6xl font-semibold leading-none text-red-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-[#1c1411]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-lg leading-relaxed text-stone-700">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Verse: full-width red ───────── */}
        <section className="bg-red-700 px-6 py-16 text-white md:py-24">
          <figure className="mx-auto max-w-4xl">
            <Cross className="h-8 w-auto text-white/80" />
            <blockquote className="mt-6 font-serif text-3xl font-semibold leading-snug md:text-5xl">
              “{m.verse.text}”
            </blockquote>
            <figcaption className="mt-6 text-base font-semibold uppercase tracking-[0.2em] text-white/90">
              {m.verse.ref}
            </figcaption>
          </figure>
        </section>

        {/* ───────── Join us ───────── */}
        <section
          aria-labelledby="youth-join"
          className="bg-[#fbf7f0] px-6 py-16 md:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-[#1c1411] p-8 text-white md:p-10">
              <h2
                id="youth-join"
                className="font-serif text-3xl font-semibold md:text-4xl"
              >
                Ready to <span className="italic text-red-300">join us?</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-200">
                No sign-up is needed to visit. Just come along, or send us a
                message first if you have questions.
              </p>
              <Link
                href="/contact-us"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#1c1411] transition hover:bg-red-700 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
              >
                Send us a message
                <Arrow />
              </Link>
            </div>

            <div className="rounded-3xl border-2 border-[#1c1411] bg-white p-8 md:p-10">
              <h2 className="font-serif text-3xl font-semibold text-[#1c1411]">
                When &amp; where
              </h2>
              {m.ages && (
                <p className="mt-3 text-lg font-semibold text-red-700">
                  {m.ages}
                </p>
              )}
              {m.meets ? (
                <ul className="mt-5 space-y-4">
                  <li className="flex items-start gap-3 text-lg text-[#1c1411]">
                    <span className="mt-0.5 text-red-700">
                      <SectionIcon name="clock" size={22} />
                    </span>
                    {m.meets.day} · {m.meets.time}
                  </li>
                  {m.meets.place && (
                    <li className="flex items-start gap-3 text-lg text-[#1c1411]">
                      <span className="mt-0.5 text-red-700">
                        <SectionIcon name="pin" size={22} />
                      </span>
                      {m.meets.place}
                    </li>
                  )}
                </ul>
              ) : (
                <p className="mt-4 text-lg leading-relaxed text-stone-700">
                  Ask us for the latest meeting times. We will be glad to tell
                  you.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ───────── Link to Kids ───────── */}
        {kids && (
          <section className="bg-white px-6 py-14 md:py-20">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-3xl border-2 border-[#1c1411] p-8 text-center md:flex-row md:text-left">
              <div>
                <p className="font-serif text-3xl font-semibold text-[#1c1411]">
                  Have younger children?
                </p>
                <p className="mt-1 text-lg text-stone-700">
                  See what we have for kids.
                </p>
              </div>
              <Link
                href="/ministries/kids"
                className={`inline-flex shrink-0 items-center gap-3 rounded-full bg-red-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-800 ${focusRing}`}
              >
                {kids.name}
                <Arrow />
              </Link>
            </div>
          </section>
        )}
      </main>

      <div className="bg-[#1c1411]">
        <Footer />
      </div>
    </>
  );
}