import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
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

const ContatoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xgoorodw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente ou entre em contato pelo WhatsApp.",
          variant: "destructive",
        });
      }
    } catch (error) {
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
    <section id="contato" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-body text-sm uppercase tracking-widest text-primary mb-4">
            Contato
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">
            Vamos Conversar
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Pronto para alinhar sua imagem e seu site? Entre em contato e vamos 
            descobrir como posicionar sua autoridade no mercado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="glass-card p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h3 className="font-display text-2xl font-semibold mb-4">
                  Mensagem Enviada!
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  Obrigado pelo seu contato. Responderei em breve!
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="font-body"
                >
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-body text-sm">
                    Nome *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className={`font-body bg-background/50 border-border/50 focus:border-primary ${
                      errors.name ? "border-destructive" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm font-body">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body text-sm">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={`font-body bg-background/50 border-border/50 focus:border-primary ${
                      errors.email ? "border-destructive" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm font-body">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-body text-sm">
                    Telefone (opcional)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="font-body bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body text-sm">
                    Mensagem *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte um pouco sobre seu projeto..."
                    rows={5}
                    className={`font-body bg-background/50 border-border/50 focus:border-primary resize-none ${
                      errors.message ? "border-destructive" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm font-body">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-body bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="glass-card p-8">
              <h3 className="font-display text-xl font-semibold mb-6">
                Outras formas de contato
              </h3>
              
              <div className="space-y-6">
                <a
                  href="mailto:leocauchioli@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Email</p>
                    <p className="font-body text-foreground group-hover:text-primary transition-colors">
                      leocauchioli@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/5515996918236?text=Ol%C3%A1%2C%20vim%20pelo%20site%2C%20quero%20saber%20mais%20sobre%20a%20V%C3%A9rtice."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">WhatsApp</p>
                    <p className="font-body text-foreground group-hover:text-green-500 transition-colors">
                      (15) 99691-8236
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card p-8">
              <p className="font-body text-muted-foreground leading-relaxed">
                Baseado em <span className="text-primary font-medium">Itapetininga/SP</span>, 
                mas atendendo clientes em qualquer lugar do Brasil e do mundo. 
                Seu projeto pode ser 100% remoto.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContatoSection;
