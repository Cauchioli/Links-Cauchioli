import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConceitoSection from "@/components/ConceitoSection";
import DiferencialSection from "@/components/DiferencialSection";
import PortfolioSection from "@/components/PortfolioSection";
// import FotografiaSection from "@/components/FotografiaSection"; // Temporariamente removido
import SobreSection from "@/components/SobreSection";
import ContatoSection from "@/components/ContatoSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <ConceitoSection />
      <DiferencialSection />
      <PortfolioSection />
      {/* Seção de Fotografia temporariamente removida */}
      <SobreSection />
      <ContatoSection />
      <FooterSection />
    </main>
  );
};

export default Index;