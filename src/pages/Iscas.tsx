import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, FileText, FileSpreadsheet, Play, Sparkles, Check, AlertCircle } from "lucide-react";

interface IscaItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: "doc" | "sheet" | "play";
  fileUrl: string;
  whatsappMessage: string;
}

const iscas: IscaItem[] = [
  {
    id: "protocolo_hibrido",
    title: "Playbook: Protocolo Comercial Híbrido",
    subtitle: "SDR de IA + Closer Humano no WhatsApp",
    description: "O roteiro passo a passo com a lógica de triagem automática e contorno de objeções OAB para fechar contratos de alto valor.",
    badge: "Playbook Técnico",
    icon: "doc",
    fileUrl: "/downloads/playbook_protocolo_hibrido.docx",
    whatsappMessage: "Leo, quero saber mais sobre como implementar o Playbook de Protocolo Comercial Híbrido no meu escritório."
  },
  {
    id: "cta_etica",
    title: "Manual da CTA Ética OAB para Anúncios",
    subtitle: "Copywriting em Conformidade com o Provimento 205/2021",
    description: "Aprenda a criar anúncios e chamadas no infinitivo altamente persuasivos que não violam as regras éticas da OAB.",
    badge: "Manual de Copy",
    icon: "doc",
    fileUrl: "/downloads/manual_cta_etica_oab.docx",
    whatsappMessage: "Leo, acabo de ver o Manual de CTA Ética OAB e gostaria de entender como estruturar meus criativos em conformidade."
  },
  {
    id: "simulador_financeiro",
    title: "Playbook: Simulador Financeiro Vértice",
    subtitle: "Como Calcular a Hora-Base e o CMP do Escritório",
    description: "Um manual completo contendo as fórmulas e conceitos por trás do Custo Mensal do Posto de Trabalho e ROI de tráfego pago.",
    badge: "Manual Financeiro",
    icon: "sheet",
    fileUrl: "/downloads/playbook_simulador_financeiro.docx",
    whatsappMessage: "Leo, quero receber o acesso à Planilha e ao Playbook do Simulador Financeiro Vértice para calcular minha Hora-Base."
  },
  {
    id: "plano_2_lider",
    title: "Playbook: Método Método Vértice de Escala Comercial",
    subtitle: "Escala e Operação Financeira de Advocacia",
    description: "A tese central de produtos jurídicos de massa, contingência de chips de WhatsApp e infraestrutura segura de produção com IA.",
    badge: "Playbook de Escala",
    icon: "doc",
    fileUrl: "/downloads/playbook_metodo_vertice_escala_comercial.docx",
    whatsappMessage: "Leo, quero entender mais sobre o método Método Vértice de Escala Comercial para escalar a captação de clientes do meu escritório."
  },
  {
    id: "palestra_ia_first",
    title: "Palestra: Advocacia IA-First",
    subtitle: "Estrutura e Slides de Apresentação OAB",
    description: "Os slides e o roteiro didático ideal para palestras da OAB, demonstrando ferramentas de inteligência artificial de forma ética.",
    badge: "Slides & Roteiro",
    icon: "play",
    fileUrl: "/downloads/playbook_protocolo_hibrido.docx", // Fallback to hybrid protocol
    whatsappMessage: "Leo, me manda o roteiro e slides da Palestra de Advocacia IA-First para me apresentar na OAB."
  }
];

