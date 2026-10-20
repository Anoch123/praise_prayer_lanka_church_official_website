import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // remove if your layout already renders the navbar
// import FeaturedSermon from "@/components/FeaturedSermon";
import VideoLibrary from "@/components/VideoLibrary";
import { getAllVideos } from "@/lib/utils/youtube";
import FeaturedSermon from "@/components/FeaturedSermon";
import Footer from "@/components/footer";

// export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sermons & Messages",
  description: "Watch and be encouraged by every message from our services, any time.",
};

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com"; // TODO: your channel link

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5.5 0h3v5.5H14v3H8.5V18h-3V8.5H0v-3h5.5V0Z" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z" />
    </svg>
  );
}

export default async function PPLCSermansPage() {
  const videos = await getAllVideos();
  const latest = videos[0];
  const rest = videos.slice(1); // latest is featured above, so it isn't repeated in the library

  return (
    <>
      <Navbar />

      {/* ───────── Banner ───────── */}
      <section className="relative isolate overflow-hidden bg-[#1c1411] pt-[84px] md:pt-[124px]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2a1d18] via-[#1c1411] to-[#1c1411]" />
        <Cross className="pointer-events-none absolute -right-10 top-1/2 -z-10 h-[520px] w-auto -translate-y-1/2 rotate-12 text-white/[0.05]" />

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <p className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-red-400">
            <span className="h-px w-12 bg-red-500" />
            Watch
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#fbf7f0] md:text-7xl">
            Sermons &amp; <span className="italic text-red-500">Messages</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-300 md:text-xl">
            Every message from our services, all in one place. Watch, be encouraged and
            share with someone who needs to hear it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 text-stone-300">
            <div>
              <p className="font-serif text-4xl font-semibold text-[#fbf7f0]">{videos.length}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
                Messages
              </p>
            </div>
            <span className="hidden h-10 w-px bg-white/15 sm:block" />
            <p className="max-w-xs text-sm leading-relaxed">
              New messages are added every week after our Sunday services.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Featured latest message ───────── */}
      {latest && (
        <section className="relative overflow-hidden bg-[#fbf7f0] px-6 py-16 md:py-24">
          <Cross className="pointer-events-none absolute -left-16 top-10 h-[380px] w-auto -rotate-12 text-[#1c1411]/[0.03]" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <FeaturedSermon video={latest} />
            </div>

            <div className="lg:col-span-4">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                </span>
                Latest Message
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#1c1411] md:text-4xl">
                {latest.title}
              </h2>
              {latest.date && <p className="mt-3 text-stone-500">{latest.date}</p>}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={`https://www.youtube.com/watch?v=${latest.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ff0000] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_28px_rgba(255,0,0,0.3)] transition-all hover:-translate-y-px hover:bg-red-700"
                >
                  <YouTubeIcon />
                  Watch on YouTube
                </a>
                {rest.length > 0 && (
                  <a
                    href="#library"
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#1c1411]/20 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1c1411] transition-colors hover:border-[#1c1411] hover:bg-[#1c1411] hover:text-white"
                  >
                    More Messages
                    <span className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5">
                      <Arrow />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───────── Library ───────── */}
      {rest.length > 0 && (
        <div id="library" className="bg-[#fbf7f0]">
          <div className="mx-auto max-w-7xl px-6 pt-4 md:px-8">
            <p className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-red-600">
              <span className="h-px w-12 bg-red-600" />
              Archive
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#1c1411] md:text-5xl">
              More <span className="italic text-red-600">Messages</span>
            </h2>
          </div>
          <VideoLibrary videos={rest} />
        </div>
      )}

      {/* ───────── Subscribe band ───────── */}
      <section className="relative isolate overflow-hidden bg-[#1c1411] px-6 py-20 md:py-24">
        <Cross className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[460px] w-auto -translate-x-1/2 -translate-y-1/2 text-white/[0.04]" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-red-400">
            Never miss a message
          </p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#fbf7f0] md:text-5xl">
            Join us every Sunday,
            <span className="block italic text-red-500">in person or online.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            Subscribe to our YouTube channel to be notified when a new message is
            published, or come and worship with us in person.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#ff0000] px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_32px_rgba(255,0,0,0.35)] transition-all hover:-translate-y-px hover:bg-red-700"
            >
              <YouTubeIcon />
              Subscribe
            </a>
            <a
              href="/partner"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/40 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#fbf7f0] transition-colors hover:border-[#fbf7f0] hover:bg-[#fbf7f0] hover:text-[#1c1411]"
            >
              Plan a Visit
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}