"use client";

import { useState } from "react";
import type { Video } from "@/lib/utils/youtube";

function Play({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

// Big click-to-play player for the most recent sermon.
export default function FeaturedSermon({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-[0_30px_60px_rgba(28,20,17,0.25)]">
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#1c1411]/70 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ff0000] pl-1 text-white shadow-[0_12px_40px_rgba(255,0,0,0.5)] ring-8 ring-white/20 transition-transform duration-300 group-hover:scale-110">
              <Play />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}