export default function Iscas() {
  const [selectedIsca, setSelectedIsca] = useState<IscaItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", whatsapp: "" });
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Check if lead already unlocked downloads
  useEffect(() => {
    const saved = localStorage.getItem("vertice_lead_unlocked");
    if (saved) {
      setHasUnlocked(true);
      const data = JSON.parse(saved);
      setFormData(data);
    }
  }, []);

  const handleDownloadClick = (isca: IscaItem) => {
    setSelectedIsca(isca);
    if (hasUnlocked) {
      triggerDownloadAndWhatsApp(isca);
    } else {
      setShowModal(true);
    }
  };

  const triggerDownloadAndWhatsApp = (isca: IscaItem) => {
    // 1. Direct download
    const link = document.createElement("a");
    link.href = isca.fileUrl;
    link.download = isca.fileUrl.split("/").pop() || "material.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Open WhatsApp in new tab for Leo's RAG/SDR trigger
    const waUrl = `https://wa.me/5515996918236?text=${encodeURIComponent(isca.whatsappMessage)}`;
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.nome.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError("Por favor, insira um e-mail válido.");
      return;
    }

    // Basic whatsapp validation
    if (formData.whatsapp.replace(/\D/g, "").length < 10) {
      setFormError("Por favor, insira um WhatsApp válido com DDD.");
      return;
    }

    setIsSubmitting(true);

    // Track analytics if available
    if (typeof window !== "undefined") {
      const dataLayer = (window as any).dataLayer || [];
      dataLayer.push({
        event: "rich_material_download",
        material_id: selectedIsca?.id,
        lead_name: formData.nome,
        lead_email: formData.email,
        lead_whatsapp: formData.whatsapp
      });
    }

    setTimeout(() => {
      localStorage.setItem("vertice_lead_unlocked", JSON.stringify(formData));
      setHasUnlocked(true);
      setShowModal(false);
      setIsSubmitting(false);

      if (selectedIsca) {
        triggerDownloadAndWhatsApp(selectedIsca);
      }
    }, 1200);
  };

  return (
    <div className="links-page min-h-screen text-white flex flex-col items-center justify-between pb-8">
      {/* Background overlay */}
      <div className="links-bg" style={{ backgroundImage: "url('/links/bg.jpg')" }} />
      <div className="links-overlay" />
      <div className="links-glow-orb links-glow-orb-1" />
      <div className="links-glow-orb links-glow-orb-2" />

      {/* Main Container */}
      <main className="w-full max-w-2xl px-4 z-10 py-8 flex flex-col items-center">
        {/* Back navigation */}
        <div className="w-full flex justify-start mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#C8A45A] hover:text-[#e0b865] transition-colors bg-black/40 px-3.5 py-2 rounded-full border border-[#C8A45A]/20 backdrop-blur-md">
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao Hub
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#C8A45A]/10 border border-[#C8A45A]/30 px-3 py-1 rounded-full text-xs font-black text-[#C8A45A] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Materiais de Elite
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight mb-3">
            Biblioteca de Iscas & Playbooks
          </h1>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Tenha acesso imediato aos playbooks, planilhas e guias de processos jurídicos e Inteligência Artificial criados por Léo Cauchioli.
          </p>
        </div>

        {/* Resource List */}
        <div className="w-full flex flex-col gap-5">
          {iscas.map((isca) => (
            <motion.div
              key={isca.id}
              whileHover={{ scale: 1.01, translateY: -2 }}
              className="bg-black/60 border border-white/10 hover:border-[#C8A45A]/40 rounded-2xl p-5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md shadow-2xl relative overflow-hidden group"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#C8A45A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A45A] flex-shrink-0 group-hover:bg-[#C8A45A]/10 group-hover:border-[#C8A45A]/20 transition-all">
                  {isca.icon === "sheet" ? (
                    <FileSpreadsheet className="w-6 h-6" />
                  ) : isca.icon === "play" ? (
                    <Play className="w-5 h-5 fill-[#C8A45A]" />
                  ) : (
                    <FileText className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#C8A45A]/25 text-[#C8A45A] px-2 py-0.5 rounded border border-[#C8A45A]/20">
                      {isca.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#C8A45A] transition-colors leading-tight">
                    {isca.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 leading-normal font-light">
                    {isca.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDownloadClick(isca)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#C8A45A] hover:bg-[#e0b865] active:scale-95 text-black font-bold text-xs uppercase px-4 py-3 rounded-xl transition-all tracking-wider font-display flex-shrink-0 shadow-lg shadow-[#C8A45A]/10"
              >
                <Download className="w-3.5 h-3.5" />
                Baixar Material
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="links-footer z-10 w-full mt-8">
        <span>Vértice Inteligência & Posicionamento</span>
        <span className="links-dot">·</span>
        <span>© 2026</span>
      </footer>

      {/* Unlock Lead Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#0f1424] border border-[#C8A45A]/30 rounded-3xl p-6 sm:p-8 w-full max-w-md z-10 shadow-2xl relative overflow-hidden"
            >
              {/* Gold light glow in modal background */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C8A45A]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#C8A45A]/10 border border-[#C8A45A]/20 rounded-2xl flex items-center justify-center text-[#C8A45A] mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-white tracking-tight">
                  Desbloquear Acesso Gratuito
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Insira seus dados abaixo para liberar o download de <strong>todo o acervo de materiais ricos</strong> da Vértice.
                </p>
              </div>

              {formError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3.5 py-2.5 rounded-xl mb-4 flex items-center gap-2 font-light">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Doutor(a) Nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C8A45A] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="exemplo@escritorio.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C8A45A] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(00) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C8A45A] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C8A45A] hover:bg-[#e0b865] disabled:bg-slate-700 disabled:text-slate-400 text-black font-black text-xs uppercase py-3.5 rounded-xl transition-all tracking-wider font-display mt-2 shadow-lg shadow-[#C8A45A]/10 active:scale-95"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Desbloqueando...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Desbloquear e Baixar
                    </>
                  )}
                </button>
              </form>

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
