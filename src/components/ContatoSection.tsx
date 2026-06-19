import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OBRIGADO_LINK = "/obrigado?origin=contato";

const questions = [
  {
    id: "area",
    question: "Qual é a principal área de atuação ou especialidade do seu escritório?",
    options: [
      "Direito Civil / Família / Sucessões",
      "Direito do Trabalho",
      "Direito do Consumidor",
      "Direito Tributário / Empresarial",
      "Direito Penal",
      "Direito Previdenciário",
      "Outra",
    ],
  },
  {
    id: "equipe",
    question: "Quantas pessoas atuam na entrega jurídica e no comercial hoje?",
    options: [
      "Apenas eu (Autônomo)",
      "2 a 3 pessoas",
      "4 a 9 pessoas",
      "10 ou mais pessoas",
    ],
  },
  {
    id: "clientes",
    question: "Em média, quantos novos contratos/clientes vocês fecham por mês?",
    options: [
      "Menos de 2 novos clientes",
      "2 a 5 novos clientes",
      "6 a 10 novos clientes",
      "Mais de 10 novos clientes",
    ],
  },
  {
    id: "ticket",
    question: "Qual é o valor médio dos seus honorários por contrato?",
    options: [
      "Até R$ 1.500,00",
      "R$ 1.500,00 a R$ 3.000,00",
      "R$ 3.000,00 a R$ 5.000,00",
      "Acima de R$ 5.000,00",
    ],
  },
  {
    id: "gargalo",
    question: "Qual é o maior gargalo que impede o seu escritório de escalar hoje?",
    options: [
      "Falta de tempo / Sobrecarga com tarefas manuais e burocráticas (petições, relatórios)",
      "Dificuldade de captação de clientes e concorrência por preço",
      "Desorganização operacional / Falta de processos claros para o time",
    ],
  },
];

const ContatoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0-4 = questions, 5 = contact info
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [iaTools, setIaTools] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = questions.length; // 5 questions, then contact
  const progress = (step / (totalSteps + 1)) * 100;

  const handleNext = () => {
    if (!selectedOption) return;
    setAnswers((prev) => ({ ...prev, [questions[step].id]: selectedOption }));
    setSelectedOption(null);
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Preencha nome e WhatsApp", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xgoorodw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          phone,
          instagram: instagram || "—",
          ia_tools: iaTools || "—",
          "Área de Atuação": answers.area,
          "Tamanho da Equipe": answers.equipe,
          "Contratos por Mês": answers.clientes,
          "Ticket Médio": answers.ticket,
          "Maior Gargalo": answers.gargalo,
        }),
      });
      if (response.ok) {
        navigate(OBRIGADO_LINK);
      } else {
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente ou entre em contato pelo WhatsApp.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro de conexão",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative py-24 sm:py-32 overflow-hidden bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="section-tag">Próximo Passo</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-foreground leading-tight">
            Se o seu negócio merece ser{" "}
            <span className="gradient-gold-text italic">levado a sério</span>,{" "}
            a conversa começa agora.
          </h2>
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Faça um pré-diagnóstico rápido para direcionar o seu atendimento de escala.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Multi-step qualification form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18 }}
          >
            <div className="glass-card p-6 sm:p-8">
              {/* Progress indicator */}
              <div className="mb-7">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-xs text-muted-foreground">
                    {step < questions.length
                      ? `Pergunta ${step + 1} de ${questions.length}`
                      : "Quase lá — último passo"}
                  </span>
                  <span className="font-body text-xs text-primary font-semibold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                {/* Step dots */}
                <div className="flex items-center gap-2 mt-3">
                  {[...questions.map((_, i) => i), questions.length].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i < step
                          ? "bg-primary flex-1"
                          : i === step
                          ? "bg-primary/60 flex-1"
                          : "bg-muted flex-1"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* Questions */}
                {step < questions.length ? (
                  <motion.div
                    key={`question-${step}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.28 }}
                  >
                    <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-5">
                      {questions[step].question}
                    </h3>

                    <div className="space-y-3 mb-7">
                      {questions[step].options.map((option) => {
                        const isSelected = selectedOption === option;
                        return (
                          <button
                            key={option}
                            onClick={() => setSelectedOption(option)}
                            className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all duration-200 font-body text-sm ${
                              isSelected
                                ? "border-primary bg-primary/8 text-foreground"
                                : "border-border bg-background hover:border-primary/30 hover:bg-accent/30 text-muted-foreground"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground/40"
                                }`}
                              >
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                                )}
                              </span>
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={!selectedOption}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-body shadow-sm shadow-primary/20 transition-all disabled:opacity-40"
                    >
                      Próxima <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                ) : (
                  /* Contact info step */
                  <motion.div
                    key="contact-step"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.28 }}
                  >
                    <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-1">
                      Ótimo! Como posso te encontrar?
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-6">
                      Vou entrar em contato via WhatsApp para confirmar sua sessão estratégica.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="qual-name" className="font-body text-sm text-foreground font-medium">
                          Nome *
                        </Label>
                        <Input
                          id="qual-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome"
                          className="font-body bg-background border-border focus:border-primary h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="qual-phone" className="font-body text-sm text-foreground font-medium">
                          WhatsApp *
                        </Label>
                        <Input
                          id="qual-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="font-body bg-background border-border focus:border-primary h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="qual-instagram" className="font-body text-sm text-foreground font-medium">
                          Instagram Profissional ou Site
                        </Label>
                        <Input
                          id="qual-instagram"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="@seuconsultorio ou link"
                          className="font-body bg-background border-border focus:border-primary h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="qual-iatools" className="font-body text-sm text-foreground font-medium">
                          Já usa alguma IA ou ferramenta? (opcional)
                        </Label>
                        <Textarea
                          id="qual-iatools"
                          value={iaTools}
                          onChange={(e) => setIaTools(e.target.value)}
                          placeholder="Ex: ChatGPT, Claude, Astrea, etc..."
                          rows={2}
                          className="font-body bg-background border-border focus:border-primary resize-none"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !name.trim() || !phone.trim()}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-body py-5 shadow-sm shadow-primary/20 transition-all disabled:opacity-40"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="mr-2 w-4 h-4" />
                          Agendar Sessão Estratégica
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="flex flex-col gap-4 justify-center"
          >
            <div className="glass-card p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold mb-5 text-foreground">
                Outras formas de contato
              </h3>
              <div className="space-y-4">
                <a href="mailto:leocauchioli@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground">Email</p>
                    <p className="font-body text-sm text-foreground group-hover:text-primary transition-colors font-medium">
                      leocauchioli@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/5515996918236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground">WhatsApp</p>
                    <p className="font-body text-sm text-foreground group-hover:text-green-600 transition-colors font-medium">
                      (15) 99691-8236
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Baseado em{" "}
                  <span className="text-foreground font-medium">Itapetininga/SP</span>, mas atendendo
                  clientes em qualquer lugar do Brasil e do mundo. Seu projeto pode ser 100% remoto.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContatoSection;
