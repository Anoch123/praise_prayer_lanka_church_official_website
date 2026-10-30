import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Cross, Eyebrow } from "./icon-widgets/icons";
import { PageHeroCrumb, PageHeroProps } from "@/lib/types/helper.type";

export default function PageHero({
  title,
  accent,
  eyebrow,
  description,
  breadcrumbs,
  image,
  align = "left",
  showNavbar = true,
  className = "",
  isSermonVideoLength = false,
  sermonVideoLength,
}: PageHeroProps) {
  const center = align === "center";

  const crumbs: PageHeroCrumb[] = breadcrumbs?.length
    ? [{ label: "Home", href: "/" }, ...breadcrumbs]
    : [];

  return (
    <>
      {showNavbar && <Navbar />}

      <section
        className={`relative isolate overflow-hidden bg-[#1c1411] pt-[84px] md:pt-[124px] ${className}`}
      >
        {/* Background: soft photo under a warm overlay */}
        {image ? (
          <>
            <div
              className="absolute inset-0 -z-30 bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0 -z-20 bg-[#1c1411]/85" />
          </>
        ) : (
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#2a1d18] to-[#1c1411]" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1c1411]/70 via-transparent to-transparent" />

        {/* One quiet cross ornament + a red accent along the bottom edge */}
        <Cross
          className={`pointer-events-none absolute top-1/2 -z-10 h-[380px] w-auto -translate-y-1/2 text-white/[0.05] ${
            center ? "left-1/2 -translate-x-1/2" : "-right-6 rotate-12"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 via-red-600/40 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
          <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
            {/* Breadcrumb */}
            {crumbs.length > 0 && (
              <nav
                aria-label="Breadcrumb"
                className={`mb-8 flex flex-wrap items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-stone-400 ${
                  center ? "justify-center" : ""
                }`}
              >
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1;
                  return (
                    <span
                      key={`${c.label}-${i}`}
                      className="flex items-center gap-3"
                    >
                      {i > 0 && <span className="text-red-500">/</span>}
                      {c.href && !last ? (
                        <Link
                          href={c.href}
                          className="transition-colors hover:text-white"
                        >
                          {c.label}
                        </Link>
                      ) : (
                        <span
                          aria-current={last ? "page" : undefined}
                          className={last ? "text-stone-200" : undefined}
                        >
                          {c.label}
                        </span>
                      )}
                    </span>
                  );
                })}
              </nav>
            )}

            {eyebrow && (
              <div className={center ? "flex justify-center" : undefined}>
                <Eyebrow light>{eyebrow}</Eyebrow>
              </div>
            )}

            <h1
              className={`${eyebrow ? "mt-5" : ""} font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#fbf7f0] sm:text-5xl md:text-6xl`}
            >
              {title}
              {accent && (
                <span className="block italic text-red-500">{accent}</span>
              )}
            </h1>

            {description && (
              <p
                className={`mt-6 max-w-2xl text-lg leading-relaxed text-stone-300 ${
                  center ? "mx-auto" : ""
                }`}
              >
                {description}
              </p>
            )}
          </div>

          {isSermonVideoLength ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 text-stone-300">
              <div>
                <p className="font-serif text-4xl font-semibold text-[#fbf7f0]">
                  {sermonVideoLength}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
                  Messages
                </p>
              </div>
              <span className="hidden h-10 w-px bg-white/15 sm:block" />
              <p className="max-w-xs text-sm leading-relaxed">
                New messages are added every week after our Sunday services.
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}
