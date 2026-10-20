"use client";

import { useEffect, useMemo, useState } from "react";
import type { Video } from "@/lib/utils/youtube";
import { Play } from "./icons";

const PAGE_SIZE = 12;

export default function VideoLibrary({ videos }: { videos: Video[] }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Video | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? videos.filter((v) => v.title.toLowerCase().includes(q)) : videos;
  }, [videos, query]);

  useEffect(() => setVisible(PAGE_SIZE), [query]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="bg-[#fbf7f0] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Toolbar */}
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-stone-500">
            {filtered.length} {filtered.length === 1 ? "message" : "messages"}
          </p>
          <div className="relative w-full md:w-96">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search messages"
              aria-label="Search messages"
              className="w-full rounded-full border border-stone-300 bg-white py-3.5 pl-12 pr-5 text-[15px] text-[#1c1411] outline-none transition-colors placeholder:text-stone-400 focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visible).map((v, i) => (
              <button
                key={`${v.id}-${i}`}
                type="button"
                onClick={() => setSelected(v)}
                className="group overflow-hidden rounded-3xl border border-stone-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_24px_50px_rgba(28,20,17,0.12)]"
              >
                <span className="relative block aspect-video overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff0000] pl-1 text-white shadow-[0_10px_30px_rgba(255,0,0,0.45)] ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                      <Play size={22} />
                    </span>
                  </span>
                </span>
                <span className="block p-6">
                  {v.date && (
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-red-600">
                      {v.date}
                    </span>
                  )}
                  <span className="mt-2 line-clamp-2 block font-serif text-xl font-semibold leading-snug text-[#1c1411]">
                    {v.title}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-20 text-center">
            <p className="font-serif text-2xl font-semibold text-[#1c1411]">No messages found</p>
            <p className="mt-2 text-stone-500">Try a different search term.</p>
          </div>
        )}

        {/* Load more */}
        {visible < filtered.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((n) => n + PAGE_SIZE)}
              className="rounded-full bg-[#1c1411] px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Lightbox player */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1c1411]/90 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setSelected(null)}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between gap-6 text-white">
              <div>
                {selected.date && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">
                    {selected.date}
                  </p>
                )}
                <h3 className="mt-1 font-serif text-xl font-semibold md:text-2xl">
                  {selected.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close video"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#1c1411]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&rel=0`}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
