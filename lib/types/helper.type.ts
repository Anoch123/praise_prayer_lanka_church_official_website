export type FooterLink = {
  label: string;
  href: string;
};

export type FooterRow = {
  title: string;
  links: FooterLink[];
};

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type PageHeroCrumb = { label: string; href?: string };

export type PageHeroProps = {
  title: string;
  accent?: string;
  eyebrow?: string;
  description?: string;
  breadcrumbs?: PageHeroCrumb[];
  image?: string | null;
  align?: "left" | "center";
  showNavbar?: boolean;
  className?: string;
  isSermonVideoLength?: boolean;
  sermonVideoLength? : number;
};

export type ChurchEvent = {
  id: string;
  title: string;
  description: string;
  category: string;
  start: string;
  end?: string;
  allDay?: boolean;
  location: string;
  href?: string;
};

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

export type WeeklyService = {
  id: number;
  name: string;
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  hour: number; // 24h
  minute: number;
  dayName: string;
  timeLabel: string;
};

export type Video = { id: string; title: string; date: string };

export type Status = "idle" | "sending" | "success" | "error";

export type Next = { name: string; when: string; secondsLeft: number; live: boolean };