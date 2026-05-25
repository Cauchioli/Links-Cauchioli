import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Monitor, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import gramaPrimeImage from "@/assets/grama-prime-screenshot.png";

const featuredProject = {
  title: "Mello Wiltemburg Advocacia",
  description:
    "Toda a estratégia voltada ao público desejado: definição de ICP, fotos institucionais, copy previdenciária e construção de autoridade digital para advogado especialista em INSS e Direito Previdenciário.",
  url: "https://www.mellowiltemburgadv.com.br/",
  tags: ["Advocacia Previdenciária", "Estratégia Digital", "Posicionamento", "Copy Jurídica"],
  results: ["Público altamente segmentado", "Autoridade imediata no nicho", "Copy que filtra e converte"],
};

const otherProjects = [
  {
    title: "Grama Prime",
    description:
      "Design visual focado na percepção de qualidade do produto. Navegação fluida e catálogo imersivo.",
    url: "https://www.gramaprime.com.br/",
    image: gramaPrimeImage,
    tags: ["E-commerce", "Catálogo", "UI/UX"],
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 overflow-hidden bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="section-tag">Portfólio</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-foreground">
            Projetos que Funcionam
          </h2>
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Estratégia aplicada, resultados reais.
          </p>
        </motion.div>

        {/* Featured — Mello Wiltemburg */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="max-w-5xl mx-auto mb-6"
        >
          <div className="glass-card-hover overflow-hidden group">
            {/* Featured badge */}
            <div className="flex items-center gap-2 px-5 sm:px-8 pt-5 sm:pt-8 pb-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <Star className="w-3 h-3 text-primary fill-primary" />
                <span className="text-xs font-body text-primary font-medium uppercase tracking-wider">Case Destaque</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Info */}
              <div className="p-5 sm:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                  {featuredProject.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-body text-primary bg-primary/8 rounded-full border border-primary/15">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-3 text-foreground">
                  {featuredProject.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                <div className="space-y-2.5 mb-7">
                  {featuredProject.results.map((result) => (
                    <div key={result} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="font-body text-sm text-foreground/75">{result}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="self-start bg-primary hover:bg-primary/90 text-white font-body shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all"
                >
                  <a href={featuredProject.url} target="_blank" rel="noopener noreferrer">
                    Visitar Site
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>

              {/* Browser Mockup */}
              <div className="p-3 sm:p-4 border-t lg:border-t-0 lg:border-l border-border bg-muted/20">
                <div className="rounded-xl overflow-hidden border border-border">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-muted/60 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-1.5 px-3 py-0.5 bg-white rounded-full text-xs text-muted-foreground font-body border border-border">
                        <Monitor className="w-2.5 h-2.5" />
                        mellowiltemburgadv.com.br
                      </div>
                    </div>
                  </div>
                  {/* Preview */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#F0EBE8] via-[#EAE3DF] to-[#DDD5CE] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="text-[#1F1F1F] font-serif text-2xl sm:text-3xl font-light mb-2 opacity-80">
                        Mello Wiltemburg
                      </div>
                      <div className="text-[#FFC857] italic font-serif text-base mb-5 opacity-70">Advocacia</div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-px bg-[#FFC857]/60" />
                        <div className="w-1.5 h-1.5 bg-[#FFC857]/80 rotate-45" />
                        <div className="w-10 h-px bg-[#FFC857]/60" />
                      </div>
                      <div className="text-[#1F1F1F]/50 font-sans text-[10px] tracking-widest uppercase">
                        Direito Previdenciário · INSS
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/8 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects */}
        {otherProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.35 + index * 0.15 }}
            className="max-w-5xl mx-auto"
          >
            <div className="glass-card-hover p-3 sm:p-4 group">
              <div className="relative rounded-xl overflow-hidden bg-muted/30 border border-border">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-muted/60 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-center gap-1.5 px-3 py-0.5 bg-white rounded-full text-xs text-muted-foreground font-body border border-border">
                      <Monitor className="w-2.5 h-2.5" />
                      {project.url.replace("https://www.", "")}
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-5 px-1">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold mb-1.5 text-foreground">{project.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-3 max-w-xl">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-body text-secondary bg-secondary/8 rounded-full border border-secondary/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="self-start sm:self-auto shrink-0 border-border hover:border-secondary/40 hover:bg-secondary/5 text-foreground font-body"
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    Visitar Site
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;