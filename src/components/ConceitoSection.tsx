import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertCircle, UserX, Bot, BarChart3 } from "lucide-react";

const problems = [
  {
    icon: UserX,
    num: "01",
    title: "Atraindo o público errado (ICP Vago)",
    desc: "Sua comunicação atrai curiosos que brigam por preço. Você passa horas no direct ou WhatsApp explicando o que faz para no final ouvir um 'tá caro'.",
    accent: "gold" as const,
  },
  {
    icon: AlertCircle,
    num: "02",
    title: "Afogado em trabalho manual",
    desc: "Você gasta madrugadas formatando relatórios, resumindo autos processuais longos ou montando propostas repetitivas. A operação drena sua energia criativa.",
    accent: "navy" as const,
  },
  {
    icon: Bot,
    num: "03",
    title: "IA como mero brinquedo (ChatGPT)",
    desc: "O uso de IA se resume a pedir ideias de posts genéricos que ninguém lê. Ferramentas poderosas como NotebookLM e fluxos estruturados ficam intocados na mesa.",
    accent: "gold" as const,
  },
  {
    icon: BarChart3,
    num: "04",
    title: "Vendas sem estrutura ou previsibilidade",
    desc: "Sem scripts comerciais, pitches de vendas validados ou apresentações de serviços estruturadas. O crescimento vira refém exclusivo de indicação e sorte.",
    accent: "navy" as const,
  },
];

const ConceitoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="diagnostico" className="relative py-24 sm:py-32 overflow-hidden bg-muted/40" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14 sm:mb-20"
        >
          <span className="section-tag">O Diagnóstico</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 leading-tight text-foreground">
            O seu negócio está{" "}
            <span className="gradient-gold-text italic">limitando o seu tempo?</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed">
            Profissionais de elite travam o crescimento porque operam no modo manual. Comunicação sem ICP 
            atrai o cliente errado, processos operacionais repetitivos esgotam a energia, e a falta de 
            automação e processos estruturados impede a escala.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-12">
          {problems.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.1 }}
              className="glass-card-hover p-6 sm:p-8 group relative overflow-hidden"
            >
              {/* Background number */}
              <div className="absolute top-3 right-5 text-7xl sm:text-8xl font-black text-foreground/[0.03] pointer-events-none select-none transition-colors">
                {item.num}
              </div>

              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 ${
                item.accent === "gold"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary"
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold mb-2.5 text-foreground">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <div className="glass-card p-6 sm:p-10 border-l-[3px] border-l-primary max-w-3xl">
            <p className="font-display text-lg sm:text-2xl text-foreground leading-relaxed">
              Crescer não deve significar trabalhar o dobro.{" "}
              <span className="gradient-gold-text italic font-semibold">
                Significa trabalhar com mais inteligência.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConceitoSection;
