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
    id: "assessoria",
    title: "Assessoria Vértice",
    subtitle: "Diagnóstico gratuito · 15 min · Vagas limitadas",
    url: "https://wa.me/5515996918236?text=Ol%C3%A1%20L%C3%A9o%2C%20vim%20pelo%20seu%20link%20na%20bio%20e%20quero%20fazer%20o%20diagn%C3%B3stico%20gratuito.",
    image: "/links/banner_assessoria.png",
    borderColor: "#C8A45A",
    pulse: true,
    featured: true,
    badge: "Assessoria",
  },
  {
    id: "site",
    title: "Site Oficial",
    subtitle: "Conheça nossa metodologia completa",
    url: "https://visual-vertice-hub.vercel.app/",
    image: "/links/banner_site.png",
    borderColor: "#E5C158",
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
    url: "#",
    image: "/links/banner_precificacao.png",
    borderColor: "#B8860B",
  },
  {
    id: "ia",
    title: "IA no Escritório",
    subtitle: "4 Playbooks operacionais · R$ 97",
    url: "#",
    image: "/links/banner_ia.png",
    borderColor: "#4A90D9",
  },
  {
    id: "podcast",
    title: "Banca Jurídica Podcast",
    subtitle: "O podcast dos advogados posicionados",
    url: "https://www.instagram.com/bancajuridica.podcast/",
    image: "/links/banner_podcast.jpg",
    borderColor: "#E5C158",
    badge: "Meu Podcast",
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@leocauchiolli",
    url: "https://instagram.com/leocauchiolli",
    image: "/links/banner_instagram.png",
    borderColor: "#9B59B6",
  },
  {
    id: "tiktok",
    title: "TikTok",
    subtitle: "@cauchioli",
    url: "https://www.tiktok.com/@cauchioli",
    image: "/links/banner_tiktok.png",
    borderColor: "#FF2A2A",
  },
];

export default function Links() {
  // Remove floating/chat widgets that may appear from other scripts
  useEffect(() => {
    const selectors = ["#tidio-chat", "#hubspot-messages-iframe-container", ".intercom-app"];
    selectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) (el as HTMLElement).style.display = "none";
    });
  }, []);

  return (
    <div className="links-page">
      {/* ── Background: blurred profile photo ── */}
      <div
        className="links-bg"
        style={{ backgroundImage: "url('/links/foto_perfil.jpg')" }}
      />
      <div className="links-overlay" />
      
      {/* Ambient background glow orbs */}
      <div className="links-glow-orb links-glow-orb-1" />
      <div className="links-glow-orb links-glow-orb-2" />

      {/* ── Main card ── */}
      <main className="links-card">

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-img-container">
            <img src="/links/foto_perfil.jpg" alt="Leo Cauchioli" className="profile-img" />
            <div className="profile-ring" />
          </div>
          <h2 className="profile-name">Leo Cauchioli</h2>
          <p className="profile-handle">@leocauchiolli</p>
          <p className="profile-tagline">Posicionamento & Inteligência Artificial para Advogados</p>
        </div>

        {/* Link list */}
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
                  <div className="absolute top-2.5 left-2.5 z-10 bg-[#C8A45A] text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-lg">
                    {link.badge}
                  </div>
                )}
                <img
                  src={link.image}
                  alt={link.title}
                  className="link-img"
                  loading="lazy"
                />
                {/* Hover shimmer */}
                <div className="link-shimmer" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="links-footer">
          <span>@leocauchiolli</span>
          <span className="links-dot">·</span>
          <span>Todos os Direitos Reservados</span>
        </footer>
      </main>
    </div>
  );
}
