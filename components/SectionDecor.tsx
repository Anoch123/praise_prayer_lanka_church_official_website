import { Cross } from "./icons";

/* Shared section decoration, so every page gets the same church look.
   Put <LightDecor /> or <DarkDecor /> as the first child of a
   `relative isolate overflow-hidden` <section>. */

export function LightDecor({ tone = "left" }: { tone?: "left" | "right" }) {
  const side = tone === "left";
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1c1411_1px,transparent_1px)] opacity-[0.07] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className={`absolute top-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-red-500/10 blur-3xl ${side ? "-left-44" : "-right-44"}`} />
      <div className={`pointer-events-none absolute top-16 -z-10 h-[560px] w-[560px] rounded-full border border-[#1c1411]/[0.07] ${side ? "-right-52" : "-left-52"}`} />
      <div className={`pointer-events-none absolute top-40 -z-10 h-[360px] w-[360px] rounded-full border border-red-600/15 ${side ? "-right-28" : "-left-28"}`} />
      <Cross className={`pointer-events-none absolute bottom-10 -z-10 h-[420px] w-auto text-[#1c1411]/[0.035] ${side ? "-left-16 -rotate-12" : "-right-16 rotate-12"}`} />
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
export function Divider({ dark = false, center = false }: { dark?: boolean; center?: boolean }) {
  return (
    <div className={`mt-6 flex items-center gap-4 ${center ? "justify-center" : ""} ${dark ? "text-white/25" : "text-[#1c1411]/25"}`}>
      <span className="h-px w-14 bg-current" />
      <Cross className="text-red-600" />
      <span className="h-px w-14 bg-current" />
    </div>
  );
}

export function SectionIcon({ name, size = 24 }: { name: string; size?: number }) {
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
      return (<svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
    case "pin":
      return (<svg {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>);
    case "users":
      return (<svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></svg>);
    case "heart":
      return (<svg {...p}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8Z" /></svg>);
    case "car":
      return (<svg {...p}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>);
    case "smile":
      return (<svg {...p}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>);
    case "coffee":
      return (<svg {...p}><path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" /><path d="M6 2v2M10 2v2M14 2v2" /></svg>);
    case "check":
      return (<svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
    default:
      return <Cross className="h-[1.1em] w-auto" />;
  }
}