import { getLatestVideos } from "@/lib/utils/youtube";
import VideosShowcase from "./VideosShowcase";

// Server component: pulls the 5 most recent videos from YouTube (cached for an hour)
export default async function VideosSection() {
  const videos = await getLatestVideos(5);
  return <VideosShowcase videos={videos} />;
}
