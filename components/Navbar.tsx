"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Arrow, Chevron, Cross, SocialIcon } from "@/components/icon-widgets/icons";
import { COMMON_IMAGES } from "@/lib/constants/helper_images";
import { COMMON_TEXTS, DESCRIPTIONS, NAV_LINKS, SOCIALS } from "@/lib/constants/helper_data";
import FeaturCardNewHere from "./widgets/feature-card-new-here";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setOpenMobileMenu(null);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDesktopMenu(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDesktopMenu(null);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 font-sans"
      >

        {/* ───────── Main bar ───────── */}
        <div
          className={`relative border-b transition-all duration-300 ${
            scrolled || open || openDesktopMenu
              ? "border-stone-200 bg-[#fbf7f0]/95 shadow-[0_8px_30px_rgba(28,20,17,0.08)] backdrop-blur-md"
              : "border-stone-200/70 bg-[#fbf7f0]"
          }`}
        >
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[height] duration-300 md:px-8 ${
              scrolled ? "h-[68px]" : "h-[84px]"
            }`}
          >
            {/* Brand */}
            <Link
              href="/"
              onClick={() => {
                setOpen(false);
                setOpenDesktopMenu(null);
              }}
              className="flex items-center gap-3"
            >
              <Image
                src={COMMON_IMAGES.App_logo}
                width={80}
                height={80}
                alt={`${COMMON_TEXTS.App_name} logo`}
                className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-12"}`}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-10 md:flex">
              {NAV_LINKS.map((link) => {
                const hasChildren = !!link.children?.length;
                const isOpen = openDesktopMenu === link.href;
                const base =
                  "group relative flex items-center gap-2 py-2 text-[15px] font-semibold uppercase tracking-[0.14em] text-[#1c1411] transition-colors hover:text-red-600";
                const underline = (
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-red-600 transition-all duration-300 ${
                      isOpen ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                );

                if (!hasChildren) {
                  return (
                    <Link key={link.href} href={link.href} className={base}>
                      {link.label}
                      {underline}
                    </Link>
                  );
                }

                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() =>
                      setOpenDesktopMenu((v) => (v === link.href ? null : link.href))
                    }
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={base}
                  >
                    {link.label}
                    <Chevron open={isOpen} />
                    {underline}
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_6px_16px_rgba(255,0,0,0.25)] transition-all hover:-translate-y-px hover:bg-red-700"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1c1411]/15 text-[#1c1411] md:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          {/* ───────── Desktop mega menu ───────── */}
          {NAV_LINKS.filter((l) => l.children?.length).map((link) => {
            const isOpen = openDesktopMenu === link.href;
            return (
              <div
                key={link.href}
                className={`absolute inset-x-0 top-full hidden transition-all duration-300 ease-out md:block ${
                  isOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <div className="border-b border-stone-200 bg-[#fbf7f0] shadow-[0_30px_50px_rgba(28,20,17,0.12)]">
                  <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-8 py-10">
                    <FeaturCardNewHere setOpenDesktopMenu={setOpenDesktopMenu} />

                    {/* Link list */}
                    <div className="col-span-8">
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-500">
                        {link.label}
                      </p>
                      <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
                        {link.children!.map((child: any, i : any) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            onClick={() => setOpenDesktopMenu(null)}
                            className="group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-white"
                          >
                            <span className="font-serif text-[15px] italic text-red-600">
                              0{i + 1}
                            </span>
                            <span className="flex-1">
                              <span className="block font-serif text-[21px] font-semibold text-[#1c1411]">
                                {child.label}
                              </span>
                              <span className="mt-1 block text-sm leading-relaxed text-stone-500">
                                {DESCRIPTIONS[child.href] ?? ""}
                              </span>
                            </span>
                            <span className="mt-2 -translate-x-2 text-red-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                              <Arrow />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      {/* ───────── Mobile full-screen menu ───────── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#fbf7f0] pt-[84px] transition-[clip-path] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:hidden ${
          open
            ? "pointer-events-auto [clip-path:inset(0_0_0_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav className="flex flex-col px-6 pt-4">
          {NAV_LINKS.map((link, i) => {
            const hasChildren = !!link.children?.length;
            const isOpen = openMobileMenu === link.href;
            const delay = { transitionDelay: open ? `${200 + i * 60}ms` : "0ms" };
            const anim = open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0";

            if (!hasChildren) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={delay}
                  className={`flex items-baseline gap-4 border-b border-stone-200 py-6 font-serif text-[34px] font-semibold text-[#1c1411] transition-all duration-500 ease-out ${anim}`}
                >
                  <span className="text-sm italic text-red-600">0{i + 1}</span>
                  {link.label}
                </Link>
              );
            }

            return (
              <div
                key={link.href}
                style={delay}
                className={`border-b border-stone-200 transition-all duration-500 ease-out ${anim}`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileMenu((v) => (v === link.href ? null : link.href))
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-baseline justify-between py-6 font-serif text-[34px] font-semibold text-[#1c1411]"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-sm italic text-red-600">0{i + 1}</span>
                    {link.label}
                  </span>
                  <Chevron open={isOpen} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mb-5 ml-9 flex flex-col border-l-2 border-red-600/30 pl-5">
                      {link.children!.map((child: any) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="py-2.5 text-[20px] font-medium text-stone-600 transition-colors active:text-red-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div
          style={{ transitionDelay: open ? `${200 + NAV_LINKS.length * 60 + 60}ms` : "0ms" }}
          className={`mt-auto flex flex-col gap-3 px-6 pb-8 pt-8 transition-all duration-500 ease-out ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="rounded-2xl bg-[#1c1411] p-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-400">
              Join us
            </p>
            <p className="mt-2 font-serif text-xl">{COMMON_TEXTS.Service_time}</p>
            <p className="mt-1 text-sm text-stone-400">{COMMON_TEXTS.Church_addr}</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/contact-us"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center rounded-full bg-[#ff0000] px-5 py-4 text-[15px] font-semibold uppercase tracking-[0.1em] text-white"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 text-stone-500">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 transition-colors active:bg-stone-200"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}