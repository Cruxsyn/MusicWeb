import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import MusicSection from "@/components/sections/MusicSection";
import VideosSection from "@/components/sections/VideosSection";
import MerchSection from "@/components/sections/MerchSection";
import SignUpSection from "@/components/sections/SignUpSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MerchSection />
        <MusicSection />
        <VideosSection />
        <SignUpSection />
      </main>
      <Footer />
    </>
  );
}
