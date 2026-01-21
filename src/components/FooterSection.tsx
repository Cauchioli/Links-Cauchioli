import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Instagram, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-background to-background" />
      
      {/* Gradient Orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">
            Seu negócio está pronto para o{" "}
            <span className="gradient-gold-text">próximo nível</span>?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-12">
            Vamos conversar sobre como alinhar sua imagem e presença digital.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group bg-green-600 hover:bg-green-700 text-white font-body text-base px-8 py-6 rounded-full transition-all duration-300"
            >
              <a 
                href="https://wa.me/5515996918236?text=Ol%C3%A1%2C%20vim%20pelo%20site%2C%20quero%20saber%20mais%20sobre%20a%20V%C3%A9rtice." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp Direto
                <ArrowUpRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-primary/50 hover:border-primary hover:bg-primary/10 text-foreground font-body text-base px-8 py-6 rounded-full transition-all duration-300"
            >
              <a 
                href="https://instagram.com/vertice" 
                target="_blank" 
                rel="noopener noreferrer"
              >
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
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-12 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-display text-xl font-bold text-background">V</span>
              </div>
              <span className="font-display text-xl font-semibold">Vértice</span>
            </div>

            {/* Copyright */}
            <p className="font-body text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Vértice. Todos os direitos reservados.
            </p>

            {/* Location */}
            <p className="font-body text-sm text-muted-foreground">
              Itapetininga, SP – Brasil
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;