import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const Obrigado = () => {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin") || "direto";
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // 1. Google Analytics Tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "Conversion",
        event_label: `whatsapp_${origin}`,
        lead_origin: origin,
      });
    }

    // 2. Google Tag Manager Tracking (dataLayer)
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "whatsapp_lead",
        lead_origin: origin,
      });
    }

    // Determine custom text messages based on origin
    let messageText = "Olá, vim pelo site e quero agendar uma sessão estratégica.";
    if (origin === "hero") {
      messageText = "Olá, vim pela seção inicial do site e quero agendar uma sessão estratégica.";
    } else if (origin === "navbar") {
      messageText = "Olá, vim pelo topo do site e quero agendar uma sessão estratégica.";
    } else if (origin === "contato") {
      messageText = "Olá, vim pelo formulário de contato do site e quero agendar uma sessão estratégica.";
    } else if (origin === "footer") {
      messageText = "Olá, vim pelo rodapé do site e quero agendar uma sessão estratégica.";
    }

    const whatsappUrl = `https://wa.me/5515996918236?text=${encodeURIComponent(messageText)}`;

    // Countdown and redirect
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = whatsappUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [origin]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/10 to-background pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-card p-8 sm:p-10 border border-border text-center z-10 relative flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-3 text-foreground tracking-tight">
          Conexão Iniciada
        </h1>
        
        <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
          Sua sessão estratégica de elite está a um passo. Estamos te redirecionando para o WhatsApp em{" "}
          <span className="text-foreground font-bold font-mono">{countdown}s</span>...
        </p>

        <div className="flex items-center gap-2 justify-center py-2 text-xs text-muted-foreground font-body bg-muted/30 rounded-lg px-4 mb-6">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
          Rastreando canal: <span className="text-foreground font-semibold uppercase">{origin}</span>
        </div>

        <a
          href={`https://wa.me/5515996918236?text=${encodeURIComponent(
            "Olá, vim pelo site e quero agendar uma sessão estratégica."
          )}`}
          className="inline-flex items-center gap-2 font-body text-xs text-primary hover:text-primary/80 transition-colors mt-2"
        >
          Clique aqui se não for redirecionado automaticamente
          <ArrowRight className="w-3 h-3" />
        </a>
      </motion.div>
    </div>
  );
};

export default Obrigado;
