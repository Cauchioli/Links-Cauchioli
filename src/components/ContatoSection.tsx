import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle, Loader2, Mail, MessageCircle } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(2000, "Mensagem muito longa"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const OBRIGADO_LINK = "/obrigado?origin=contato";

const ContatoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xgoorodw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Não informado",
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast({ title: "Erro ao enviar", description: "Tente novamente ou entre em contato pelo WhatsApp.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro de conexão", description: "Verifique sua conexão e tente novamente.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative py-24 sm:py-32 overflow-hidden bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
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
            Sessão estratégica gratuita de 15 minutos. Vamos mapear os gargalos do seu negócio
            e identificar onde IA, posicionamento e growth podem gerar mais resultado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18 }}
          >
            {isSubmitted ? (
              <div className="glass-card p-8 sm:p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-5" />
                </motion.div>
                <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">Mensagem Enviada!</h3>
                <p className="font-body text-muted-foreground mb-6">Obrigado pelo seu contato. Responderei em breve!</p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="font-body">
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="font-body text-sm text-foreground font-medium">Nome *</Label>
                  <Input
                    id="name" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Seu nome"
                    className={`font-body bg-background border-border focus:border-primary h-11 ${errors.name ? "border-destructive" : ""}`}
                  />
                  {errors.name && <p className="text-destructive text-xs font-body">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-body text-sm text-foreground font-medium">Email *</Label>
                  <Input
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                    placeholder="seu@email.com"
                    className={`font-body bg-background border-border focus:border-primary h-11 ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && <p className="text-destructive text-xs font-body">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="font-body text-sm text-foreground font-medium">Telefone <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                  <Input
                    id="phone" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="font-body bg-background border-border focus:border-primary h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="font-body text-sm text-foreground font-medium">Mensagem *</Label>
                  <Textarea
                    id="message" name="message" value={formData.message} onChange={handleChange}
                    placeholder="Conte um pouco sobre seu negócio e seus principais desafios..."
                    rows={4}
                    className={`font-body bg-background border-border focus:border-primary resize-none ${errors.message ? "border-destructive" : ""}`}
                  />
                  {errors.message && <p className="text-destructive text-xs font-body">{errors.message}</p>}
                </div>

                <Button
                  type="submit" disabled={isSubmitting}
                  className="w-full font-body bg-primary hover:bg-primary/90 text-white py-5 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" />Enviando...</>
                  ) : (
                    <><Send className="mr-2 w-4 h-4" />Enviar Mensagem</>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="flex flex-col gap-4 justify-center"
          >
            <div className="glass-card p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold mb-5 text-foreground">Outras formas de contato</h3>
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

                <Link to={OBRIGADO_LINK} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground">WhatsApp</p>
                    <p className="font-body text-sm text-foreground group-hover:text-green-600 transition-colors font-medium">
                      (15) 99691-8236
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Baseado em <span className="text-foreground font-medium">Itapetininga/SP</span>, mas
                  atendendo clientes em qualquer lugar do Brasil e do mundo. Seu projeto pode ser 100% remoto.
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
