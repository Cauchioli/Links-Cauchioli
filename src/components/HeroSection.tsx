import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, Layers, MessageCircle, FileText, User, CheckCircle2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK =
  "https://wa.me/5515996918236?text=Ol%C3%A1%2C%20vim%20pelo%20site%2C%20quero%20agendar%20uma%20sess%C3%A3o%20estrat%C3%A9gica.";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<"dna" | "bio" | "ia">("dna");

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Subtle warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-background pointer-events-none" />

      {/* Very subtle grid */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-hero" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0L0 0 0 60" fill="none" stroke="hsl(38 72% 40%)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-hero)" />
        </svg>
      </div>

      {/* Gold orb accent — top right */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/4 rounded-full blur-3xl pointer-events-none" />

      {/* ── Layout ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 xl:gap-16 items-center max-w-7xl mx-auto">

          {/* ── LEFT: Copy ── */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-primary/50" />
              <span className="font-body text-xs uppercase tracking-[0.22em] text-primary font-medium">
                Posicionamento de Elite · IA no Dia a Dia
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.8rem] font-semibold leading-[1.12] mb-6 text-foreground"
            >
              Transformando o{" "}
              <span className="gradient-gold-text italic">caos operacional</span>{" "}
              de marcas de serviço em{" "}
              <span className="gradient-cyber-text">posicionamento de elite</span>.
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="origin-left h-px bg-border mb-6 max-w-sm"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.44 }}
              className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-[540px]"
            >
              Desenhamos o seu DNA Profundo, estruturamos sua Biografia de Autoridade e implementamos IA 
              (NotebookLM & Claude) na sua rotina para você se diferenciar de concorrentes genéricos e escalar sem trabalhar o dobro.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                asChild
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-white font-body text-sm sm:text-base px-7 py-5 sm:py-6 rounded-full shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Agendar Sessão Estratégica
                </a>
              </Button>
              <Button
                onClick={scrollToPortfolio}
                variant="outline"
                size="lg"
                className="group font-body text-sm sm:text-base px-7 py-5 sm:py-6 rounded-full border-border hover:border-primary/40 hover:bg-accent/50 transition-all duration-300"
              >
                Ver Entregáveis
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* ── RIGHT: Interactive Workspace Panel (macOS Style) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-full lg:max-w-xl mx-auto border border-border shadow-xl rounded-xl bg-card overflow-hidden flex flex-col self-center"
          >
            {/* Header window controls */}
            <div className="bg-muted/70 px-4 py-3 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/80 block" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80 block" />
                <span className="w-3 h-3 rounded-full bg-green-400/80 block" />
              </div>
              <div className="font-body text-xs text-muted-foreground font-medium select-none truncate px-4">
                workspace_vertice_copia_final.pdf
              </div>
              <div className="w-12" /> {/* spacer */}
            </div>

            {/* Interactive Tabs Menu */}
            <div className="grid grid-cols-3 bg-muted/30 border-b border-border">
              {[
                { id: "dna", icon: Layers, label: "🧬 DNA Profundo" },
                { id: "bio", icon: User, label: "👤 Autoridade" },
                { id: "ia", icon: Brain, label: "🤖 IA Operacional" },
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-center gap-1.5 py-3.5 px-2 text-xs font-body font-medium transition-all select-none border-r border-border last:border-r-0 ${
                      isSelected
                        ? "bg-card text-primary border-t-2 border-t-primary"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    }`}
                  >
                    <tab.icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="truncate">{tab.label.split(" ")[1]}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab content viewer */}
            <div className="p-5 sm:p-6 min-h-[300px] flex flex-col justify-between bg-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1"
                >
                  {/* DNA TAB */}
                  {activeTab === "dna" && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-display text-base font-semibold text-foreground mb-1">
                          🧬 DNA Profundo & Perfil de Cliente
                        </h4>
                        <p className="font-body text-xs text-muted-foreground">
                          Mapeamento completo do ICP estratégico vs. a comunicação atual.
                        </p>
                      </div>

                      {/* Mindset contrast grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="p-3 rounded-lg bg-red-500/[0.03] border border-red-500/10">
                          <p className="text-[10px] font-body uppercase text-red-600/70 tracking-wider font-semibold mb-1">
                            Como o profissional fala (Erro):
                          </p>
                          <p className="font-body text-[11px] text-muted-foreground leading-relaxed italic">
                            "Ofereço planejamento previdenciário minucioso sob a égide da EC 103/2019."
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/[0.03] border border-green-500/10">
                          <p className="text-[10px] font-body uppercase text-green-600/70 tracking-wider font-semibold mb-1">
                            Como o cliente ideal pensa:
                          </p>
                          <p className="font-body text-[11px] text-foreground font-medium leading-relaxed italic">
                            "Quero saber se posso me aposentar este ano para cuidar da minha saúde e dos netos."
                          </p>
                        </div>
                      </div>

                      {/* Bullet features */}
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        {[
                          "Dores latentes e evitadas",
                          "Diferenciais e Segmento",
                          "Dicionário de Objeções",
                          "Respostas Estratégicas",
                        ].map((feat) => (
                          <div key={feat} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="font-body text-xs text-muted-foreground truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AUTHORITIES BIO TAB */}
                  {activeTab === "bio" && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-display text-base font-semibold text-foreground mb-1">
                          👤 Biografia de Autoridade & Ativos
                        </h4>
                        <p className="font-body text-xs text-muted-foreground">
                          Unificação de marca pessoal e profissional em mercados saturados.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-muted/50 border border-border">
                        <p className="font-body text-xs text-foreground/80 leading-relaxed italic">
                          "Em um mercado de 1 advogado para 142 pessoas, as pessoas compram quem você é. Sua biografia integrada afasta dores de cabeça e atrai quem respeita seus princípios."
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="font-body text-[11px] uppercase tracking-wider text-primary font-semibold">
                          Pacote Comercial Incluso:
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                          <span className="font-body text-muted-foreground flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-primary shrink-0" /> Deck Comercial
                          </span>
                          <span className="font-body text-muted-foreground flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-primary shrink-0" /> Estudo de 5 E-mails
                          </span>
                          <span className="font-body text-muted-foreground flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-primary shrink-0" /> Pitch de Vendas
                          </span>
                          <span className="font-body text-muted-foreground flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-primary shrink-0" /> FAQ de Conteúdo
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OPERATIONAL AI TAB */}
                  {activeTab === "ia" && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-display text-base font-semibold text-foreground mb-1">
                          🤖 IA no Dia a Dia (Operação de Elite)
                        </h4>
                        <p className="font-body text-xs text-muted-foreground">
                          Substitua tarefas manuais repetitivas por inteligência integrada.
                        </p>
                      </div>

                      {/* Mock NotebookLM workspace */}
                      <div className="rounded-lg border border-border bg-slate-900 text-slate-100 overflow-hidden font-mono text-[10px] leading-tight">
                        <div className="bg-slate-800 px-3 py-1.5 flex items-center justify-between border-b border-slate-700">
                          <span className="text-slate-300 font-semibold flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-primary" /> NotebookLM Workspace
                          </span>
                          <span className="text-emerald-400 text-[9px] bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            Seguro / Sem Alucinações
                          </span>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="text-slate-400">
                            📂 Fontes: <span className="text-primary">processo_autos_512p.pdf</span>
                          </div>
                          <div>
                            <span className="text-amber-400">&gt; Prompt:</span> Analisar contradições na petição.
                          </div>
                          <div className="text-emerald-400">
                            &gt; Resposta: Encontrada discrepância na pág. 112 com a pág. 240 quanto ao depoimento.
                          </div>
                        </div>
                      </div>

                      {/* Bullet features */}
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        {[
                          "Transcrição de Reuniões",
                          "Resumos e Atas Úteis",
                          "Claude Skills Customizadas",
                          "Projetos de IA Centralizados",
                        ].map((feat) => (
                          <div key={feat} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="font-body text-xs text-muted-foreground truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom tag indicator */}
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                <span className="font-body text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Método Vértice:</span> DNA estratégico unificado a ferramentas inteligentes.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;