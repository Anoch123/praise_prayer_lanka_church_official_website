import PageHero from "@/components/page-hero";
import Footer from "@/components/footer";
import { Cross, DarkDecor, Divider, Eyebrow, LightDecor } from "@/components/icon-widgets/icons";

const STATS = [
  { value: "1985", label: "Began in a home at Soysa Flats, Moratuwa" },
  { value: "2004", label: "Moved to our own premises" },
  { value: "2017", label: "New church building completed" },
  { value: "23+", label: "Associated churches by 2026" },
];

const PARTS = [
  {
    part: "Part One",
    years: "1983 – 2001",
    title: "The Foundation",
    milestones: ["1983 · Found Christ in a refugee camp", "1985 · Church begins at home", "2001 · Went to be with the Lord"],
    body: [
      "Our founder, Pastor Solomon Raj, was a well-known journalist in Sri Lanka. During the ethnic riots of 1983 he was affected by the violence and took shelter in a refugee camp. There he met Jesus Christ and surrendered his life to the Lord.",
      "He later received a scholarship to study journalism in Russia. Returning to Sri Lanka, he sensed God's call to full-time ministry and left journalism behind. In 1985 he began the church in his home at Soysa Flats, Moratuwa, together with his wife Rebecca and their three daughters, Christina, Jessica and Philomina.",
      "The small family gathering slowly grew into a congregation. Pastor Solomon Raj served faithfully until 2001, when he went to be with the Lord.",
    ],
  },
  {
    part: "Part Two",
    years: "2001 – 2017",
    title: "A New Generation",
    milestones: ["2001 · Pastor Anthony Simon invited to lead", "2004 · 40 days of fasting and prayer", "2017 · New building completed"],
    body: [
      "After Pastor Solomon Raj's passing, Pastor Anthony Simon was invited to lead the church in 2001. He had completed his theological education and served as Academic Dean of the Pentecostal Assemblies Bible College.",
      "In 2002 he married Philomina, Pastor Solomon Raj's daughter, and they were blessed with three children: Shainy, Sharon and Chadwick. In 2004, during 40 days of fasting and prayer, God gave Pastor Anthony a larger vision for the church. In obedience, he began taking steps of faith. That year the church purchased land with an old house and moved to its new premises.",
      "Despite persecution, hardship and many challenges, the church kept growing. Construction of a new church building began in 2015 and was completed in 2017.",
    ],
  },
  {
    part: "Part Three",
    years: "2017 – 2026",
    title: "Growth & Wider Leadership",
    milestones: ["23+ associated churches", "House churches & prayer fellowships", "Bible school & church planting"],
    body: [
      "Under the leadership of Pastor Anthony Simon and Philomina, the ministry has continued to expand. By 2026 the church was working with more than 23 associated churches, along with several house churches and prayer fellowships.",
    ],
  },
];

const ROLES = [
  "Visiting lecturer at Colombo Theological Seminary",
  "Director & Coordinating Professor, Heartland Theological Seminary's Sri Lanka extension",
  "Member, South Asia Collaboration Steering Committee",
  "Leads the South Colombo Pastors' Fellowship",
  "Leads Bible School programmes, discipleship training, pastoral seminars and church-planting initiatives",
];

export default function OurHistory() {
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

      {/* ═════════ Our history, 1985–2026 ═════════ */}
      <section id="our-story" className="relative isolate scroll-mt-24 overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
        <LightDecor tone="left" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>Our history · 1985–2026</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1c1411] md:text-6xl">
              A journey of faith and <span className="italic text-red-600">God&rsquo;s faithfulness</span>
            </h2>
            <Divider center />
          </div>

          {/* Key numbers */}
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <li
                key={s.value}
                className="rounded-3xl border border-stone-200 bg-white p-6 text-center shadow-[0_20px_50px_rgba(28,20,17,0.05)] md:p-8"
              >
                <p className="font-serif text-5xl font-semibold leading-none text-red-600 md:text-6xl">{s.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{s.label}</p>
              </li>
            ))}
          </ul>

          {/* Three parts */}
          <div className="relative mt-20 flex flex-col gap-16 md:gap-24">
            {PARTS.map((p, i) => (
              <article key={p.part} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <p className="font-serif text-7xl font-semibold leading-none text-[#1c1411]/10 md:text-8xl">0{i + 1}</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600">{p.part}</p>
                    <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#1c1411] md:text-4xl">{p.title}</h3>
                    <p className="mt-3 inline-flex rounded-full bg-[#1c1411] px-4 py-1.5 text-[13px] font-semibold tracking-wide text-white">
                      {p.years}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="relative overflow-hidden rounded-[28px] border border-stone-200 bg-white p-7 shadow-[0_24px_60px_rgba(28,20,17,0.08)] md:p-10">
                    <span className="absolute inset-y-0 left-0 w-1.5 bg-red-600" />
                    <Cross className="pointer-events-none absolute -bottom-6 -right-4 h-44 w-auto rotate-12 text-[#1c1411]/[0.04]" />
                    <div className="relative space-y-4 text-lg leading-relaxed text-stone-600">
                      {p.body.map((t, j) => (
                        <p key={j} className={j === 0 ? "text-[#1c1411]" : ""}>{t}</p>
                      ))}
                    </div>
                    <ul className="relative mt-8 flex flex-wrap gap-2.5 border-t border-stone-200 pt-6">
                      {p.milestones.map((m) => (
                        <li
                          key={m}
                          className="rounded-full border border-[#1c1411]/15 bg-[#fbf7f0] px-4 py-2 text-[13px] font-medium text-[#1c1411]"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ Wider leadership + verse ═════════ */}
      <section className="relative isolate overflow-hidden bg-[#1c1411] px-6 py-20 md:py-28">
        <DarkDecor />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow light>Serving beyond our walls</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#fbf7f0] md:text-5xl">
              Prayer, unity, <span className="italic text-red-500">discipleship &amp; mission</span>
            </h2>
            <Divider dark />
            <p className="mt-6 text-lg leading-relaxed text-stone-300">
              Together with Philomina and their family, Pastor Anthony Simon works with churches, Christian
              organisations and parachurch ministries, leading Praise Prayer Lanka Church and its Fellowship with
              a commitment to prayer, unity, discipleship and mission.
            </p>
          </div>

          <ul className="flex flex-col gap-4 lg:col-span-7">
            {ROLES.map((r, i) => (
              <li
                key={r}
                className="flex items-start gap-5 rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors hover:border-red-500/50 hover:bg-white/10"
              >
                <span className="font-serif text-3xl font-semibold leading-none text-red-500">0{i + 1}</span>
                <p className="leading-relaxed text-stone-200">{r}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mx-auto mt-20 max-w-3xl text-center">
          <Cross className="mx-auto h-10 w-auto text-red-500" />
          <blockquote className="mt-6 font-serif text-3xl italic leading-snug text-[#fbf7f0] md:text-4xl">
            &ldquo;Not by might nor by power, but by My Spirit,&rdquo; says the LORD Almighty.
          </blockquote>
          <figcaption className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">
            Zechariah 4:6
          </figcaption>
          <p className="mt-8 font-serif text-xl italic text-stone-300">To God alone be all the glory!</p>
        </figure>
      </section>

      <Footer />
    </>
  );
}