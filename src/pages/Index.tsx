import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DiferencialSection from "@/components/DiferencialSection";
import PortfolioSection from "@/components/PortfolioSection";
import FotografiaSection from "@/components/FotografiaSection";
import SobreSection from "@/components/SobreSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <DiferencialSection />
      <PortfolioSection />
      <FotografiaSection />
      <SobreSection />
      <FooterSection />
    </main>
  );
};

export default Index;