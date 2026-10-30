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
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
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
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M5.5 0h3v5.5H14v3H8.5V18h-3V8.5H0v-3h5.5V0Z" />
    </svg>
  );
}

export function SocialIcon({ name }: { name: string }) {
  const platform = name.toLowerCase();

  if (platform.includes("instagram")) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (platform.includes("youtube")) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    );
  }

  if (platform.includes("facebook")) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Play({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 2.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

export function Pin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
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

export function Eyebrow({
  children,
  light = false,
  center = false,
}: {
  children: React.ReactNode;
  light?: boolean;
  center?: boolean;
}) {
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

export function YouTubeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z" />
    </svg>
  );
}

// Animated bars shown on the video that is currently selected
export function Equalizer() {
  return (
    <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
      {[0.6, 1, 0.45].map((h, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom animate-pulse rounded-full bg-red-600"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  );
}

export function LightDecor({ tone = "left" }: { tone?: "left" | "right" }) {
  const side = tone === "left";
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1c1411_1px,transparent_1px)] opacity-[0.07] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div
        className={`absolute top-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-red-500/10 blur-3xl ${side ? "-left-44" : "-right-44"}`}
      />
      <div
        className={`pointer-events-none absolute top-16 -z-10 h-[560px] w-[560px] rounded-full border border-[#1c1411]/[0.07] ${side ? "-right-52" : "-left-52"}`}
      />
      <div
        className={`pointer-events-none absolute top-40 -z-10 h-[360px] w-[360px] rounded-full border border-red-600/15 ${side ? "-right-28" : "-left-28"}`}
      />
      <Cross
        className={`pointer-events-none absolute bottom-10 -z-10 h-[420px] w-auto text-[#1c1411]/[0.035] ${side ? "-left-16 -rotate-12" : "-right-16 rotate-12"}`}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1c1411]/15 to-transparent" />
    </>
  );
}

export function DarkDecor() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2a1d18] via-[#1c1411] to-[#1c1411]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.05] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-48 bottom-0 -z-10 h-[520px] w-[520px] rounded-full border border-white/[0.07]" />
      <Cross className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-[560px] w-auto -translate-y-1/2 rotate-12 text-white/[0.04]" />
    </>
  );
}

/* ——— ——— ✝ ——— ——— */
export function Divider({
  dark = false,
  center = false,
}: {
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={`mt-6 flex items-center gap-4 ${center ? "justify-center" : ""} ${dark ? "text-white/25" : "text-[#1c1411]/25"}`}
    >
      <span className="h-px w-14 bg-current" />
      <Cross className="text-red-600" />
      <span className="h-px w-14 bg-current" />
    </div>
  );
}

export function SectionIcon({
  name,
  size = 24,
}: {
  name: string;
  size?: number;
}) {
  const p = {
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
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "users":
      return (
        <svg {...p}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
        </svg>
      );
    case "car":
      return (
        <svg {...p}>
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case "smile":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...p}>
          <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" />
          <path d="M6 2v2M10 2v2M14 2v2" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    default:
      return <Cross className="h-[1.1em] w-auto" />;
  }
}

export function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
      {children}
    </h3>
  );
}

export function PhoneIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function MessageIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
    </svg>
  );
}

export function Phone({ size = 20 }: { size?: number }) {
  return (
    <span className="mt-0.5 text-red-300">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
      </svg>
    </span>
  );
}
