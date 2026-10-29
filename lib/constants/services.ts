// Weekly services used by the footer's live countdown.
// TODO: keep in sync with your real service times.

// Church timezone as minutes from UTC (Sri Lanka = +5:30 = 330). No daylight-saving logic is needed
// for fixed-offset countries; if your timezone observes DST, update this twice a year or ask for an Intl-based version.
export const CHURCH_TZ_OFFSET_MINUTES = 330; // TODO

// How long a service runs, so we can show "Happening now"
export const SERVICE_DURATION_MINUTES = 90; // TODO

export type WeeklyService = {
  name: string;
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  hour: number; // 24h
  minute: number;
  dayName: string;
  timeLabel: string;
};

export const WEEKLY_SERVICES: WeeklyService[] = [
  { name: "Sunday Worship", day: 0, hour: 9, minute: 0, dayName: "Sunday", timeLabel: "9:00 AM" },
  { name: "Sunday Worship", day: 0, hour: 11, minute: 0, dayName: "Sunday", timeLabel: "11:00 AM" },
  { name: "Midweek Prayer", day: 3, hour: 19, minute: 0, dayName: "Wednesday", timeLabel: "7:00 PM" },
];