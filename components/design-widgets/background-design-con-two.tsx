import { Cross } from "../icon-widgets/icons";

export default function BackgroundDesignConTwo() {
  return (
    <>
      {/* ───────── Background designs ───────── */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1c1411_1px,transparent_1px)] opacity-[0.07] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-52 -left-40 -z-10 h-[560px] w-[560px] rounded-full bg-white blur-2xl" />
      <div className="pointer-events-none absolute -left-52 top-24 -z-10 h-[560px] w-[560px] rounded-full border border-[#1c1411]/[0.07]" />
      <div className="pointer-events-none absolute -left-28 top-48 -z-10 h-[360px] w-[360px] rounded-full border border-red-600/15" />
      <Cross className="pointer-events-none absolute -right-20 top-10 -z-10 h-[460px] w-auto rotate-12 text-[#1c1411]/[0.035]" />
      <Cross className="pointer-events-none absolute -bottom-16 left-16 -z-10 h-[260px] w-auto -rotate-12 text-red-600/[0.06]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1c1411]/15 to-transparent" />
    </>
  );
}
