import Header from "@/components/Header";
import VideosSection from "@/components/VideosSection";
import NoticesSection from "@/components/NoticesSection";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <VideosSection />
      <NoticesSection />
      <Footer />
    </main>
  );
}