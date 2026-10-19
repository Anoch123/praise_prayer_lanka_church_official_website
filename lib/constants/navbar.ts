export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "What We Believe", href: "/beliefs" },
      { label: "Calendar", href: "/calendar" },
    ],
  },
  {
    label: "Ministries",
    href: "/ministries",
    children: [
      { label: "Kids", href: "/ministries/kids" },
      { label: "Youth", href: "/ministries/youth" },
      { label: "Outreach", href: "/ministries/outreach" },
    ],
  },
  { label: "Sermons", href: "/sermons" },
  {
    label: "Contact",
    href: "/contact",
    children: [
      { label: "General Contact", href: "/contact" },
      { label: "Prayer Request", href: "/prayer" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
] as const;