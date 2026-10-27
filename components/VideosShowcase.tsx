"use client";

import { useState } from "react";
import Link from "next/link";
import type { Video } from "@/lib/utils/youtube";
import { Arrow, Cross, Play } from "./icons";

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z" />
    </svg>
  );
}

// Animated bars shown on the video that is currently selected
function Equalizer() {
  return (
    <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
      {[0.6, 1, 0.45].map((h, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom animate-pulse rounded-full bg-red-600"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  );
}

export default function VideosShowcase({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (!videos.length) return null;
  const current = videos[active];

  function go(i: number) {
    setActive(i);
    setPlaying(true);
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
      {/* ───────── Background designs ───────── */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1c1411_1px,transparent_1px)] opacity-[0.07] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-52 -left-40 -z-10 h-[560px] w-[560px] rounded-full bg-white blur-2xl" />
      <div className="pointer-events-none absolute -left-52 top-24 -z-10 h-[560px] w-[560px] rounded-full border border-[#1c1411]/[0.07]" />
      <div className="pointer-events-none absolute -left-28 top-48 -z-10 h-[360px] w-[360px] rounded-full border border-red-600/15" />
      <Cross className="pointer-events-none absolute -right-20 top-10 -z-10 h-[460px] w-auto rotate-12 text-[#1c1411]/[0.035]" />
      <Cross className="pointer-events-none absolute -bottom-16 left-16 -z-10 h-[260px] w-auto -rotate-12 text-red-600/[0.06]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1c1411]/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-red-600">
              <span className="h-px w-12 bg-red-600" />
              Watch
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#1c1411] md:text-6xl">
              Latest <span className="italic text-red-600">Messages</span>
            </h2>
            <div className="mt-5 flex items-center gap-4 text-[#1c1411]/25">
              <span className="h-px w-14 bg-current" />
              <Cross className="text-red-600" />
              <span className="h-px w-14 bg-current" />
            </div>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600">
              Missed Sunday? Catch up on the most recent teaching from our pulpit, any time,
              anywhere.
            </p>
          </div>

          <Link
            href="/pplc-sermons"
            className="group inline-flex items-center gap-3 rounded-full border border-[#1c1411]/20 bg-white/60 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1c1411] backdrop-blur-sm transition-colors hover:border-[#1c1411] hover:bg-[#1c1411] hover:text-white"
          >
            View All Messages
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Arrow />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ───────── Main player ───────── */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Offset accents behind the player */}
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[30px] bg-[#1c1411] md:-bottom-4 md:-right-4" />
              <div className="absolute -left-4 -top-4 hidden h-24 w-24 bg-[radial-gradient(#dc2626_2px,transparent_2px)] [background-size:14px_14px] md:block" />

              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-[0_30px_60px_rgba(28,20,17,0.25)] ring-1 ring-[#1c1411]/10">
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
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#1c1411]/80 via-transparent to-[#1c1411]/20" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#1c1411]/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      {active === 0 ? "Most Recent" : "Now Selected"}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ff0000] pl-1 text-white shadow-[0_12px_40px_rgba(255,0,0,0.5)] ring-8 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                        <Play size={30} />
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Info bar */}
            <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_20px_50px_rgba(28,20,17,0.07)] md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600">
                    {active === 0 ? "Most Recent" : "Now Selected"}
                    <span className="ml-3 text-stone-400">
                      {String(active + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
                    </span>
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-[#1c1411] md:text-3xl">
                    {current.title}
                  </h3>
                  {current.date && <p className="mt-2 text-stone-500">{current.date}</p>}
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => go(active - 1)}
                    disabled={active === 0}
                    aria-label="Previous message"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1c1411]/20 text-[#1c1411] transition-colors hover:border-[#1c1411] hover:bg-[#1c1411] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#1c1411]/20 disabled:hover:bg-transparent disabled:hover:text-[#1c1411]"
                  >
                    <span className="rotate-180">
                      <Arrow />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(active + 1)}
                    disabled={active === videos.length - 1}
                    aria-label="Next message"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff0000] text-white shadow-[0_8px_22px_rgba(255,0,0,0.3)] transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none disabled:hover:bg-[#ff0000]"
                  >
                    <Arrow />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone-200 pt-5">
                <a
                  href={`https://www.youtube.com/watch?v=${current.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1411] transition-colors hover:text-red-600"
                >
                  <span className="text-red-600">
                    <YouTubeIcon />
                  </span>
                  Watch on YouTube
                </a>
                <span className="hidden h-4 w-px bg-stone-300 sm:block" />
                <span className="text-sm text-stone-500">
                  Share this message with someone who needs to hear it.
                </span>
              </div>
            </div>
          </div>

          {/* ───────── Playlist ───────── */}
          <div className="lg:col-span-4">
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_20px_50px_rgba(28,20,17,0.07)]">
              <div className="flex items-center justify-between border-b border-stone-200 bg-[#1c1411] px-6 py-5 text-white">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">
                    Playlist
                  </p>
                  <h4 className="mt-1 font-serif text-xl font-semibold">Up Next</h4>
                </div>
                <span className="rounded-full bg-white/10 px-3.5 py-1 text-[12px] font-semibold tracking-wide">
                  {videos.length} messages
                </span>
              </div>

              <ul className="flex max-h-[34rem] flex-col gap-2 overflow-y-auto p-3 [scrollbar-color:#d6d3d1_transparent] [scrollbar-width:thin]">
                {videos.map((v, i) => {
                  const isActive = i === active;
                  return (
                    <li key={`${v.id}-${i}`}>
                      <button
                        type="button"
                        onClick={() => go(i)}
                        className={`group relative flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all ${
                          isActive
                            ? "border-red-600/40 bg-red-50/60"
                            : "border-transparent hover:border-stone-200 hover:bg-[#fbf7f0]"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-red-600" />
                        )}
                        <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-black sm:w-32">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                            alt=""
                            loading="lazy"
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
                          <span className="flex items-center gap-2">
                            <span className="font-serif text-[12px] italic text-red-600">
                              0{i + 1}
                            </span>
                            {isActive && <Equalizer />}
                          </span>
                          <span className="line-clamp-2 mt-0.5 block font-serif text-[17px] font-semibold leading-snug text-[#1c1411]">
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

              <Link
                href="/pplc-sermons"
                className="group flex items-center justify-between border-t border-stone-200 bg-[#fbf7f0] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1c1411] transition-colors hover:text-red-600"
              >
                Browse the full archive
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Arrow />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}