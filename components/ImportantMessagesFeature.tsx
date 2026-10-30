"use client";

import { useState } from "react";
import { Cross, Play } from "./icon-widgets/icons";
import BackgroundDesignConOne from "./design-widgets/background-design-con-one";
import { Video } from "@/lib/types/helper.type";

export default function ImportantMessageFeature({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#fbf7f0] px-6 py-20 md:py-28">
      <BackgroundDesignConOne />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Left: plain, welcoming words */}
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
            <Cross className="text-red-700" />
            Important Message
          </p>

          <h2
            id="featured-message-heading"
            className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#1c1411] md:text-5xl"
          >
            A message <span className="italic text-red-700">for you</span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-stone-700 lg:mx-0">
            If you only have time for one message, we hope it is this one.
            Everyone is welcome to watch, whether you are a member or visiting
            for the first time.
          </p>

          {/* What you are about to watch */}
          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              Now playing
            </p>
            <h3 className="mt-1 font-serif text-xl font-semibold leading-snug text-[#1c1411] md:text-2xl">
              {video.title}
            </h3>
            {video.date && (
              <p className="mt-1 text-base text-stone-600">{video.date}</p>
            )}
          </div>

          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-red-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-red-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
            >
              <Play size={18} />
              Watch the message
            </button>
          )}
        </div>

        {/* Right: the video */}
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-[#1c1411] shadow-[0_30px_70px_rgba(28,20,17,0.25)] ring-1 ring-[#1c1411]/10">
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
                aria-label={`Play video: ${video.title}`}
                className="group absolute inset-0 block h-full w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-red-400"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  onError={() =>
                    setThumb(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)
                  }
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[#1c1411]/40 transition-colors group-hover:bg-[#1c1411]/25" />

                <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white pl-1 text-red-700 shadow-2xl transition-transform duration-300 group-hover:scale-110 md:h-28 md:w-28">
                    <Play size={36} />
                  </span>
                  <span className="rounded-full bg-[#1c1411]/80 px-5 py-2 text-base font-semibold text-white backdrop-blur-sm">
                    Click to play
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}