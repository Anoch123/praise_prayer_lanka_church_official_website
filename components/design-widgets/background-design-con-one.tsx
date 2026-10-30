import { Cross } from "../icon-widgets/icons";

export default function BackgroundDesignConOne() {
  return (
    <>
      {/* ───────── Background designs ───────── */}
      {/* Dot grid, faded toward the edges */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1c1411_1px,transparent_1px)] opacity-[0.09] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
      {/* Soft warm glows */}
      <div className="absolute -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-48 -right-40 -z-10 h-[560px] w-[560px] rounded-full bg-[#fbf7f0] blur-2xl" />
      {/* Concentric rings */}
      <div className="pointer-events-none absolute -right-48 top-16 -z-10 h-[560px] w-[560px] rounded-full border border-[#1c1411]/[0.07]" />
      <div className="pointer-events-none absolute -right-24 top-40 -z-10 h-[360px] w-[360px] rounded-full border border-red-600/15" />
      {/* Large outlined crosses */}
      <Cross className="pointer-events-none absolute -left-16 top-24 -z-10 h-[460px] w-auto -rotate-12 text-[#1c1411]/[0.035]" />
      <Cross className="pointer-events-none absolute -bottom-20 right-10 -z-10 h-[300px] w-auto rotate-12 text-red-600/[0.06]" />
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
    </>
  );
}
