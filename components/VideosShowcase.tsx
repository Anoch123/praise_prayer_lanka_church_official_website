"use client";

import { useState } from "react";
import Link from "next/link";
import type { Video } from "@/lib/utils/youtube";
import { Arrow, Cross, Play } from "./icons";

export default function VideosShowcase({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (!videos.length) return null;
  const current = videos[active];

  return (
    <section className="relative overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
      <Cross className="pointer-events-none absolute -right-20 top-10 h-[420px] w-auto rotate-12 text-[#1c1411]/[0.03]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-red-600">
              <span className="h-px w-12 bg-red-600" />
              Watch
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#1c1411] md:text-6xl">
              Latest <span className="italic text-red-600">Messages</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600">
              Missed Sunday? Catch up on the most recent teaching from our pulpit, any time,
              anywhere.
            </p>
          </div>

          <Link
            href="/pplc-sermons"
            className="group inline-flex items-center gap-3 rounded-full border border-[#1c1411]/20 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1c1411] transition-colors hover:border-[#1c1411] hover:bg-[#1c1411] hover:text-white"
          >
            View All Messages
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Arrow />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main player */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-[0_30px_60px_rgba(28,20,17,0.25)]">
              {playing ? (
                <iframe
                  key={current.id}
                  src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0`}
                  title={current.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${current.title}`}
                  className="group absolute inset-0 block h-full w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${current.id}/hqdefault.jpg`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1c1411]/70 via-transparent to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ff0000] pl-1 text-white shadow-[0_12px_40px_rgba(255,0,0,0.5)] ring-8 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                      <Play size={30} />
                    </span>
                  </span>
                </button>
              )}
            </div>

            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600">
                  {active === 0 ? "Most Recent" : "Now Selected"}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1c1411] md:text-3xl">
                  {current.title}
                </h3>
                {current.date && <p className="mt-1 text-stone-500">{current.date}</p>}
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-4">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-500">
              Up Next
            </p>
            <ul className="flex flex-col gap-3">
              {videos.map((v, i) => {
                const isActive = i === active;
                return (
                  <li key={`${v.id}-${i}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(i);
                        setPlaying(true);
                      }}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all ${
                        isActive
                          ? "border-red-600 bg-white shadow-[0_10px_30px_rgba(28,20,17,0.08)]"
                          : "border-stone-200 bg-white/60 hover:border-stone-400 hover:bg-white"
                      }`}
                    >
                      <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-black sm:w-32">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full pl-0.5 text-white ${
                              isActive ? "bg-[#ff0000]" : "bg-white/25 backdrop-blur-sm"
                            }`}
                          >
                            <Play size={12} />
                          </span>
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-[11px] italic text-red-600">
                          0{i + 1}
                        </span>
                        <span className="line-clamp-2 block font-serif text-[17px] font-semibold leading-snug text-[#1c1411]">
                          {v.title}
                        </span>
                        {v.date && (
                          <span className="mt-1 block text-xs text-stone-500">{v.date}</span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
