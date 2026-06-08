import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronRight, 
  Calculator, 
  User, 
  Mail, 
  MessageSquare, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Search,
  Activity,
  Zap,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Calculadora() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  // Inputs matching the Excel file: 'simulador-parceiros-indicacoes.xlsx'
  const [custosDespesas, setCustosDespesas] = useState(5000); // R34: Custos + despesas
  const [processosMovimentados, setProcessosMovimentados] = useState(40); // R37: Quantidade de processos movimentados
  const [investimentoTrafego, setInvestimentoTrafego] = useState(1000); // Extra for traffic analysis
  const [duracaoMeses, setDuracaoMeses] = useState(36); // H22: Meses de duração do processo (default 36 meses = 3 anos)
  
  // Lead info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Navigation
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  
  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!email.trim() || !email.includes("@")) newErrors.email = "E-mail inválido";
    if (!whatsapp.trim() || whatsapp.length < 10) newErrors.whatsapp = "WhatsApp inválido";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    setSubmitError("");

    // Excel Logic:
    // CMP (por mês) [R40] = Custos + Despesas [R34] / Quantidade de processos movimentados [R37]
    const cmpPorMes = processosMovimentados > 0 ? custosDespesas / processosMovimentados : 0;
    // Custo Total no Período [F28] = CMP por mês [F22] * Meses de duração do processo [H22]
    const custoTotalPeriodo = cmpPorMes * duracaoMeses;

    try {
      // Submit directly to Formspree
      const response = await fetch("https://formspree.io/f/xgoorodw", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          name,
          email,
          phone: whatsapp,
          "Formulário": "Calculadora de CMP e Tráfego",
          "Lógica Planilha": "simulador-parceiros-indicacoes.xlsx",
          "Custos + Despesas (R34)": `R$ ${custosDespesas}`,
          "Processos Movimentados por Mês (R37)": processosMovimentados,
          "Investimento em Tráfego": `R$ ${investimentoTrafego}`,
          "Meses de Duração (H22)": `${duracaoMeses} meses`,
          "CMP por Mês (R40)": `R$ ${cmpPorMes.toFixed(2)}`,
          "Custo Total no Período (F28)": `R$ ${custoTotalPeriodo.toFixed(2)}`
        }),
      });

      if (response.ok) {
        nextStep();
      } else {
        setSubmitError("Erro ao enviar dados. Tente novamente ou entre em contato pelo WhatsApp.");
      }
    } catch (err) {
      setSubmitError("Falha de conexão. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Excel Logic calculations for real-time display
  const cmpPorMes = processosMovimentados > 0 ? custosDespesas / processosMovimentados : 0;
  const custoTotalPeriodo = cmpPorMes * duracaoMeses;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  const waMessage = `Olá Leo! Fiz a simulação baseada no Simulador de Parceiros. Custos+Despesas: R$ ${custosDespesas}, Processos movimentados: ${processosMovimentados}, Tráfego: R$ ${investimentoTrafego}, Duração: ${duracaoMeses} meses. Meu CMP/mês deu ${formatCurrency(cmpPorMes)} e Custo Total do Processo: ${formatCurrency(custoTotalPeriodo)}. Quero agendar o diagnóstico estratégico.`;
  const waUrl = `https://wa.me/5515996918236?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="links-page select-none">
      {/* Background blurred photo & overlay */}
      <div
        className="links-bg"
        style={{ backgroundImage: "url('/links/foto_perfil.jpg')" }}
      />
      <div className="links-overlay" />
      
      {/* Glow Orbs */}
      <div className="links-glow-orb links-glow-orb-1" />
      <div className="links-glow-orb links-glow-orb-2" />

      {/* Main Container */}
      <div className="w-full max-w-[500px] z-10 px-4">
        
        {/* Back Link to Bio */}
        <Link 
          to="/links" 
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Voltar para Links
        </Link>

        {/* Card */}
        <main className="bg-neutral-900/60 backdrop-blur-2xl border border-white/8 w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header Progress */}
          {step <= 5 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] tracking-widest text-amber-500 uppercase font-semibold">
                  Mapeamento de Custos · Passo {step} de 5
                </span>
                <span className="text-xs text-white/40">{Math.round((step / 5) * 100)}% concluído</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* Step 1: Custos + Despesas */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <span className="inline-block text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                    Simulação Rápida
                  </span>
                  <h2 className="text-xl font-bold font-display text-white">Custos + Despesas</h2>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Este teste é uma estimativa simplificada para você ter uma noção do seu custo operacional por processo. O diagnóstico completo e exato é refinado na sessão de consultoria estratégica.
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed pt-1">
                    Qual é o valor de **Custos + Despesas** operacionais mensais do seu escritório?
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-white/40 text-sm font-semibold">R$</span>
                    <input 
                      type="number" 
                      value={custosDespesas}
                      onChange={(e) => setCustosDespesas(Math.max(0, parseInt(e.target.value) || 0))}
                      className="bg-transparent border-none outline-none text-right font-display text-2xl font-bold text-amber-500 w-full focus:ring-0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min="1000" 
                      max="50000" 
                      step="500"
                      value={custosDespesas} 
                      onChange={(e) => setCustosDespesas(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40">
                      <span>R$ 1.000</span>
                      <span>R$ 25.000</span>
                      <span>R$ 50.000+</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/10 mt-6"
                >
                  Avançar
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Movimentações Efetivas por Mês */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold font-display text-white">Movimentações Efetivas</h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Qual é a **quantidade de movimentações efetivas** (peças elaboradas, audiências, reuniões, atendimentos importantes) realizadas por mês?
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-white/40 text-sm font-semibold">Movimentações</span>
                    <input 
                      type="number" 
                      value={processosMovimentados}
                      onChange={(e) => setProcessosMovimentados(Math.max(1, parseInt(e.target.value) || 1))}
                      className="bg-transparent border-none outline-none text-right font-display text-2xl font-bold text-amber-500 w-full focus:ring-0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min="5" 
                      max="300" 
                      step="5"
                      value={processosMovimentados} 
                      onChange={(e) => setProcessosMovimentados(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40">
                      <span>5 mov.</span>
                      <span>150 mov.</span>
                      <span>300+</span>
                    </div>
                  </div>
                  
                  {/* Helper notes */}
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3.5 space-y-3">
                    <div className="flex gap-2">
                      <Search className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-white/50 leading-normal">
                        <strong>Importante:</strong> Não coloque o total de processos ativos, mas sim o volume de trabalho mensal. Se não souber, use uma estimativa; ajudamos a metrificá-la na sessão estratégica.
                      </p>
                    </div>
                    <div className="border-t border-white/5 pt-2 flex gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                      <p className="text-[11px] text-white/55 leading-normal">
                        <strong>Reflexão de Eficiência:</strong> A depender do número de funcionários contratados, se você realiza apenas **de 10 a 20 prazos e movimentações por mês**, vale refletir se há necessidade de uma equipe desse tamanho ou se há ociosidade operacional oculta.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={prevStep}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold h-12 rounded-xl transition-all border border-white/10"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/10"
                  >
                    Avançar
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Investimento em Tráfego */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold font-display text-white">Investimento em Tráfego</h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Quanto você investe em tráfego pago (Google/Meta Ads) por mês para atração ativa de clientes?
                  </p>
                  <p className="text-xs text-white/40">
                    Insira <strong>0</strong> caso não faça anúncios hoje.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-white/40 text-sm font-semibold">R$</span>
                    <input 
                      type="number" 
                      value={investimentoTrafego}
                      onChange={(e) => setInvestimentoTrafego(Math.max(0, parseInt(e.target.value) || 0))}
                      className="bg-transparent border-none outline-none text-right font-display text-2xl font-bold text-amber-500 w-full focus:ring-0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="15000" 
                      step="250"
                      value={investimentoTrafego} 
                      onChange={(e) => setInvestimentoTrafego(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40">
                      <span>R$ 0</span>
                      <span>R$ 7.500</span>
                      <span>R$ 15.000+</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={prevStep}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold h-12 rounded-xl transition-all border border-white/10"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/10"
                  >
                    Avançar
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Meses de Duração */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold font-display text-white">Duração do Processo</h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Qual é a média de **meses de duração do processo** sob os cuidados da sua banca?
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-white/40 text-sm font-semibold">Duração</span>
                    <span className="font-display text-2xl font-bold text-amber-500">{duracaoMeses} meses <span className="text-xs text-white/40">({(duracaoMeses/12).toFixed(1)} {duracaoMeses === 12 ? 'ano' : 'anos'})</span></span>
                  </div>
                  
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min="6" 
                      max="120" 
                      step="6"
                      value={duracaoMeses} 
                      onChange={(e) => setDuracaoMeses(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40">
                      <span>6 meses</span>
                      <span>60 meses (5 anos)</span>
                      <span>120 meses (10 anos)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={prevStep}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold h-12 rounded-xl transition-all border border-white/10"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/10"
                  >
                    Avançar
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Lead Capture */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold font-display text-white">Enviar no E-mail</h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Cadastre seus dados para receber o diagnóstico de CMP detalhado e a margem de lucro sugerida.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                  {/* Nome */}
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">Nome Completo</label>
                    <div className="bg-black/30 border border-white/5 focus-within:border-amber-500/40 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors">
                      <User className="w-4 h-4 text-white/30" />
                      <input 
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-transparent border-none outline-none text-white text-sm w-full focus:ring-0"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.name && <span className="text-[10px] text-red-400">{errors.name}</span>}
                  </div>

                  {/* E-mail */}
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">E-mail Profissional</label>
                    <div className="bg-black/30 border border-white/5 focus-within:border-amber-500/40 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors">
                      <Mail className="w-4 h-4 text-white/30" />
                      <input 
                        type="email"
                        placeholder="seuemail@escritorio.com.br"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent border-none outline-none text-white text-sm w-full focus:ring-0"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && <span className="text-[10px] text-red-400">{errors.email}</span>}
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">WhatsApp com DDD</label>
                    <div className="bg-black/30 border border-white/5 focus-within:border-amber-500/40 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors">
                      <MessageSquare className="w-4 h-4 text-white/30" />
                      <input 
                        type="tel"
                        placeholder="11999998888"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                        className="bg-transparent border-none outline-none text-white text-sm w-full focus:ring-0"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.whatsapp && <span className="text-[10px] text-red-400">{errors.whatsapp}</span>}
                  </div>

                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3">
                      {submitError}
                    </div>
                  )}

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold h-12 rounded-xl transition-all border border-white/10"
                      disabled={isSubmitting}
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/10"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Calcular CMP
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 6: Results Screen */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Result Header */}
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mb-1">
                    <Calculator className="w-6 h-6 text-amber-500" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-white">Mapeamento de CMP Finalizado</h2>
                  <p className="text-xs text-white/50">
                    Lógica integrada ao seu <strong>Simulador de Parceiros</strong>.
                  </p>
                </div>

                {/* Metrics Cards */}
                <div className="space-y-4">
                  
                  {/* CMP por Mês */}
                  <div className="bg-black/35 border border-white/5 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden">
                    <div className="space-y-1">
                      <span className="text-[10px] tracking-wider uppercase text-white/40 font-semibold block">CMP (por mês)</span>
                      <span className="text-xl font-bold font-display text-white">{formatCurrency(cmpPorMes)}</span>
                    </div>
                    <Activity className="w-8 h-8 text-white/10 shrink-0" />
                  </div>

                  {/* Custo total do processo no período */}
                  <div className="bg-gradient-to-br from-amber-500/5 to-amber-950/15 border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-2 right-2 opacity-15">
                      <DollarSign className="w-16 h-16 text-amber-500" />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-amber-500 font-bold mb-1 block">Custo Total no Período</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold font-display text-amber-500">{formatCurrency(custoTotalPeriodo)}</span>
                    </div>
                    <p className="text-[10px] text-white/50 mt-3 leading-relaxed">
                      O custo operacional real para manter o processo tramitando durante os {duracaoMeses} meses simulados.
                    </p>
                  </div>

                  {/* Paid Traffic Alert (Previsibilidade) */}
                  {investimentoTrafego === 0 ? (
                    <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-4 flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide">Previsibilidade Zero</h4>
                        <p className="text-[11px] text-white/60 leading-normal">
                          Você respondeu que investe <strong>R$ 0</strong> em tráfego pago. Sem anúncios ativos, seu escritório **depende exclusivamente de indicações e da boa vontade de terceiros**, o que elimina qualquer previsibilidade de crescimento.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-4 flex gap-3">
                      <Zap className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Tráfego Ativo</h4>
                        <p className="text-[11px] text-white/60 leading-normal">
                          Excelente. Você investe <strong>{formatCurrency(investimentoTrafego)}</strong>/mês em anúncios. No diagnóstico estratégico podemos refinar a sua taxa de conversão e seu CAC real.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CMP Warning callout */}
                  <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4 flex gap-3">
                    <TrendingUp className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-amber-400">O Paradoxo do Advogado-Financiador</h4>
                      <p className="text-[11px] text-white/60 leading-normal">
                        Na advocacia de êxito, é normal não cobrar honorários iniciais. Contudo, manter este processo ativo consome aproximadamente <strong className="text-white">{formatCurrency(cmpPorMes)}/mês</strong> de estrutura. Ao receber o êxito final, lembre-se de separar primeiro o custo acumulado de <strong className="text-white">{formatCurrency(custoTotalPeriodo)}</strong> para cobrir a estrutura da banca antes de contabilizar seu lucro real. Este custo operacional é diluído entre os seus demais processos ativos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="space-y-3 pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/25"
                  >
                    Agendar Diagnóstico com Léo no WhatsApp
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  
                  <button
                    onClick={() => setStep(1)}
                    className="w-full bg-white/5 hover:bg-white/10 text-white/70 font-semibold h-11 rounded-xl transition-all border border-white/10 text-xs"
                  >
                    Refazer Simulação
                  </button>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
