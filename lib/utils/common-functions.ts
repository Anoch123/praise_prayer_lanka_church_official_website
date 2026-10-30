import { io } from "next/cache";
import { CHURCH_TZ_OFFSET_MINUTES, MINISTRIES, SERVICE_DURATION_MINUTES, WEEK, WEEKLY_SERVICES } from "../constants/helper_data";
import { Next } from "../types/helper.type";

// If the date string can be parsed, show it as a day / month block; otherwise show a calendar icon.
export function parseDate(input: string): { day: string; month: string } | null {
  const d = new Date(input);
  if (isNaN(d.getTime())) return null;
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}

/* ───────────── Live countdown to the next service ───────────── */

export function compute(nowMs: number): Next {
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

export default async function CurrentYear() {
  await io();
  return new Date().getFullYear();
}

export function getMinistry(slug: string) {
  return MINISTRIES.find((m) => m.slug === slug);
}