import Footer from "@/components/footer";
import { Arrow, Cross, SectionIcon } from "@/components/icon-widgets/icons";
import Navbar from "@/components/Navbar";
import { CARD_STYLES, COMMON_TEXTS, focusRing } from "@/lib/constants/helper_data";
import { getMinistry } from "@/lib/utils/common-functions";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `Kids Ministry | ${COMMON_TEXTS.App_name}`,
  description: getMinistry("kids")?.intro,
};

export default function KidsMinistryPage() {
  const m = getMinistry("kids");
  const youth = getMinistry("youth");
  if (!m) notFound();

  return (
    <>
    <Navbar />
      <main className="py-20">
        {/* ───────── Hero: warm and playful ───────── */}
        <section className="relative isolate overflow-hidden bg-amber-50">
          {/* Soft shapes */}
          <div className="absolute -left-20 top-10 -z-10 h-64 w-64 rounded-full bg-red-100" />
          <div className="absolute -right-16 top-32 -z-10 h-72 w-72 rounded-full bg-amber-200/70" />
          <div className="absolute bottom-10 left-1/3 -z-10 h-24 w-24 rounded-full bg-orange-200/70" />

          <div className="mx-auto max-w-4xl px-6 pb-16 pt-14 text-center md:pt-20">
            <nav aria-label="Breadcrumb" className="text-sm text-stone-700">
              <Link
                href="/ministries"
                className={`underline-offset-4 hover:text-red-700 hover:underline ${focusRing}`}
              >
                Ministries
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span aria-current="page" className="font-semibold text-[#1c1411]">
                Kids
              </span>
            </nav>

            <p className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-base font-semibold text-red-700 shadow-sm">
              <span aria-hidden="true">🌟</span>
              For children
            </p>

            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] text-[#1c1411] md:text-7xl">
              Kids <span className="italic text-red-700">ministry</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-serif text-2xl font-semibold leading-snug text-[#1c1411] md:text-3xl">
              {m.tagline}
            </p>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-stone-700">
              {m.intro}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/plan-a-visit"
                className={`inline-flex items-center justify-center gap-3 rounded-full bg-red-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-red-800 ${focusRing}`}
              >
                Plan your visit
                <Arrow />
              </Link>
              <Link
                href="/contact-us"
                className={`inline-flex items-center justify-center rounded-full border-2 border-[#1c1411] bg-white px-8 py-4 text-lg font-semibold text-[#1c1411] transition hover:bg-[#1c1411] hover:text-white ${focusRing}`}
              >
                Ask a question
              </Link>
            </div>
          </div>

          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="block h-12 w-full md:h-20"
            aria-hidden="true"
          >
            <path
              d="M0 40 C 240 100 480 0 720 40 C 960 80 1200 10 1440 40 L1440 80 L0 80 Z"
              fill="#ffffff"
            />
          </svg>
        </section>

        {/* ───────── Welcome + verse sticker ───────── */}
        <section
          aria-labelledby="kids-welcome"
          className="bg-white px-6 pb-16 pt-6 md:pb-24"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="kids-welcome"
                className="font-serif text-4xl font-semibold leading-tight text-[#1c1411] md:text-5xl"
              >
                Every child is{" "}
                <span className="italic text-red-700">welcome</span> here
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-700">
                {m.about.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <ul className="mt-8 space-y-3">
                {m.values.map((v) => (
                  <li
                    key={v}
                    className="flex items-center gap-3 text-lg font-semibold text-[#1c1411]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-700 text-white">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5 10 17.5 19 7.5" />
                      </svg>
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            {/* Verse sticker */}
            <figure className="relative mx-auto w-full max-w-md md:rotate-2">
              <div className="absolute -inset-2 rotate-[-4deg] rounded-[2rem] bg-amber-200" />
              <div className="relative rounded-[2rem] border-4 border-red-700 bg-white p-8 text-center shadow-xl">
                <span className="text-4xl" aria-hidden="true">
                  ✝️
                </span>
                <blockquote className="mt-4 font-serif text-2xl font-semibold leading-snug text-[#1c1411]">
                  “{m.verse.text}”
                </blockquote>
                <figcaption className="mt-4 text-base font-semibold uppercase tracking-[0.14em] text-red-700">
                  {m.verse.ref}
                </figcaption>
              </div>
            </figure>
          </div>
        </section>

        {/* ───────── What we do: colourful cards ───────── */}
        <section
          aria-labelledby="kids-do"
          className="bg-[#fbf7f0] px-6 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="kids-do"
                className="font-serif text-4xl font-semibold leading-tight text-[#1c1411] md:text-5xl"
              >
                What we do <span className="italic text-red-700">together</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-700">
                Learning, singing, making and playing, all with Jesus at the
                centre.
              </p>
            </div>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {m.whatWeDo.map((item, i) => {
                const s = CARD_STYLES[i % CARD_STYLES.length];
                return (
                  <li
                    key={item.title}
                    className={`rounded-[2rem] border-2 ${s.border} ${s.bg} p-8`}
                  >
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm"
                      aria-hidden="true"
                    >
                      {s.emoji}
                    </span>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#1c1411]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-lg leading-relaxed text-stone-700">
                      {item.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ───────── When & where + for parents ───────── */}
        <section
          aria-labelledby="kids-visit"
          className="bg-white px-6 py-16 md:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border-4 border-red-700 bg-amber-50 p-8 md:p-10">
              <h2
                id="kids-visit"
                className="font-serif text-3xl font-semibold text-[#1c1411]"
              >
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

            <div className="flex flex-col justify-center rounded-[2rem] bg-[#1c1411] p-8 text-white md:p-10">
              <h2 className="font-serif text-3xl font-semibold">
                Parents, come and see
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-stone-200">
                You are very welcome to come along with your child, meet our
                teachers and ask us anything.
              </p>
              <Link
                href="/contact-us"
                className={`mt-6 inline-flex items-center justify-center gap-3 self-start rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#1c1411] transition hover:bg-red-700 hover:text-white ${focusRing}`}
              >
                Talk to us
                <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── Link to Youth ───────── */}
        {youth && (
          <section className="bg-[#fbf7f0] px-6 py-14 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <Cross className="mx-auto h-7 w-auto text-red-700" />
              <p className="mt-4 font-serif text-3xl font-semibold text-[#1c1411]">
                Do you have a teenager?
              </p>
              <p className="mt-2 text-lg text-stone-700">
                Take a look at our Youth Ministry.
              </p>
              <Link
                href="/ministries/youth"
                className={`mt-6 inline-flex items-center gap-3 rounded-full bg-red-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-800 ${focusRing}`}
              >
                {youth.name}
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