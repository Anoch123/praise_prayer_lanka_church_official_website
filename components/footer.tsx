import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants/navbar";

const CHURCH_NAME = "Grace Community Church"; // TODO
const PHONE = "(555) 123-4567"; // TODO
const LOCATION = "Your City, ST 12345"; // TODO

export default function Footer() {
  return (
    <footer className="bg-[#0B1020] px-6 py-12 text-center text-slate-300">
      <nav
        aria-label="Footer"
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:text-red-400"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/give"
          className="text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:text-red-400"
        >
          Give
        </Link>
      </nav>

      <div className="mt-8 space-y-1.5 text-sm text-slate-400">
        <p>
          Phone:{" "}
          <a
            href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
            className="transition-colors hover:text-white"
          >
            {PHONE}
          </a>
        </p>
        <p>
          © {CHURCH_NAME} · {LOCATION}
        </p>
        <p>{CHURCH_NAME} is a 501(c)(3) non-profit organization</p>
      </div>
    </footer>
  );
}