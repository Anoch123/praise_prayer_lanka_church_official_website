import { VIDEOS } from "@/lib/constants/home";
import { cacheLife } from "next/cache";

export type Video = { id: string; title: string; date: string };

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

async function fromApi(max: number): Promise<Video[] | null> {
  if (!API_KEY || !CHANNEL_ID?.startsWith("UC")) return null;

  // A channel's uploads playlist id is its channel id with "UC" swapped for "UU".
  const playlistId = "UU" + CHANNEL_ID.slice(2);
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

async function fromRss(): Promise<Video[] | null> {
  if (!CHANNEL_ID) return null;
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
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
  "use cache";
  cacheLife("hours");

  const videos = (await fromApi(limit)) ?? (await fromRss()) ?? (VIDEOS as Video[]);
  return videos.slice(0, limit);
}

export const getLatestVideos = (count = 5) => getVideos(count);
export const getAllVideos = () => getVideos(500);
