"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { VERSES } from "@/lib/constants/helper_data";
import { compute } from "@/lib/utils/common-functions";

export function NextGathering() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const next = now === null ? null : compute(now);
  const pad = (n: number) => String(n).padStart(2, "0");

  const left = next?.secondsLeft ?? 0;
  const tiles = [
    { label: "Days", value: Math.floor(left / 86400) },
    { label: "Hours", value: Math.floor((left % 86400) / 3600) },
    { label: "Min", value: Math.floor((left % 3600) / 60) },
    { label: "Sec", value: left % 60 },
  ];

  return (
    <div className="text-center">
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600">
        {next?.live && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
          </span>
        )}
        {next?.live ? "Happening now" : "Next gathering"}
      </p>

      <h3 className="mt-3 font-serif text-2xl font-semibold text-[#1c1411] md:text-3xl">
        {next?.name ?? " "}
      </h3>
      <p className="mt-1 text-sm text-stone-500">{next?.when ?? " "}</p>

      {next?.live ? (
        <Link
          href="/pplc-sermons"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ff0000] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(255,0,0,0.3)] transition-colors hover:bg-red-700"
        >
          Join us now
        </Link>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-2.5" aria-live="off">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl bg-[#1c1411] px-1 py-3.5 text-white">
              <p className="font-serif text-3xl font-semibold leading-none tabular-nums md:text-4xl">
                {next ? pad(t.value) : "--"}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                {t.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────── Verse that changes every day ───────────── */
// King James Version (public domain)


export function VerseOfTheDay() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const d = new Date();
    const dayOfYear = Math.floor(
      (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 86_400_000,
    );
    setIndex(dayOfYear % VERSES.length);
  }, []);

  const v = index === null ? null : VERSES[index];

  return (
    <figure className="relative min-h-[8.5rem] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-400">Verse for today</p>
      <blockquote
        className={`mt-3 font-serif text-xl italic leading-snug text-stone-100 transition-opacity duration-700 md:text-2xl ${
          v ? "opacity-100" : "opacity-0"
        }`}
      >
        &ldquo;{v?.text ?? "…"}&rdquo;
      </blockquote>
      <figcaption
        className={`mt-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-red-400 transition-opacity duration-700 ${
          v ? "opacity-100" : "opacity-0"
        }`}
      >
        {v?.ref ?? "…"} · KJV
      </figcaption>
    </figure>
  );
}
