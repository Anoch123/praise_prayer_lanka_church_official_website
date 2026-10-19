"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants/navbar";

const CHURCH_NAME = "Grace Community Church"; // TODO

function SocialIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    youtube:
      "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z",
    facebook:
      "M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V13h2.7v8h3.2Z",
    instagram:
      "M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 12c0-2.4 0-2.7-.1-3.7-.1-1-.3-1.8-.7-2.4a4 4 0 0 0-1.6-1.6c-.6-.4-1.4-.6-2.4-.7C15.2 3.5 14.9 3.5 12.5 3.5h-1c-2.4 0-2.7 0-3.7.1-1 .1-1.8.3-2.4.7a4 4 0 0 0-1.6 1.6c-.4.6-.6 1.4-.7 2.4C3 8.3 3 8.6 3 11v2c0 2.4 0 2.7.1 3.7.1 1 .3 1.8.7 2.4a4 4 0 0 0 1.6 1.6c.6.4 1.4.6 2.4.7 1 .1 1.3.1 3.7.1h1c2.4 0 2.7 0 3.7-.1 1-.1 1.8-.3 2.4-.7a4 4 0 0 0 1.6-1.6c.4-.6.6-1.4.7-2.4.1-1 .1-1.3.1-3.7Z",
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 10 10"
      fill="none"
      className={`shrink-0 transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M1.5 3.5L5 7L8.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);

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
    function handleClick(e: MouseEvent) {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(e.target as Node)
      ) {
        setOpenDesktopMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      className={`fixed z-50 flex flex-col overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:left-1/2 md:right-auto md:top-6 md:h-16 md:w-[calc(100%-3rem)] md:max-w-6xl md:-translate-x-1/2 md:overflow-visible md:rounded-full ${
        open
          ? "inset-0 h-[100dvh] rounded-none"
          : "inset-x-6 top-6 h-16 rounded-[32px]"
      }`}
    >
      <div
        className={`flex h-16 w-full shrink-0 items-center justify-between px-10 transition-[margin] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:px-6 md:!mt-0 md:transition-none ${
          open ? "mt-6" : "mt-0"
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-serif text-[22px] font-semibold tracking-tight text-slate-900 md:text-[20px]"
        >
          {CHURCH_NAME}
        </Link>

        {/* Desktop nav */}
        <nav ref={desktopMenuRef} className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children?.length;
            const isOpen = openDesktopMenu === link.href;

            if (!hasChildren) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[17px] font-medium text-slate-800 transition-colors hover:text-red-600"
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div key={link.href} className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDesktopMenu((v) => (v === link.href ? null : link.href))
                  }
                  aria-expanded={isOpen}
                  className="flex items-center gap-2 text-[17px] font-medium text-slate-800 transition-colors hover:text-red-600"
                >
                  {link.label}
                  <Chevron open={isOpen} />
                </button>

                <div
                  className={`absolute left-1/2 top-full w-60 -translate-x-1/2 pt-4 transition-all duration-200 ease-out ${
                    isOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                    {link.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDesktopMenu(null)}
                        className="block rounded-xl px-4 py-2.5 text-[16px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Desktop right side: socials + Partner + Give */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-3 text-slate-500">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="transition-colors hover:text-red-600"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
          <Link
            href="/partner"
            className="text-sm font-semibold text-slate-800 transition-colors hover:text-red-600"
          >
            Partner
          </Link>
          <Link
            href="/give"
            className="inline-flex items-center rounded-full bg-[#ff0000] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Give
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center text-slate-900 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-current transition-opacity duration-200 ease-out ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`flex flex-1 flex-col overflow-y-auto px-10 pb-8 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <nav className="flex flex-col">
          {NAV_LINKS.map((link, i) => {
            const hasChildren = !!link.children?.length;
            const isOpen = openMobileMenu === link.href;
            const delay = { transitionDelay: open ? `${150 + i * 50}ms` : "0ms" };
            const anim = open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0";

            if (!hasChildren) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={delay}
                  className={`border-b border-slate-200 py-7 text-[26px] font-medium transition-all duration-300 ease-out ${anim}`}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div
                key={link.href}
                style={delay}
                className={`border-b border-slate-200 transition-all duration-300 ease-out ${anim}`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileMenu((v) => (v === link.href ? null : link.href))
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-7 text-[26px] font-medium"
                >
                  {link.label}
                  <Chevron open={isOpen} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col px-4 pb-6">
                      {link.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="py-2.5 text-[22px] font-medium text-slate-600"
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
          style={{
            transitionDelay: open ? `${150 + NAV_LINKS.length * 50}ms` : "0ms",
          }}
          className={`flex flex-col gap-3 pt-6 transition-all duration-300 ease-out ${
            open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <Link
            href="/give"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-[10px] bg-[#ff0000] px-5 py-3.5 text-[20px] font-semibold text-white transition-colors hover:bg-red-700"
          >
            Give
          </Link>
          <Link
            href="/partner"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-[10px] border border-slate-300 px-5 py-3.5 text-[20px] font-semibold text-slate-800"
          >
            Partner
          </Link>
          <div className="flex justify-center gap-6 pt-3 text-slate-500">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}