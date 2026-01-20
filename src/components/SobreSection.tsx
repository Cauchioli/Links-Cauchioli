import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Users, Code2, Camera } from "lucide-react";

const SobreSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-widest text-primary mb-6">
              <MapPin className="w-4 h-4" />
              Sobre & Localização
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8 leading-tight">
              Estratégia Global,{" "}
              <span className="gradient-gold-text">Atendimento Local</span>
            </h2>

            <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                Sediado em <span className="text-foreground font-medium">Itapetininga/SP</span>, 
                atendendo presencialmente toda a região e digitalmente o mundo.
              </p>
              <p>
                Gosto de olhar no olho do cliente para entender o negócio antes de abrir 
                a câmera ou escrever uma linha de código.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { icon: Users, value: "50+", label: "Clientes" },
                { icon: Code2, value: "30+", label: "Sites" },
                { icon: Camera, value: "500+", label: "Fotos" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="font-display text-2xl md:text-3xl font-semibold">
                    {stat.value}
                  </div>
                  <div className="font-body text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="glass-card p-3 glow-gold">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Escritório criativo"
                  className="w-full rounded-lg"
                />
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-8 -left-8 glass-card p-6 max-w-xs"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-body text-sm text-foreground">Disponível para projetos</span>
                </div>
                <p className="font-body text-xs text-muted-foreground">
                  Resposta em até 24h
                </p>
              </motion.div>

              {/* Background Decoration */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border border-primary/20 rounded-xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-secondary/20 rounded-xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;