"use client";

import { useState } from "react";
import type { Video } from "@/lib/utils/youtube";

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5.5 0h3v5.5H14v3H8.5V18h-3V8.5H0v-3h5.5V0Z" />
    </svg>
  );
}

function Play({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

export default function ImportantMessageFeature({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-20 md:py-28">
      {/* ───────── Background designs ───────── */}
      {/* Dot grid, faded toward the edges */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1c1411_1px,transparent_1px)] opacity-[0.09] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
      {/* Soft warm glows */}
      <div className="absolute -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-48 -right-40 -z-10 h-[560px] w-[560px] rounded-full bg-[#fbf7f0] blur-2xl" />
      {/* Concentric rings */}
      <div className="pointer-events-none absolute -right-48 top-16 -z-10 h-[560px] w-[560px] rounded-full border border-[#1c1411]/[0.07]" />
      <div className="pointer-events-none absolute -right-24 top-40 -z-10 h-[360px] w-[360px] rounded-full border border-red-600/15" />
      {/* Large outlined crosses */}
      <Cross className="pointer-events-none absolute -left-16 top-24 -z-10 h-[460px] w-auto -rotate-12 text-[#1c1411]/[0.035]" />
      <Cross className="pointer-events-none absolute -bottom-20 right-10 -z-10 h-[300px] w-auto rotate-12 text-red-600/[0.06]" />
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="mx-auto max-w-6xl">
        {/* Centered heading */}
        <div className="text-center">
          <p className="inline-flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-red-600">
            <span className="h-px w-10 bg-red-600" />
            Must Watch
            <span className="h-px w-10 bg-red-600" />
          </p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-[#1c1411] md:text-6xl">
            An important <span className="italic text-red-600">message</span>
          </h2>

          <div className="mt-6 flex items-center justify-center gap-4 text-[#1c1411]/25">
            <span className="h-px w-14 bg-current" />
            <Cross className="text-red-600" />
            <span className="h-px w-14 bg-current" />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
            If you only watch one message, make it this one. A teaching we believe every
            member and visitor should hear.
          </p>
        </div>

        {/* Framed player */}
        <div className="relative mt-14">
          {/* Offset red block + dotted accent behind the player */}
          <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[32px] bg-red-600 md:-bottom-6 md:-right-6" />
          <div className="absolute -left-5 -top-5 hidden h-28 w-28 bg-[radial-gradient(#dc2626_2px,transparent_2px)] [background-size:14px_14px] md:block" />

          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-[0_40px_80px_rgba(28,20,17,0.3)] ring-1 ring-[#1c1411]/10">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${video.title}`}
                className="group absolute inset-0 block h-full w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
                  onError={(e) => {
                    // maxres isn't available for every video – fall back to hqdefault
                    e.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#1c1411]/80 via-transparent to-[#1c1411]/20" />

                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#1c1411]/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  Important Message
                </span>

                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ff0000] pl-1 text-white shadow-[0_12px_40px_rgba(255,0,0,0.55)] ring-8 ring-white/25 transition-transform duration-300 group-hover:scale-110 md:h-28 md:w-28">
                    <Play size={34} />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Title bar with thumbnail chip */}
        <div className="relative mx-auto mt-20 flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-stone-200 bg-[#fbf7f0] p-4 pr-6 text-center shadow-[0_30px_60px_rgba(28,20,17,0.1)] sm:flex-row sm:text-left">
          <span className="absolute -top-3 left-8 hidden rounded-full bg-[#1c1411] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white sm:block">
            Now featured
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt=""
            className="aspect-video w-full shrink-0 rounded-2xl object-cover sm:w-44"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600 sm:hidden">
              Now featured
            </p>
            <h3 className="mt-1 font-serif text-xl font-semibold leading-snug text-[#1c1411] md:text-2xl">
              {video.title}
            </h3>
            {video.date && <p className="mt-1 text-sm text-stone-500">{video.date}</p>}
          </div>
          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#ff0000] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_28px_rgba(255,0,0,0.3)] transition-all hover:-translate-y-px hover:bg-red-700"
            >
              <Play size={13} />
              Watch Now
            </button>
          )}
        </div>
      </div>
    </section>
  );
}