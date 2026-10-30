import Footer from "@/components/footer";
import ContactForm from "@/components/forms/contact-form";
import { Arrow, Cross, MessageIcon, PhoneIcon, SectionIcon } from "@/components/icon-widgets/icons";
import PageHero from "@/components/page-hero";
import { COMMON_TEXTS, CONTACT_US_NEXT_STEPS, mapsHref, phoneHref, WEEKLY_SERVICES } from "@/lib/constants/helper_data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Contact Us | ${COMMON_TEXTS.App_name}`,
  description: `Get in touch with ${COMMON_TEXTS.App_name}. Send a message, call us, or find out when and where we meet.`,
};

export default function ContactUs() {
  

  const quickActions = [
    {
      title: "Call us",
      detail: COMMON_TEXTS.Phone,
      cta: "Call now",
      href: phoneHref,
      icon: <PhoneIcon />,
      external: false,
    },
    {
      title: "Visit us",
      detail: COMMON_TEXTS.Address,
      cta: "Get directions",
      href: mapsHref,
      icon: <SectionIcon name="pin" size={26} />,
      external: true,
    },
    {
      title: "Write to us",
      detail: "Send us a short message and we will reply.",
      cta: "Go to the form",
      href: "#message-form",
      icon: <MessageIcon />,
      external: false,
    },
  ];

  return (
    <>
      <main>
        <PageHero
          eyebrow="Get in touch"
          title="Contact"
          accent="us."
          description="Have a question, a prayer request, or want to visit? We would love to hear from you. Everyone is welcome."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "CONTACT US" }]}
          image={"/images/hero-bg-3000.jpg"}
        />

        {/* ───────── Three easy ways to reach us ───────── */}
        <section
          aria-labelledby="ways-heading"
          className="bg-[#fbf7f0] px-6 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
                <Cross className="text-red-700" />
                We are here for you
              </p>
              <h2
                id="ways-heading"
                className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#1c1411] md:text-5xl"
              >
                How can we <span className="italic text-red-700">help you?</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                Choose the way that is easiest for you. No question is too small.
              </p>
            </div>

            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {quickActions.map((a) => (
                <li key={a.title} className="flex">
                  <a
                    href={a.href}
                    {...(a.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex w-full flex-col items-center rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm transition hover:border-red-700/40 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white transition group-hover:scale-105">
                      {a.icon}
                    </span>
                    <span className="mt-5 font-serif text-2xl font-semibold text-[#1c1411]">
                      {a.title}
                    </span>
                    <span className="mt-2 flex-1 text-lg leading-snug text-stone-700">
                      {a.detail}
                    </span>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1c1411] px-6 py-3 text-base font-semibold text-white transition group-hover:bg-red-700">
                      {a.cta}
                      <Arrow />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Form + helpful info ───────── */}
        <section
          id="message-form"
          aria-labelledby="form-heading"
          className="scroll-mt-6 bg-white px-6 py-16 md:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <h2
                id="form-heading"
                className="font-serif text-3xl font-semibold text-[#1c1411] md:text-4xl"
              >
                Send us a message
              </h2>
              <p className="mb-8 mt-3 text-lg leading-relaxed text-stone-700">
                It only takes a minute. Choose a topic, then tell us who you are
                and what is on your heart.
              </p>
              <ContactForm />
            </div>

            {/* Helpful info */}
            <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-[7.25rem]">
              {/* Service times */}
              <div className="rounded-3xl bg-[#1c1411] p-7 text-white">
                <h3 className="font-serif text-2xl font-semibold">
                  Join us for worship
                </h3>
                <p className="mt-1 text-base text-stone-300">
                  You do not need to contact us first. Just come along.
                </p>

                <ul className="mt-5 divide-y divide-white/15 border-t border-white/15">
                  {WEEKLY_SERVICES.map((s, i) => (
                    <li
                      key={i}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-red-300">
                          <SectionIcon name="clock" size={18} />
                        </span>
                        <span className="font-serif text-lg font-semibold">
                          {s.name}
                        </span>
                      </span>
                      <span className="pl-8 text-base text-stone-200 sm:pl-0">
                        {s.dayName} · {s.timeLabel}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/plan-a-visit"
                  className={`mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-lg font-semibold text-[#1c1411] transition hover:bg-red-700 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300`}
                >
                  Plan your visit
                  <Arrow />
                </Link>
              </div>

              {/* What happens next */}
              <div className="rounded-3xl border border-stone-200 bg-[#fbf7f0] p-7">
                <h3 className="font-serif text-2xl font-semibold text-[#1c1411]">
                  What happens next?
                </h3>
                <ol className="mt-5 space-y-5">
                  {CONTACT_US_NEXT_STEPS.map((s) => (
                    <li key={s.n} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1c1411] font-serif text-lg font-semibold text-white">
                        {s.n}
                      </span>
                      <div>
                        <p className="text-lg font-semibold text-[#1c1411]">
                          {s.t}
                        </p>
                        <p className="mt-0.5 text-base text-stone-700">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Closing welcome ───────── */}
        <section className="bg-[#fbf7f0] px-6 py-16 text-center md:py-24">
          <div className="mx-auto max-w-2xl">
            <Cross className="mx-auto h-8 w-auto text-red-700" />
            <p className="mt-5 font-serif text-3xl font-semibold leading-snug text-[#1c1411] md:text-4xl">
              Come as you are.{" "}
              <span className="italic text-red-700">You belong here.</span>
            </p>
            <p className="mt-4 text-lg leading-relaxed text-stone-700">
              Whether you are new to faith or have been walking with God for
              years, we are glad you found us.
            </p>
          </div>
        </section>
      </main>

      {/* Extra bottom space on phones so the sticky bar never covers the footer */}
      <div className="bg-[#1c1411] pb-20 md:pb-0">
        <Footer />
      </div>

      {/* ───────── Sticky call / message bar (phones only) ───────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(28,20,17,0.12)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <a
            href={phoneHref}
            className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1c1411] px-4 py-3.5 text-base font-semibold text-[#1c1411] focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300`}
          >
            <PhoneIcon size={20} />
            Call us
          </a>
          <a
            href="#message-form"
            className={`inline-flex items-center justify-center gap-2 rounded-full bg-red-700 px-4 py-3.5 text-base font-semibold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300`}
          >
            <MessageIcon size={20} />
            Message
          </a>
        </div>
      </div>
    </>
  );
}