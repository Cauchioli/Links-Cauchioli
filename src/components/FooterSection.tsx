import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Instagram, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoVertice from "@/assets/logo-vertice.png";

const WHATSAPP_LINK =
  "https://wa.me/5515996918236?text=Ol%C3%A1%2C%20vim%20pelo%20site%2C%20quero%20saber%20mais%20sobre%20a%20V%C3%A9rtice.";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer className="relative overflow-hidden bg-foreground text-background" ref={ref}>
      {/* Subtle top border accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-28">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 leading-tight text-background">
            Seu negócio está pronto para o{" "}
            <span className="text-primary italic">próximo nível</span>?
          </h2>
          <p className="font-body text-base sm:text-lg text-background/60 max-w-md mx-auto mb-10">
            Vamos conversar sobre como posicionar, automatizar e escalar o seu negócio com inteligência.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="group w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-body text-base px-7 py-5 sm:py-6 rounded-full transition-all duration-300 shadow-lg shadow-green-600/20"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp Direto
                <ArrowUpRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group w-full sm:w-auto border-background/20 hover:border-primary/50 hover:bg-primary/10 text-background font-body text-base px-7 py-5 sm:py-6 rounded-full transition-all duration-300"
            >
              <a href="https://instagram.com/vertice" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 w-5 h-5" />
                Instagram
                <ArrowUpRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="pt-8 border-t border-background/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <img
              src={logoVertice}
              alt="Vértice"
              className="h-8 w-auto object-contain opacity-70"
            />
            <p className="font-body text-sm text-background/40 text-center">
              © {new Date().getFullYear()} Vértice. Todos os direitos reservados.
            </p>
            <p className="font-body text-sm text-background/40">
              Itapetininga, SP – Brasil
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;