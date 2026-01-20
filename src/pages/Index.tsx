import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DiferencialSection from "@/components/DiferencialSection";
import PortfolioSection from "@/components/PortfolioSection";
// import FotografiaSection from "@/components/FotografiaSection"; // Temporariamente removido
import SobreSection from "@/components/SobreSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <DiferencialSection />
      <PortfolioSection />
      {/* Seção de Fotografia temporariamente removida */}
      <SobreSection />
      <FooterSection />
    </main>
  );
};

export default Index;