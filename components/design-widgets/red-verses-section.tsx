"use client";

import { useEffect, useState } from "react";
import { Cross } from "@/components/icon-widgets/icons";
import { VERSES } from "@/lib/constants/helper_data";
import { Verse } from "@/lib/types/helper.type";

export default function VersesSection({
  verses = VERSES,
}: {
  verses?: Verse[];
}) {
  // null until the page has loaded in the browser. Picking the random verse
  // there (not during render) keeps the server and browser HTML identical.
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!verses.length) return;
    setIndex(Math.floor(Math.random() * verses.length));
  }, [verses.length]);

  if (!verses.length) return null;

  // Before the random pick, render the first verse invisibly so the
  // section keeps its height and nothing jumps when the real one fades in.
  const verse = verses[index ?? 0];
  const ready = index !== null;

  return (
    <section
      aria-label="Verse"
      className="bg-red-700 px-6 py-16 text-white md:py-24"
    >
      <figure
        className={`mx-auto max-w-4xl transition-opacity duration-700 motion-reduce:transition-none ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Cross className="h-8 w-auto text-white/80" />
        <blockquote className="mt-6 font-serif text-3xl font-semibold leading-snug md:text-5xl">
          “{verse.text}”
        </blockquote>
        <figcaption className="mt-6 text-base font-semibold uppercase tracking-[0.2em] text-white/90">
          {verse.ref}
        </figcaption>
      </figure>
    </section>
  );
}