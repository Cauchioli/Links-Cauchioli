import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Compass, Settings2, Rocket } from "lucide-react";

const steps = [
  {
    id: "01",
    icon: Search,
    title: "Diagnóstico & Imersão",
    desc: "Mapeamos os gargalos operacionais que drenam o seu tempo e a sua forma atual de atração. Entendemos a fundo a cabeça do seu cliente ideal e os seus diferenciais reais.",
    accent: "gold" as const,
  },
  {
    id: "02",
    icon: Compass,
    title: "Desenho do DNA",
    desc: "Estruturamos os seus dois pilares de posicionamento: o DNA Profundo (segmento, dores latentes, banco de objeções e respostas) e a sua Biografia de Autoridade unificada.",
    accent: "navy" as const,
  },
  {
    id: "03",
    icon: Settings2,
    title: "Configuração & IA",
    desc: "Montamos os ativos comerciais (deck, pitch de vendas, proposta premium, FAQ de conteúdo) e configuramos a IA para reuniões operacionais e leitura de autos no NotebookLM.",
    accent: "gold" as const,
  },
  {
    id: "04",
    icon: Rocket,
    title: "Presença Premium",
    desc: "Entregamos o seu site institucional premium de alta conversão estruturado com a nova marca, fornecemos direção de imagem/fotos e treinamos você para operar o sistema.",
    accent: "navy" as const,
  },
];

const MetodologiaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="metodologia" className="relative py-24 sm:py-32 overflow-hidden bg-muted/40" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto"
        >
          <span className="section-tag">A Metodologia</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 leading-tight text-foreground">
            Método Vértice 4D:{" "}
            <span className="gradient-cyber-text italic">resultado previsível.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted-foreground">
            Profissionais de alto nível valorizam métodos claros. Aqui está exatamente como trabalhamos.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.1 }}
              className="glass-card-hover p-6 sm:p-7 group relative overflow-hidden"
            >
              {/* Step number watermark */}
              <div className="absolute -bottom-3 -right-1 text-[6rem] font-black text-foreground/[0.03] pointer-events-none select-none leading-none">
                {step.id}
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-5">
                <div className={`h-px flex-1 ${
                  step.accent === "gold" ? "bg-primary/25" : "bg-secondary/25"
                }`} />
                <span className={`text-[10px] font-body uppercase tracking-[0.18em] font-medium ${
                  step.accent === "gold" ? "text-primary/60" : "text-secondary/60"
                }`}>
                  Etapa {step.id}
                </span>
              </div>

              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${
                step.accent === "gold"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary"
              }`}>
                <step.icon className="w-5 h-5" />
              </div>

              <h3 className="font-display text-base sm:text-lg font-semibold mb-2.5 leading-tight text-foreground">{step.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetodologiaSection;
