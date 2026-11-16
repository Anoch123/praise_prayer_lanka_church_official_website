import Header from "@/components/Header";
import VideosSection from "@/components/VideosSection";
import NoticesSection from "@/components/NoticesSection";
import Footer from "@/components/footer";
import ImportantMessages from "@/components/importantMessages";
import RedVersesSection from "@/components/design-widgets/red-verses-section";

export default function Home() {
  return (
    <main>
      <Header />
      <ImportantMessages />
      <VideosSection />
      <RedVersesSection />
      <NoticesSection />
      <Footer />
    </main>
  );
}