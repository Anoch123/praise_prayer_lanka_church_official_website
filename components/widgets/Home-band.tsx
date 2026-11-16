import { HOME_BAND_ITEMS } from "@/lib/constants/helper_data";
import { BandItem } from "@/lib/types/helper.type";
import Link from "next/link";

export default function HomeBand({
  items = HOME_BAND_ITEMS,
}: {
  items?: BandItem[];
}) {
  if (!items.length) return null;

  return (
    <nav aria-label="Quick links" className="bg-red-700 py-4 text-white">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 text-sm font-semibold uppercase tracking-[0.2em]">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-6">
            {i > 0 && (
              <span aria-hidden="true" className="text-white/60">
                •
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="rounded underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
              >
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}