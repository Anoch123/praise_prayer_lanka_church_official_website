
import { getFeaturedVideo } from "@/lib/utils/youtube";
import ImportantMessageFeature from "./ImportantMessagesFeature";

export default async function ImportantMessage() {
  const video = await getFeaturedVideo();
  if (!video) return null;
  return <ImportantMessageFeature video={video} />;
}