import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Globe, Zap, Target } from "lucide-react";

const DiferencialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Camera,
      title: "Fotografia Estratégica",
      description: "Retratos que comunicam autoridade antes de você dizer uma palavra.",
      accent: "gold" as const,
    },
    {
      icon: Globe,
      title: "Web Design de Alta Performance",
      description: "Sites que carregam rápido, convertem visitantes e transmitem profissionalismo.",
      accent: "cyber" as const,
    },
    {
      icon: Zap,
      title: "Velocidade & Otimização",
      description: "Código limpo, SEO técnico e performance que o Google valoriza.",
      accent: "cyber" as const,
    },
    {
      icon: Target,
      title: "Posicionamento Integrado",
      description: "Sua imagem e seu site alinhados para a mesma narrativa de autoridade.",
      accent: "gold" as const,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block font-body text-sm uppercase tracking-widest text-primary mb-4">
            O Diferencial
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-8 max-w-4xl mx-auto leading-tight">
            A maioria dos fotógrafos não faz sites.{" "}
            <span className="text-muted-foreground">A maioria dos web designers não entende de imagem pessoal.</span>
          </h2>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="glass-card p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-l-xl" />
            <p className="font-body text-xl md:text-2xl text-foreground/90 leading-relaxed">
              Seu site é rápido, mas sua foto é ruim?{" "}
              <span className="text-primary font-medium">Você não vende.</span>{" "}
              Sua foto é incrível, mas seu site não carrega?{" "}
              <span className="text-secondary font-medium">Você não vende.</span>{" "}
              Na Vértice, alinhamos as duas pontas da sua autoridade.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="glass-card-hover p-8 group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
                feature.accent === "gold" 
                  ? "bg-primary/20 text-primary" 
                  : "bg-secondary/20 text-secondary"
              }`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiferencialSection;