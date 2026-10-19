"use client";

import { useState } from "react";
import { VIDEOS } from "@/lib/constants/home";

export default function VideosSection() {
  const [active, setActive] = useState(0);
  const current = VIDEOS[active];

  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">
            Watch
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-900 md:text-5xl">
            Latest Messages
          </h2>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-xl">
          <iframe
            key={current.id + active}
            src={`https://www.youtube-nocookie.com/embed/${current.id}`}
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold text-slate-900">{current.title}</h3>
          <p className="text-sm text-slate-500">{current.date}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`group overflow-hidden rounded-2xl border text-left transition-all ${
                i === active
                  ? "border-red-600 ring-2 ring-red-600/20"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt=""
                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-semibold text-slate-900">{v.title}</p>
                <p className="text-sm text-slate-500">{v.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}