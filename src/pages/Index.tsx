import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConceitoSection from "@/components/ConceitoSection";
import DiferencialSection from "@/components/DiferencialSection";
import MetodologiaSection from "@/components/MetodologiaSection";
import PortfolioSection from "@/components/PortfolioSection";
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
      <MetodologiaSection />
      <PortfolioSection />
      <SobreSection />
      <ContatoSection />
      <FooterSection />
    </main>
  );
};

export default Index;