"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-stone-300 transition-colors hover:text-white"
    >
      Back to top
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-all group-hover:-translate-y-1 group-hover:border-red-500 group-hover:bg-red-600">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
