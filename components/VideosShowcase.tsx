"use client";

import { useState } from "react";
import Link from "next/link";
import { Arrow, Cross, Play, YouTubeIcon } from "./icon-widgets/icons";
import BackgroundDesignConTwo from "./design-widgets/background-design-con-two";
import { Video } from "@/lib/types/helper.type";

export default function VideosShowcase({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (!videos.length) return null;
  const current = videos[active];

  function select(i: number) {
    setActive(i);
    setPlaying(true);
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
      <BackgroundDesignConTwo />
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
            <Cross className="text-red-700" />
            Sermons
          </p>
          <h2
            id="messages-heading"
            className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#1c1411] md:text-5xl"
          >
            Watch our <span className="italic text-red-700">latest messages</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-700">
            Missed Sunday? Watch any message here, whenever it suits you. Choose
            a message from the list and press play.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Main player */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-[#1c1411] shadow-[0_30px_70px_rgba(28,20,17,0.25)] ring-1 ring-[#1c1411]/10">
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
                  aria-label={`Play video: ${current.title}`}
                  className="group absolute inset-0 block h-full w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-red-400"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${current.id}/hqdefault.jpg`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-[#1c1411]/40 transition-colors group-hover:bg-[#1c1411]/25" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white pl-1 text-red-700 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <Play size={34} />
                    </span>
                    <span className="rounded-full bg-[#1c1411]/80 px-5 py-2 text-base font-semibold text-white backdrop-blur-sm">
                      Click to play
                    </span>
                  </span>
                </button>
              )}
            </div>

            {/* What is playing */}
            <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-700">
                {active === 0 ? "Newest message" : "Selected message"}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-[#1c1411] md:text-3xl">
                {current.title}
              </h3>
              {current.date && (
                <p className="mt-1 text-base text-stone-600">{current.date}</p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-5">
                <button
                  type="button"
                  onClick={() => select(active - 1)}
                  disabled={active === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-3 text-base font-semibold text-[#1c1411] transition hover:border-[#1c1411] focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-300"
                >
                  <span className="rotate-180">
                    <Arrow />
                  </span>
                  Newer
                </button>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  disabled={active === videos.length - 1}
                  className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-3 text-base font-semibold text-white transition hover:bg-red-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-red-700"
                >
                  Older
                  <Arrow />
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${current.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-2 text-base font-semibold text-[#1c1411] underline-offset-4 hover:text-red-700 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
                >
                  <span className="text-red-700">
                    <YouTubeIcon />
                  </span>
                  Open on YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Message list */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
              <div className="border-b border-stone-200 bg-[#1c1411] px-6 py-5 text-white">
                <h4 className="font-serif text-xl font-semibold">Choose a message</h4>
                <p className="mt-1 text-sm text-stone-300">
                  {videos.length} recent messages. Click one to watch it.
                </p>
              </div>

              <ul className="flex max-h-[34rem] flex-col gap-2 overflow-y-auto p-3 [scrollbar-color:#d6d3d1_transparent] [scrollbar-width:thin]">
                {videos.map((v, i) => {
                  const isActive = i === active;
                  return (
                    <li key={`${v.id}-${i}`}>
                      <button
                        type="button"
                        onClick={() => select(i)}
                        aria-current={isActive ? "true" : undefined}
                        className={`group flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 ${
                          isActive
                            ? "border-red-700/40 bg-red-50"
                            : "border-transparent hover:border-stone-200 hover:bg-[#fbf7f0]"
                        }`}
                      >
                        <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-[#1c1411] sm:w-32">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white pl-0.5 text-red-700">
                              <Play size={12} />
                            </span>
                          </span>
                        </span>

                        <span className="min-w-0 flex-1">
                          {isActive && (
                            <span className="mb-1 inline-block rounded-full bg-red-700 px-2.5 py-0.5 text-xs font-semibold text-white">
                              Now watching
                            </span>
                          )}
                          <span className="line-clamp-2 block font-serif text-[17px] font-semibold leading-snug text-[#1c1411]">
                            {v.title}
                          </span>
                          {v.date && (
                            <span className="mt-1 block text-sm text-stone-600">{v.date}</span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Link
              href="/pplc-sermons"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#1c1411] px-7 py-4 text-lg font-semibold text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
            >
              See all messages
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}