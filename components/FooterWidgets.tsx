"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CHURCH_TZ_OFFSET_MINUTES,
  SERVICE_DURATION_MINUTES,
  WEEKLY_SERVICES,
} from "@/lib/constants/services";

/* ───────────── Live countdown to the next service ───────────── */

type Next = { name: string; when: string; secondsLeft: number; live: boolean };

const WEEK = 7 * 86400;

function compute(nowMs: number): Next {
  // Shift "now" into church-local time and read it with the UTC getters.
  const d = new Date(nowMs + CHURCH_TZ_OFFSET_MINUTES * 60_000);
  const nowSec =
    d.getUTCDay() * 86400 + d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();

  let best: Next | null = null;

  for (const s of WEEKLY_SERVICES) {
    const startSec = s.day * 86400 + s.hour * 3600 + s.minute * 60;
    const since = (nowSec - startSec + WEEK) % WEEK;
    if (since < SERVICE_DURATION_MINUTES * 60) {
      return { name: s.name, when: `${s.dayName} · ${s.timeLabel}`, secondsLeft: 0, live: true };
    }
    const until = (startSec - nowSec + WEEK) % WEEK;
    if (!best || until < best.secondsLeft) {
      best = { name: s.name, when: `${s.dayName} · ${s.timeLabel}`, secondsLeft: until, live: false };
    }
  }
  return best ?? { name: "", when: "", secondsLeft: 0, live: false };
}

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
const VERSES = [
  { text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", ref: "John 3:16" },
  { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "I can do all things through Christ which strengtheneth me.", ref: "Philippians 4:13" },
  { text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5" },
  { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
  { text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God.", ref: "Isaiah 41:10" },
  { text: "God is our refuge and strength, a very present help in trouble.", ref: "Psalm 46:1" },
  { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105" },
  { text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.", ref: "Matthew 5:16" },
  { text: "Now faith is the substance of things hoped for, the evidence of things not seen.", ref: "Hebrews 11:1" },
  { text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.", ref: "Joshua 1:9" },
  { text: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.", ref: "1 Corinthians 13:13" },
  { text: "And we know that all things work together for good to them that love God.", ref: "Romans 8:28" },
  { text: "The Lord bless thee, and keep thee: the Lord make his face shine upon thee, and be gracious unto thee.", ref: "Numbers 6:24-25" },
];

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

/* ───────────── Back to top ───────────── */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-stone-300 transition-colors hover:text-white"
    >
      Back to top
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-all group-hover:-translate-y-1 group-hover:border-red-500 group-hover:bg-red-600">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}