import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import gramaPrimeImage from "@/assets/grama-prime-screenshot.png";

const projects = [
  {
    title: "Grama Prime",
    description: "Design visual focado na percepção de qualidade do produto. Navegação fluida e catálogo imersivo.",
    url: "https://www.gramaprime.com.br/",
    image: gramaPrimeImage,
    tags: ["E-commerce", "Catálogo", "UI/UX"],
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block font-body text-sm uppercase tracking-widest text-secondary mb-4">
            Portfólio
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">
            Sites que Funcionam
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Projetos reais, resultados reais. Clique para ver ao vivo.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
            >
              <div className="glass-card-hover p-4 md:p-6 group">
                {/* Browser Mockup */}
                <div className="relative rounded-lg overflow-hidden bg-muted/30">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-primary/60" />
                      <div className="w-3 h-3 rounded-full bg-secondary/60" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-4 py-1 bg-background/50 rounded-full text-xs text-muted-foreground font-body">
                        <Monitor className="w-3 h-3" />
                        {project.url.replace("https://www.", "")}
                      </div>
                    </div>
                  </div>

                  {/* Website Preview */}
                  <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                        <span className="text-muted-foreground font-body text-sm">Screenshot em breve</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-6 px-2">
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="font-body text-muted-foreground mb-4 max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-body text-secondary bg-secondary/10 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="group/btn border-secondary/30 hover:border-secondary hover:bg-secondary/10 text-foreground font-body shrink-0"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visitar Site Ao Vivo
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;