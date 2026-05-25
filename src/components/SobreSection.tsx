import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, TrendingUp, Layers, MapPin } from "lucide-react";

const SobreSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" className="relative py-24 sm:py-32 overflow-hidden bg-muted/40" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
          >
            <span className="section-tag">A Vértice</span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 leading-tight text-foreground">
              Estratégia por trás{" "}
              <span className="gradient-gold-text italic">da execução.</span>
            </h2>

            <div className="space-y-4 font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                Com experiência prática unindo o marketing estratégico de alta conversão à engenharia de processos com Inteligência Artificial, 
                ajudo marcas de serviço de elite a saírem do caos operacional.
              </p>
              <p>
                Nossa atuação mapeia o seu DNA Profundo de Marca, desenha sua Biografia de Autoridade para posicionamento de alto ticket, e implementa um ecossistema 
                de IA sob medida (utilizando ferramentas como NotebookLM e Claude) para você recuperar até 20 horas semanais de tempo livre.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-7">
              {["Posicionamento", "IA Operacional", "NotebookLM", "Bio de Autoridade", "Manual Comercial", "B2B"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-body text-muted-foreground border border-border rounded-full hover:border-primary/40 hover:text-primary transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>
                Sediado em <span className="text-foreground font-medium">Itapetininga/SP</span> · Atendimento remoto em todo o Brasil
              </span>
            </div>
          </motion.div>

          {/* Right — Expertise card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="relative"
          >
            <div className="glass-card p-6 sm:p-8 glow-gold">
              <p className="font-body text-xs uppercase tracking-[0.22em] text-primary font-medium mb-5">
                Áreas de domínio
              </p>

              <div className="space-y-4">
                {[
                  { icon: Layers, label: "Posicionamento & DNA Profundo", value: "ICP → Dores Latentes → Objeções", accent: "gold" },
                  { icon: Brain, label: "IA no Dia a Dia (Operacional)", value: "NotebookLM → Transcrições → Claude", accent: "navy" },
                  { icon: TrendingUp, label: "Biografia & Presença Digital", value: "Marca Pessoal → Site Premium → Fotos", accent: "gold" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.35 + i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/25 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      item.accent === "gold" ? "bg-primary/12 text-primary" : "bg-secondary/12 text-secondary"
                    }`}>
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground leading-tight">{item.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating availability badge */}
            <motion.div
              className="absolute -bottom-5 -left-4 sm:-left-6 glass-card px-4 py-3 flex items-center gap-2.5 shadow-md"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              <span className="font-body text-xs sm:text-sm text-foreground font-medium whitespace-nowrap">Disponível para projetos</span>
            </motion.div>

            {/* Decoration */}
            <div className="absolute -top-3 -right-3 w-20 h-20 border border-primary/15 rounded-xl -z-10" />
            <div className="absolute -bottom-3 -right-3 w-14 h-14 border border-secondary/15 rounded-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;