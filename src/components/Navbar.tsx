import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoVertice from "@/assets/logo-vertice.png";

const OBRIGADO_LINK = "/obrigado?origin=navbar";

const navLinks = [
  { label: "Início", href: "#" },
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Pilares", href: "#pilares" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const sectionId = href.replace("#", "");
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? "py-3 bg-white/90 backdrop-blur-md border-b border-border shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#")}
              className="flex items-center gap-3 group"
              aria-label="Vértice — Início"
            >
              <img
                src={logoVertice}
                alt="Vértice"
                className="h-9 w-auto object-contain group-hover:opacity-80 transition-opacity"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <Button
                asChild
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white font-body rounded-full px-5 py-2 text-sm shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all"
              >
                <Link to={OBRIGADO_LINK}>
                  Sessão Estratégica
                </Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white border-b border-border shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-5">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="font-body text-base text-muted-foreground hover:text-foreground hover:bg-muted transition-colors py-3 px-3 text-left rounded-lg"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-border mt-2">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white font-body rounded-full py-5"
                  >
                    <Link to={OBRIGADO_LINK}>
                      Sessão Estratégica
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;