import { EVENTS, EVENT_TIMEZONE } from "@/lib/constants/events";

// Everything is pre-formatted on the server so the page never mismatches between
// server and browser timezones.
export type EventView = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  href?: string;
  monthLabel: string; // "November 2026"
  monthShort: string; // "Nov"
  day: string; // "06"
  weekday: string; // "Friday"
  timeLabel: string; // "7:00 PM – 9:00 PM" | "Dec 4 – Dec 6"
  gcalUrl: string;
};

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: EVENT_TIMEZONE, ...opts });

const toGoogleDate = (d: Date) =>
  d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function getUpcomingEvents(): EventView[] {
  const now = Date.now();

  return EVENTS
    .map((e) => ({ e, start: new Date(e.start), end: e.end ? new Date(e.end) : undefined }))
    .filter(({ start, end }) => !isNaN(start.getTime()) && (end ?? start).getTime() >= now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .map(({ e, start, end }) => {
      const time = (d: Date) => fmt({ hour: "numeric", minute: "2-digit" }).format(d);
      const shortDate = (d: Date) => fmt({ month: "short", day: "numeric" }).format(d);

      let timeLabel: string;
      if (e.allDay) {
        timeLabel =
          end && shortDate(end) !== shortDate(start)
            ? `${shortDate(start)} – ${shortDate(end)}`
            : "All day";
      } else {
        timeLabel = end ? `${time(start)} – ${time(end)}` : time(start);
      }

      const gcal = new URLSearchParams({
        action: "TEMPLATE",
        text: e.title,
        dates: `${toGoogleDate(start)}/${toGoogleDate(end ?? new Date(start.getTime() + 2 * 3600_000))}`,
        details: e.description,
        location: e.location,
      });

      return {
        id: e.id,
        title: e.title,
        description: e.description,
        category: e.category,
        location: e.location,
        href: e.href,
        monthLabel: fmt({ month: "long", year: "numeric" }).format(start),
        monthShort: fmt({ month: "short" }).format(start),
        day: fmt({ day: "2-digit" }).format(start),
        weekday: fmt({ weekday: "long" }).format(start),
        timeLabel,
        gcalUrl: `https://calendar.google.com/calendar/render?${gcal.toString()}`,
      };
    });
}