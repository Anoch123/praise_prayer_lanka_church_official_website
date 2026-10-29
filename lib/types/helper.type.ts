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