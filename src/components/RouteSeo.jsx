import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const SITE = "https://www.itexperts4africa.com";
const IMAGE = `${SITE}/image/it-experts-4-africa-transformation-digitale-esn.jpg`;
const NAME = "IT Experts 4 Africa";

const SEO = {
  "/": {
    fr: { title: `${NAME} | Services informatiques en Afrique francophone`, description: "Infrastructure, développement, cybersécurité et conseil IT pour les entreprises africaines." },
    en: { title: `${NAME} | IT services in French-speaking Africa`, description: "Infrastructure, development, cybersecurity and IT consulting for African businesses." },
  },
  "/a-propos": {
    fr: { title: `À propos | ${NAME}`, description: "Découvrez l'équipe et la mission d'IT Experts 4 Africa." },
    en: { title: `About us | ${NAME}`, description: "Meet the team and mission of IT Experts 4 Africa." },
  },
  "/services": {
    fr: { title: `Nos services | ${NAME}`, description: "Tous nos services informatiques pour accompagner votre entreprise." },
    en: { title: `Our services | ${NAME}`, description: "All our IT services to support your business." },
  },
  "/expertises": {
    fr: { title: `Nos expertises | ${NAME}`, description: "Nos domaines d'expertise technique et sectorielle." },
    en: { title: `Our expertise | ${NAME}`, description: "Our technical and industry expertise." },
  },
  "/references": {
    fr: { title: `Références | ${NAME}`, description: "Nos projets et clients de référence en Afrique." },
    en: { title: `References | ${NAME}`, description: "Our projects and reference clients across Africa." },
  },
  "/contact": {
    fr: { title: `Contact | ${NAME}`, description: "Contactez IT Experts 4 Africa pour votre projet. Réponse rapide." },
    en: { title: `Contact | ${NAME}`, description: "Contact IT Experts 4 Africa for your project. Fast response." },
  },
};

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const RouteSeo = () => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    const page = SEO[path] ?? SEO["/"];
    const { title, description } = page[lang] ?? page.fr;
    const url = `${SITE}${path === "/" ? "/" : path}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", IMAGE);
    setMeta("property", "og:locale", lang === "en" ? "en_US" : "fr_FR");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", IMAGE);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [pathname, lang]);

  return null;
};

export default RouteSeo;