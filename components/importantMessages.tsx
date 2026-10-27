
import { getFeaturedVideo } from "@/lib/utils/youtube";
import ImportantMessageFeature from "./ImportantMessagesFeature";

// Server component: shows the ONE video the church marks as important
// (set YOUTUBE_FEATURED_VIDEO_ID in .env.local). Renders nothing if none is set.
export default async function ImportantMessage() {
  const video = await getFeaturedVideo();
  if (!video) return null;
  return <ImportantMessageFeature video={video} />;
}