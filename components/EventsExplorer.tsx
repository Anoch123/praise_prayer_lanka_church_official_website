"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Cross, SectionIcon } from "./icon-widgets/icons";
import { EventView } from "@/lib/types/helper.type";

export default function EventsExplorer({ events }: { events: EventView[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(events.map((e) => e.category)))],
    [events],
  );
  const [category, setCategory] = useState("All");

  const groups = useMemo(() => {
    const list = category === "All" ? events : events.filter((e) => e.category === category);
    const map = new Map<string, EventView[]>();
    list.forEach((e) => map.set(e.monthLabel, [...(map.get(e.monthLabel) ?? []), e]));
    return Array.from(map);
  }, [events, category]);

  const count = groups.reduce((n, [, list]) => n + list.length, 0);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div role="radiogroup" aria-label="Filter events" className="flex flex-wrap gap-2.5">
          {categories.map((c) => {
            const on = c === category;
            return (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  on
                    ? "border-[#1c1411] bg-[#1c1411] text-white"
                    : "border-stone-300 bg-white text-[#1c1411] hover:border-stone-500"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-stone-500">
          {count} {count === 1 ? "event" : "events"}
        </p>
      </div>

      {/* Month groups */}
      {groups.length ? (
        <div className="mt-12 space-y-14">
          {groups.map(([month, list]) => (
            <div key={month}>
              <div className="mb-6 flex items-center gap-5">
                <h3 className="font-serif text-3xl font-semibold text-[#1c1411] md:text-4xl">
                  {month.split(" ")[0]}{" "}
                  <span className="italic text-red-600">{month.split(" ")[1]}</span>
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-[#1c1411]/20 to-transparent" />
              </div>

              <ul className="flex flex-col gap-5">
                {list.map((e) => (
                  <li key={e.id}>
                    <article className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-stone-200 bg-[#fbf7f0] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(28,20,17,0.1)] md:flex-row md:items-center md:gap-8 md:p-7">
                      <span className="absolute inset-y-0 left-0 w-1.5 bg-[#1c1411]/15 transition-colors group-hover:bg-red-600" />
                      <Cross className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-auto rotate-12 text-[#1c1411]/[0.04]" />

                      {/* Date block */}
                      <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#1c1411] text-center text-white transition-colors group-hover:bg-red-600">
                        <span className="font-serif text-4xl font-semibold leading-none">{e.day}</span>
                        <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                          {e.monthShort}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="relative min-w-0 flex-1">
                        <span className="inline-flex rounded-full border border-[#1c1411]/15 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1c1411]">
                          {e.category}
                        </span>
                        <h4 className="mt-3 font-serif text-2xl font-semibold leading-snug text-[#1c1411]">
                          {e.title}
                        </h4>
                        <p className="mt-2 max-w-2xl leading-relaxed text-stone-600">{e.description}</p>

                        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
                          <div className="flex items-center gap-2">
                            <span className="text-red-600"><SectionIcon name="calendar" size={16} /></span>
                            <dt className="sr-only">Date</dt>
                            <dd>{e.weekday}</dd>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600"><SectionIcon name="clock" size={16} /></span>
                            <dt className="sr-only">Time</dt>
                            <dd>{e.timeLabel}</dd>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600"><SectionIcon name="pin" size={16} /></span>
                            <dt className="sr-only">Location</dt>
                            <dd>{e.location}</dd>
                          </div>
                        </dl>
                      </div>

                      {/* Actions */}
                      <div className="relative flex shrink-0 flex-row gap-3 md:flex-col">
                        <a
                          href={e.gcalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1c1411]/20 bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1c1411] transition-colors hover:border-[#1c1411] hover:bg-[#1c1411] hover:text-white"
                        >
                          <SectionIcon name="plus" size={14} />
                          Add to Calendar
                        </a>
                        {e.href && (
                          <Link
                            href={e.href}
                            className="inline-flex items-center justify-center rounded-full bg-[#ff0000] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(255,0,0,0.25)] transition-colors hover:bg-red-700"
                          >
                            More Info
                          </Link>
                        )}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-3xl border border-dashed border-stone-300 bg-[#fbf7f0] px-6 py-20 text-center">
          <p className="font-serif text-2xl font-semibold text-[#1c1411]">No events in this category</p>
          <p className="mt-2 text-stone-500">Try another category, or check back soon.</p>
        </div>
      )}
    </div>
  );
}