export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 10 10"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M1.5 3.5L5 7L8.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Cross({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5.5 0h3v5.5H14v3H8.5V18h-3V8.5H0v-3h5.5V0Z" />
    </svg>
  );
}

export function SocialIcon({ name }: { name: string }) {
  const platform = name.toLowerCase();

  if (platform.includes("instagram")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (platform.includes("youtube")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    );
  }

  if (platform.includes("facebook")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Play({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

export function Pin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 2.5l7 7-2.2.7-3.6 3.6.3 4.4-1.7 1.7-4.5-4.5-5.6 5.6-1-1 5.6-5.6-4.5-4.5L5.5 8.2l4.4.3 3.6-3.6.7-2.4Z" />
    </svg>
  );
}

export function Calendar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  );
}

export function Eyebrow({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) {
  const line = light ? "bg-red-500" : "bg-red-600";
  return (
    <p
      className={`flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] ${
        light ? "text-red-400" : "text-red-600"
      } ${center ? "justify-center" : ""}`}
    >
      <span className={`h-px w-12 ${line}`} />
      {children}
      {center && <span className={`h-px w-12 ${line}`} />}
    </p>
  );
}

export function Clock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2V4Z" />
          <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7V4Z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
        </svg>
      );
    case "music":
      return (
        <svg {...common}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1Z" />
        </svg>
      );
    default:
      return <Cross className="h-[1.1em] w-auto" />;
  }
}