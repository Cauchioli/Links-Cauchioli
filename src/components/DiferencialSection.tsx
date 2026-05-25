import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Crosshair, Bot, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Crosshair,
    num: "01",
    title: "Posicionamento & DNA Profundo",
    description:
      "Mapeamos o perfil do seu cliente ideal (ICP), suas dores latentes e dores evitadas. Criamos o DNA completo da sua marca com segmento, diferenciais e uma biblioteca de objeções de mercado mapeadas com respostas estratégicas prontas para vendas.",
    tags: ["DNA Profundo", "Dores Latentes", "Banco de Objeções", "Respostas de Vendas"],
    accent: "gold" as const,
  },
  {
    icon: Bot,
    num: "02",
    title: "Inteligência Artificial Operacional",
    description:
      "Chega de usar IA para textos genéricos. Desenvolvemos fluxos usando NotebookLM para análise e resumo seguro de processos extensos de 500+ páginas com referências exatas, gravamos e transcrevemos suas reuniões de forma automática e criamos Claude Skills de produtividade.",
    tags: ["NotebookLM & Claude", "Transcrição de Reuniões", "Processos 500+ Páginas", "Automação de Rotina"],
    accent: "navy" as const,
  },
  {
    icon: TrendingUp,
    num: "03",
    title: "Biografia de Autoridade & Presença Premium",
    description:
      "Num mercado saturado de 1 advogado para 142 pessoas, seu maior diferencial é ser você mesmo. Integramos sua história e princípios em uma Biografia de Autoridade para atrair clientes alinhados, e entregamos seu site premium de alta conversão com direção de imagem.",
    tags: ["Biografia de Autoridade", "Marca Pessoal & Valores", "Web Design Premium", "Direção de Imagem"],
    accent: "gold" as const,
  },
];

const DiferencialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pilares" className="relative py-24 sm:py-32 overflow-hidden bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto"
        >
          <span className="section-tag">Como Atuamos</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 leading-tight text-foreground">
            Os 3 Pilares da{" "}
            <span className="gradient-gold-text italic">Solução Vértice</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted-foreground">
            Cada pilar é uma camada do sistema. Juntos, criam um negócio que opera com
            previsibilidade, inteligência e autoridade de mercado.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="space-y-5 max-w-4xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
              className="glass-card-hover group relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] ${
                pillar.accent === "gold" ? "bg-primary" : "bg-secondary"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="p-6 sm:p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-8 items-start">
                  {/* Icon + number */}
                  <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shrink-0 ${
                      pillar.accent === "gold"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}>
                      <pillar.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className={`font-body text-xs uppercase tracking-[0.18em] font-medium ${
                      pillar.accent === "gold" ? "text-primary/50" : "text-secondary/50"
                    }`}>
                      Pilar {pillar.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold mb-3 text-foreground">{pillar.title}</h3>
                    <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-xs font-body rounded-full border ${
                            pillar.accent === "gold"
                              ? "text-primary bg-primary/8 border-primary/20"
                              : "text-secondary bg-secondary/8 border-secondary/20"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiferencialSection;