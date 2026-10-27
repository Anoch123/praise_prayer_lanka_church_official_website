import { VIDEOS } from "@/lib/constants/home";

export type Video = { id: string; title: string; date: string };

// .env.local
//   YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxx   (required for live data)
//   YOUTUBE_API_KEY=AIza...                        (optional: unlocks the FULL video list)
//
// With only the channel id we read the public RSS feed (latest ~15 videos, no key needed).
// With an API key we page through the channel's uploads playlist (all videos).
// If neither is set (or YouTube is unreachable) we fall back to VIDEOS in constants/home.
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const REVALIDATE = 60 * 60; // refresh from YouTube at most once an hour

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fromApi(max: number, playlist?: string): Promise<Video[] | null> {
  "use cache";
  if (!API_KEY) return null;
  if (!playlist && !CHANNEL_ID?.startsWith("UC")) return null;

  // A channel's uploads playlist id is its channel id with "UC" swapped for "UU".
  const playlistId = playlist ?? "UU" + CHANNEL_ID!.slice(2);
  const out: Video[] = [];
  let pageToken = "";

  try {
    while (out.length < max) {
      const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      url.searchParams.set("part", "snippet,contentDetails");
      url.searchParams.set("maxResults", String(Math.min(50, max)));
      url.searchParams.set("playlistId", playlistId);
      url.searchParams.set("key", API_KEY);
      if (pageToken) url.searchParams.set("pageToken", pageToken);

      const res = await fetch(url, { next: { revalidate: REVALIDATE } });
      if (!res.ok) return out.length ? out : null;
      const data = await res.json();

      for (const item of data.items ?? []) {
        const s = item.snippet;
        const id = item.contentDetails?.videoId ?? s?.resourceId?.videoId;
        if (!s || !id || s.title === "Private video" || s.title === "Deleted video") continue;
        out.push({
          id,
          title: s.title,
          date: formatDate(item.contentDetails?.videoPublishedAt ?? s.publishedAt),
        });
      }

      if (!data.nextPageToken) break;
      pageToken = data.nextPageToken;
    }
  } catch {
    return out.length ? out : null;
  }

  return out.slice(0, max);
}

async function fromRss(
  query = CHANNEL_ID ? `channel_id=${CHANNEL_ID}` : "",
): Promise<Video[] | null> {
  "use cache";
  if (!query) return null;
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?${query}`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return null;
    const xml = await res.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
    const videos = entries
      .map((e) => {
        const id = e.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
        const title = e.match(/<title>([\s\S]*?)<\/title>/)?.[1];
        const published = e.match(/<published>(.*?)<\/published>/)?.[1];
        return id && title ? { id, title: decode(title), date: formatDate(published) } : null;
      })
      .filter(Boolean) as Video[];
    return videos.length ? videos : null;
  } catch {
    return null;
  }
}

async function getVideos(limit: number): Promise<Video[]> {
  const videos = (await fromApi(limit)) ?? (await fromRss()) ?? (VIDEOS as Video[]);
  return videos.slice(0, limit);
}

export const getLatestVideos = (count = 5) => getVideos(count);
export const getAllVideos = () => getVideos(500);

// ───────── Important ("featured") message – ONE video ─────────
// .env.local – pick ONE of these:
//   YOUTUBE_FEATURED_VIDEO_ID=dQw4w9WgXcQ         (the video id from the YouTube link: watch?v=<id>)
//   YOUTUBE_FEATURED_PLAYLIST_ID=PLxxxxxxxx       (optional: uses the first video of a playlist)
const FEATURED_VIDEO_ID = process.env.YOUTUBE_FEATURED_VIDEO_ID?.trim();
const FEATURED_PLAYLIST_ID = process.env.YOUTUBE_FEATURED_PLAYLIST_ID?.trim();

// Title of a hand-picked video via YouTube's public oEmbed endpoint (no API key needed).
async function fromOEmbed(id: string): Promise<Video | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${id}`,
      )}&format=json`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.title ? { id, title: String(data.title), date: "" } : null;
  } catch {
    return null;
  }
}

export async function getFeaturedVideo(): Promise<Video | null> {
  "use cache";
  if (FEATURED_VIDEO_ID) return fromOEmbed(FEATURED_VIDEO_ID);
  if (FEATURED_PLAYLIST_ID) {
    const list =
      (await fromApi(1, FEATURED_PLAYLIST_ID)) ??
      (await fromRss(`playlist_id=${FEATURED_PLAYLIST_ID}`));
    return list?.[0] ?? null;
  }
  return null;
}