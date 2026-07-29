import { useState, useEffect } from "react";

export default function Vertex() {
  const [wizardIndex, setWizardIndex] = useState(0);

  const wizardData = [
    {
      title: "Reuniões longas, áudios sem ata e digitação repetitiva?",
      desc: "Quando o fundador e a equipe passam o dia refazendo propostas do zero e perdendo acordos de reuniões, o crescimento trava. Você precisa de inteligência privada que trabalhe por você.",
      solTag: "SOLUÇÃO 01 // PARA RECONQUISTAR TEMPO",
      solTitle: "VERTEX OS (Sistema Operacional Privado)",
      solDesc: "Instalação de uma IA local na sua empresa que memoriza seu acervo de documentos, transcreve reuniões e gera atas e propostas comerciais A4 em 45 segundos. Devolve até 8 horas úteis por semana."
    },
    {
      title: "Sua marca parece genérica ou ultrapassada na internet?",
      desc: "Se o seu site é lento ou seu conteúdo não reflete a excelência do seu trabalho, os clientes de alto ticket hesitam em fechar contratos. Você precisa de presença boutique e audiovisual executivo.",
      solTag: "SOLUÇÃO 02 // PARA CONSOLIDAR AUTORIDADE",
      solTitle: "VERTEX BOUTIQUE AGENCY",
      solDesc: "Produção audiovisual cinematográfica de alto status, sites ultrarrápidos em HTML/Vite e gestão de Google Ads de precisão focada estritamente em clientes qualificados."
    },
    {
      title: "Atrai muitos curiosos sem orçamento no WhatsApp?",
      desc: "Queimar verba de anúncios no Google Ads com termos errados e perder tempo atendendo pessoas sem perfil destrói sua margem. Você precisa de um fluxo comercial alinhado.",
      solTag: "SOLUÇÃO 03 // PARA ESCALAR VENDAS",
      solTitle: "VERTEX ADVISORY",
      solDesc: "Fractional CMO e governança comercial. Padronizamos o atendimento da sua secretária/SDR no WhatsApp, filtramos curiosos e desenhamos parcerias com mercados de alta margem."
    }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          document.querySelectorAll<HTMLElement>(".journey-step").forEach((step) => {
            if (step.getAttribute("data-target") === sectionId) {
              step.classList.add("active");
            } else {
              step.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll<HTMLElement>("section").forEach((sec) => {
      observer.observe(sec);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: "#080808", color: "#F9F9FB", fontFamily: "'Inter', sans-serif", minHeight: "100vh", position: "relative" }}>
      <style>{`
        .bg-grid {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 1;
          background-image: 
            radial-gradient(circle at 50% 15%, rgba(225, 29, 72, 0.06) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
          background-size: 100% 100%, 50px 50px, 50px 50px;
        }

        header.vertex-header {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
          border-bottom: 1px solid #222226;
          background: rgba(8, 8, 8, 0.88);
          backdrop-filter: blur(20px);
          padding: 16px 6%;
          display: flex; justify-content: space-between; align-items: center;
        }

        .journey-bar {
          position: fixed; right: 32px; top: 50%; transform: translateY(-50%);
          z-index: 90; display: flex; flex-direction: column; gap: 20px;
          font-size: 12px; color: #52525B;
        }

        .journey-step {
          display: flex; align-items: center; gap: 12px; opacity: 0.35;
          transition: opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer;
        }

        .journey-step span {
          display: inline-block; transform: scale(1); transform-origin: left center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.35s ease, font-weight 0.3s ease;
        }

        .journey-step.active { opacity: 1; }
        .journey-step.active span { transform: scale(1.22); color: #F9F9FB; font-weight: 600; }

        .journey-dot-container { position: relative; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; }
        .journey-dot { width: 6px; height: 6px; background: #52525B; border-radius: 50%; transition: all 0.4s ease; }
        .journey-ring { position: absolute; top: 0; left: 0; width: 14px; height: 14px; border: 1.5px solid #E11D48; border-radius: 50%; transform: scale(0); opacity: 0; transition: all 0.45s ease; }

        .journey-step.active .journey-dot { background: #E11D48; transform: scale(1.6); box-shadow: 0 0 10px rgba(225, 29, 72, 0.6); }
        .journey-step.active .journey-ring { transform: scale(1.5); opacity: 1; animation: circlePulse 2.4s infinite ease-in-out; }

        @keyframes circlePulse {
          0% { transform: scale(1.3); opacity: 0.9; }
          50% { transform: scale(1.85); opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0.9; }
        }

        section { padding: 100px 8%; border-bottom: 1px solid #222226; position: relative; z-index: 2; }
        .pill-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(225, 29, 72, 0.12); color: #E11D48; border: 1px solid rgba(225, 29, 72, 0.25); padding: 6px 16px; border-radius: 30px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }

        .hero { min-height: 88vh; padding: 140px 8% 80px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
        .hero-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5.5vw, 4.8rem); font-weight: 700; line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 24px; max-width: 950px; }

        .wizard-tabs { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
        .tab-btn { background: #111111; color: #A1A1AA; border: 1px solid #222226; padding: 12px 24px; border-radius: 30px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 10px; }
        .tab-btn.active, .tab-btn:hover { background: #161616; color: #F9F9FB; border-color: #E11D48; }

        .wizard-content { border: 1px solid #222226; background: #111111; border-radius: 16px; padding: 40px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: center; }

        .eco-pillars-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .eco-pillar-card { border: 1px solid #222226; background: #111111; border-radius: 16px; padding: 36px; }

        .deliv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .deliv-card { border: 1px solid #222226; background: #111111; border-radius: 16px; padding: 28px; }

        .manifesto-box { padding: 40px 0; max-width: 980px; margin: 0 auto; text-align: center; }
        .manifesto-unified-text { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 4.5vw, 3.8rem); font-weight: 700; line-height: 1.25; color: #F9F9FB; }
        .manifesto-unified-text em { color: #E11D48; font-style: normal; }

        @media (max-width: 900px) {
          header.vertex-header { padding: 14px 20px; }
          .journey-bar { display: none; }
          section { padding: 70px 5%; }
          .wizard-content, .eco-pillars-grid, .deliv-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bg-grid"></div>

      {/* HEADER */}
      <header className="vertex-header">
        <a href="/" className="brand" style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
          <img src="/links/foto_perfil.jpg" alt="VERTEX" style={{ height: "32px", width: "32px", borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "16px", color: "#FFF" }}>VERTEX</span>
        </a>

        <ul style={{ display: "flex", alignItems: "center", gap: "28px", listStyle: "none", margin: 0 }}>
          <li><a href="#diagnosis" style={{ color: "#A1A1AA", textDecoration: "none", fontSize: "13px" }}>Diagnóstico</a></li>
          <li><a href="#solutions" style={{ color: "#A1A1AA", textDecoration: "none", fontSize: "13px" }}>Soluções</a></li>
          <li><a href="#journey" style={{ color: "#A1A1AA", textDecoration: "none", fontSize: "13px" }}>Como Funciona</a></li>
          <li><a href="#deliverables" style={{ color: "#A1A1AA", textDecoration: "none", fontSize: "13px" }}>Entregáveis</a></li>
          <li><a href="#manifesto" style={{ color: "#A1A1AA", textDecoration: "none", fontSize: "13px" }}>Visão</a></li>
        </ul>

        <a href="#diagnosis" style={{ background: "#E11D48", color: "#FFF", padding: "10px 22px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
          Fazer Diagnóstico
        </a>
      </header>

      {/* JORNADA LATERAL */}
      <div className="journey-bar">
        <div className="journey-step active" data-target="hero" onClick={() => scrollToSection("hero")}>
          <div className="journey-dot-container"><div className="journey-ring"></div><div className="journey-dot"></div></div>
          <span>Início</span>
        </div>
        <div className="journey-step" data-target="diagnosis" onClick={() => scrollToSection("diagnosis")}>
          <div className="journey-dot-container"><div className="journey-ring"></div><div className="journey-dot"></div></div>
          <span>Diagnóstico</span>
        </div>
        <div className="journey-step" data-target="solutions" onClick={() => scrollToSection("solutions")}>
          <div className="journey-dot-container"><div className="journey-ring"></div><div className="journey-dot"></div></div>
          <span>Soluções</span>
        </div>
        <div className="journey-step" data-target="journey" onClick={() => scrollToSection("journey")}>
          <div className="journey-dot-container"><div className="journey-ring"></div><div className="journey-dot"></div></div>
          <span>Jornada</span>
        </div>
        <div className="journey-step" data-target="deliverables" onClick={() => scrollToSection("deliverables")}>
          <div className="journey-dot-container"><div className="journey-ring"></div><div className="journey-dot"></div></div>
          <span>Entregáveis</span>
        </div>
        <div className="journey-step" data-target="manifesto" onClick={() => scrollToSection("manifesto")}>
          <div className="journey-dot-container"><div className="journey-ring"></div><div className="journey-dot"></div></div>
          <span>Visão</span>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="hero" id="hero">
          <div className="pill-badge">DO CAOS À CLAREZA ESTRATÉGICA</div>
          <h1 className="hero-title">O Ecossistema Completo de Inteligência & Tração.</h1>
          <p style={{ fontSize: "1.15rem", color: "#A1A1AA", maxWidth: "720px", lineHeight: 1.65, marginBottom: "36px" }}>
            Ajudamos fundadores, escritórios de advocacia e empresas B2B a transformarem a rotina operacional em clareza, autoridade de marca e escala de vendas.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#diagnosis" style={{ background: "#FFF", color: "#080808", padding: "14px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Descubra Sua Solução
            </a>
            <a href="#solutions" style={{ background: "#111", color: "#FFF", border: "1px solid #333338", padding: "14px 32px", borderRadius: "10px", fontSize: "14px", textDecoration: "none" }}>
              Ver os 4 Pilares
            </a>
          </div>
        </section>

        {/* DIAGNÓSTICO INTERATIVO */}
        <section id="diagnosis">
          <div className="pill-badge">01. DIAGNÓSTICO INTERATIVO</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.4rem", fontWeight: 700, marginBottom: "20px" }}>Qual é o Maior Desafio do Seu Negócio Hoje?</h2>
          <p style={{ color: "#A1A1AA", marginBottom: "40px" }}>Selecione abaixo o seu gargalo atual para ver a solução exata recomendada pelo Ecossistema VERTEX.</p>

          <div className="wizard-tabs">
            {wizardData.map((item, idx) => (
              <button key={idx} className={`tab-btn ${wizardIndex === idx ? "active" : ""}`} onClick={() => setWizardIndex(idx)}>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          <div className="wizard-content">
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>{wizardData[wizardIndex].title}</h3>
              <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.7, marginBottom: "24px" }}>{wizardData[wizardIndex].desc}</p>
              <a href="#solutions" style={{ background: "#E11D48", color: "#FFF", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Ativar Esta Solução
              </a>
            </div>

            <div style={{ background: "#0D0D0F", border: "1px solid #333338", borderRadius: "12px", padding: "28px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#E11D48", letterSpacing: "1px", marginBottom: "8px" }}>{wizardData[wizardIndex].solTag}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>{wizardData[wizardIndex].solTitle}</div>
              <div style={{ fontSize: "13.5px", color: "#A1A1AA", lineHeight: 1.6 }}>{wizardData[wizardIndex].solDesc}</div>
            </div>
          </div>
        </section>

        {/* PILARES */}
        <section id="solutions">
          <div className="pill-badge">02. OS 4 PILARES DO ECOSSISTEMA</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.4rem", fontWeight: 700, marginBottom: "20px" }}>Uma Infraestrutura Completa sob Medida.</h2>

          <div className="eco-pillars-grid">
            <div className="eco-pillar-card">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>VERTEX OS</h3>
              <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.65 }}>Sistema Operacional Privado instalado na sua máquina. Organiza seu conhecimento interno, gera atas de reunião e propostas A4 timbradas de forma automática.</p>
            </div>
            <div className="eco-pillar-card">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>VERTEX BOUTIQUE AGENCY</h3>
              <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.65 }}>Produção audiovisual cinematográfica e engenharia web de alto status. Criamos sites boutique ultrarrápidos em HTML/Vite e gerenciamos anúncios de precisão no Google Ads.</p>
            </div>
            <div className="eco-pillar-card">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>VERTEX ADVISORY</h3>
              <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.65 }}>Fractional CMO e governança comercial. Padronizamos o atendimento da secretária/SDR no WhatsApp e orientamos a pivotagem para clientes de alta margem.</p>
            </div>
            <div className="eco-pillar-card">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>VERTEX ACADEMY</h3>
              <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.65 }}>O braço educacional para capacitação da sua equipe. Kits de IA no Escritório (produtos educacionais de entrada) e imersões de formação contínua.</p>
            </div>
          </div>
        </section>

        {/* MANIFESTO UNIFICADO */}
        <section id="manifesto">
          <div className="pill-badge">03. NOSSA VISÃO</div>
          <div className="manifesto-box">
            <h2 className="manifesto-unified-text">
              "Conectamos o <span style={{ color: "#AAA" }}>caos de informações</span>, presença e atendimento da sua empresa até que todo o ruído desapareça e a clareza se transforme em <em>autoridade, tempo e escala</em>."
            </h2>
            <div style={{ marginTop: "36px", fontFamily: "'Geist Mono', monospace", fontSize: "13px", fontWeight: 600, color: "#E11D48", letterSpacing: "3px" }}>
              VERTEX // FROM CHAOS TO CLARITY
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: "60px 8% 40px", borderTop: "1px solid #222226", textAlign: "center", fontSize: "12px", color: "#52525B" }}>
        ECOSSISTEMA VERTEX © 2026. TODOS OS DIREITOS RESERVADOS.
      </footer>
    </div>
  );
}
