import { useEffect } from "react";

interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  image: string;
  borderColor: string;
  pulse?: boolean;
  featured?: boolean;
  badge?: string;
}

const links: LinkItem[] = [
  {
    id: "vertex-ecosystem",
    title: "VERTEX Ecosystem",
    subtitle: "Conheça o Ecossistema Completo de Inteligência & Tração",
    url: "/vertex",
    image: "/links/vertex-hub-banner.jpg",
    borderColor: "#E11D48",
    pulse: true,
    featured: true,
    badge: "SITE OFICIAL // ECOSSISTEMA",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Executivo",
    subtitle: "Conversar no WhatsApp com Leo Cauchioli",
    url: "https://wa.me/5515996918236?text=Ol%C3%A1%20L%C3%A9o%2C%20vim%20pelo%20seu%20link%20na%20bio%20e%20quero%20fazer%20o%20diagn%C3%B3stico%20gratuito.",
    image: "/links/banner_whatsapp.png",
    borderColor: "#E11D48",
    badge: "Contato",
  },
  {
    id: "vertex-os",
    title: "VERTEX OS",
    subtitle: "Sistema Operacional Privado para empresas & escritórios",
    url: "/vertex#diagnosis",
    image: "/links/icon-vertex-os.jpg",
    borderColor: "#E11D48",
    badge: "IA Privada",
  },
  {
    id: "vertex-agency",
    title: "VERTEX Boutique Agency",
    subtitle: "Audiovisual cinematográfico & Engenharia Web em HTML/Vite",
    url: "/vertex#solutions",
    image: "/links/icon-vertex-agency.jpg",
    borderColor: "#E11D48",
    badge: "Boutique",
  },
  {
    id: "vertex-advisory",
    title: "VERTEX Fractional Advisory",
    subtitle: "Governança comercial & Atração de clientes de alta margem",
    url: "/vertex#solutions",
    image: "/links/icon-vertex-advisory.jpg",
    borderColor: "#E11D48",
    badge: "Advisory",
  },
  {
    id: "iscas",
    title: "Biblioteca de Playbooks & Iscas",
    subtitle: "Acesse nossos materiais e guias de processos e IA · Grátis",
    url: "/iscas",
    image: "/links/banner_iscas.png",
    borderColor: "#C8A45A",
    badge: "Downloads",
  },
  {
    id: "cmp",
    title: "Calculadora de CMP",
    subtitle: "Descubra o custo real do seu escritório · Grátis",
    url: "/calculadora",
    image: "/links/banner_cmp.png",
    borderColor: "#6B7280",
    badge: "Diagnóstico",
  },
  {
    id: "precificacao",
    title: "Guia de Precificação Jurídica",
    subtitle: "Hora Base & CMP · R$ 47",
    url: "https://pay.kiwify.com.br/4tbxxak",
    image: "/links/banner_precificacao.png",
    borderColor: "#B8860B",
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@leocauchiolli",
    url: "https://instagram.com/leocauchiolli",
    image: "/links/banner_instagram.png",
    borderColor: "#9B59B6",
  },
];

export default function Links() {
  useEffect(() => {
    const selectors = ["#tidio-chat", "#hubspot-messages-iframe-container", ".intercom-app"];
    selectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) (el as HTMLElement).style.display = "none";
    });
  }, []);

  return (
    <div className="links-page">
      <div
        className="links-bg"
        style={{ backgroundImage: "url('/links/foto_perfil.jpg')" }}
      />
      <div className="links-overlay" />
      
      <div className="links-glow-orb links-glow-orb-1" />
      <div className="links-glow-orb links-glow-orb-2" />

      <main className="links-card">
        <div className="profile-header">
          <div className="profile-img-container">
            <img src="/links/foto_perfil.jpg" alt="Leo Cauchioli" className="profile-img" />
            <div className="profile-ring" />
          </div>
          <h2 className="profile-name">Leo Cauchioli // VERTEX</h2>
          <p className="profile-handle">@leocauchiolli</p>
          <p className="profile-tagline">Ecossistema de Inteligência Privada (Vertex OS), Agência Boutique & Advisory</p>
        </div>

        <div className="links-list">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith("/") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={`link-item ${link.pulse ? "link-pulse" : ""} ${link.featured ? "link-featured" : ""}`}
              style={{ "--border-color": link.borderColor } as React.CSSProperties}
              data-origin={link.id}
            >
              <div className="link-img-wrap">
                {link.badge && (
                  <div className="absolute top-2.5 left-2.5 z-10 bg-[#E11D48] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-lg">
                    {link.badge}
                  </div>
                )}
                <img
                  src={link.image}
                  alt={link.title}
                  className="link-img"
                  loading="lazy"
                />
                <div className="link-shimmer" />
              </div>
            </a>
          ))}
        </div>

        <footer className="links-footer">
          <span>ECOSSISTEMA VERTEX</span>
          <span className="links-dot">·</span>
          <span>© 2026 Todos os Direitos Reservados</span>
        </footer>
      </main>
    </div>
  );
}
