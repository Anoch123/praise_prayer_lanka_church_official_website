import Footer from "@/components/footer";
import { Arrow, Cross } from "@/components/icon-widgets/icons";
import PageHero from "@/components/page-hero";
import { COMMON_TEXTS, MINISTRIES } from "@/lib/constants/helper_data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Ministries | ${COMMON_TEXTS.App_name}`,
  description: `Find your place at ${COMMON_TEXTS.App_name}. Explore our Kids and Youth ministries.`,
};

// Each ministry card previews the look of its own page
const CARD_STYLES: Record<
  string,
  { card: string; title: string; tagline: string; text: string; button: string; icon: string }
> = {
  kids: {
    card: "border-2 border-amber-200 bg-amber-50 hover:border-red-700/50",
    title: "text-[#1c1411]",
    tagline: "text-red-700",
    text: "text-stone-700",
    button: "bg-[#1c1411] text-white group-hover:bg-red-700",
    icon: "bg-red-700 text-white",
  },
  youth: {
    card: "border-2 border-[#1c1411] bg-[#1c1411] hover:border-red-500",
    title: "text-white",
    tagline: "text-red-300",
    text: "text-stone-200",
    button: "bg-red-700 text-white group-hover:bg-red-600",
    icon: "bg-red-700 text-white",
  },
};

export default function MinistriesPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Get involved"
          title="Our"
          accent="ministries."
          description="There is a place for every age in our church family. Choose a ministry to find out more."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "MINISTRIES" }]}
        />

        <section
          aria-labelledby="ministries-heading"
          className="bg-[#fbf7f0] px-6 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
                <Cross className="text-red-700" />
                Find your place
              </p>
              <h2
                id="ministries-heading"
                className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#1c1411] md:text-5xl"
              >
                Who are you{" "}
                <span className="italic text-red-700">looking for?</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                Pick a ministry below to see what we do and how to join in.
              </p>
            </div>

            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {MINISTRIES.map((m) => {
                const s = CARD_STYLES[m.slug] ?? CARD_STYLES.kids;
                return (
                  <li key={m.slug} className="flex">
                    <Link
                      href={`/ministries/${m.slug}`}
                      className={`group flex w-full flex-col rounded-3xl p-8 shadow-sm transition hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 md:p-10 ${s.card}`}
                    >
                      <span
                        className={`flex h-16 w-16 items-center justify-center rounded-full transition group-hover:scale-105 ${s.icon}`}
                      >
                        <Cross className="h-7 w-auto text-white" />
                      </span>
                      <span
                        className={`mt-6 font-serif text-3xl font-semibold ${s.title}`}
                      >
                        {m.name}
                      </span>
                      <span
                        className={`mt-1 text-base font-semibold ${s.tagline}`}
                      >
                        {m.tagline}
                      </span>
                      <span
                        className={`mt-4 flex-1 text-lg leading-relaxed ${s.text}`}
                      >
                        {m.cardText}
                      </span>
                      <span
                        className={`mt-8 inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-base font-semibold transition ${s.button}`}
                      >
                        Learn more
                        <Arrow />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="bg-white px-6 py-16 text-center md:py-20">
          <div className="mx-auto max-w-2xl">
            <Cross className="mx-auto h-8 w-auto text-red-700" />
            <p className="mt-5 font-serif text-3xl font-semibold leading-snug text-[#1c1411] md:text-4xl">
              Not sure where to start?{" "}
              <span className="italic text-red-700">Just ask us.</span>
            </p>
            <p className="mt-4 text-lg leading-relaxed text-stone-700">
              We are happy to help you or your family find the right place.
            </p>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-red-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
            >
              Contact us
              <Arrow />
            </Link>
          </div>
        </section>
      </main>

      <div className="bg-[#1c1411]">
        <Footer />
      </div>
    </>
  );
}