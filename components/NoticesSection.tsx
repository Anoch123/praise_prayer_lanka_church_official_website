import { NOTICES } from "@/lib/constants/home";

export default function NoticesSection() {
  return (
    <section className="bg-slate-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">
            Stay Informed
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-900 md:text-5xl">
            Notices & Announcements
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {NOTICES.map((n, i) => (
            <article
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    n.tag === "Important"
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {n.tag}
                </span>
                <span className="text-sm text-slate-500">{n.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{n.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{n.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}