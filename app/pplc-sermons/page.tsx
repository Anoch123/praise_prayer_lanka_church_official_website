import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import VideoLibrary from "@/components/VideoLibrary";
import { getAllVideos } from "@/lib/utils/youtube";
import FeaturedSermon from "@/components/FeaturedSermon";
import Footer from "@/components/footer";
import { Arrow, Cross, YouTubeIcon } from "@/components/icon-widgets/icons";
import { COMMON_TEXTS, YOUTUBE_CHANNEL_URL } from "@/lib/constants/helper_data";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Sermons & Messages",
  description: "Watch and be encouraged by every message from our services, any time.",
};

export default async function PPLCSermansPage() {
  const videos = await getAllVideos();
  const latest = videos[0];
  const rest = videos.slice(1); // latest is featured above, so it isn't repeated in the library

  return (
    <>
      <PageHero
        eyebrow="Watch"
        title="Sermons &"
        accent="Messages"
        description="Every message from our services, all in one place. Watch, be encouraged and share with someone who needs to hear it."
        breadcrumbs={[{ label: "SERMONS" }]}
        image={"/images/hero-bg-3000.jpg"}
        isSermonVideoLength
        sermonVideoLength={videos.length}
      />

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

      <Footer />
    </>
  );
}