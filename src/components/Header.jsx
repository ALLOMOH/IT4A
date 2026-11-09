import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../theme/ThemeContext";
import { lenisRef } from "../lib/lenis";
import { LinkedIn } from "./Logo-socials";

const LangSwitch = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center text-sm font-semibold" data-testid="language-switcher" role="group" aria-label="Langue">
      {["fr", "en"].map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1.5 text-line" aria-hidden="true">/</span>}
          <button
            data-testid={`lang-${l}-button`}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`uppercase py-1 transition-colors ${lang === l ? "text-ink" : "text-ink-soft hover:text-ink"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
};

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      data-testid="theme-toggle"
      aria-label={isDark ? t.nav.toLight : t.nav.toDark}
      title={isDark ? t.nav.toLight : t.nav.toDark}
      className="relative grid size-10 place-items-center rounded-md border border-line text-ink-soft hover:text-ink hover:border-ink-soft transition-colors overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export const Header = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Le header se cache quand on descend et revient dès qu'on remonte (comme sur apple.com).
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 240);
        lastY = y;
      }
    };
    setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu quand on change de page.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [location.pathname]);

  // Bloque le défilement de la page derrière le menu mobile, et Échap le ferme.
  useEffect(() => {
    if (!open) return;
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenisRef.current?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home, id: "home" },
    { to: "/a-propos", label: t.nav.about, id: "about" },
    { to: "/services", label: t.nav.services, id: "services" },
    { to: "/expertises", label: t.nav.expertises, id: "expertises" },
    { to: "/references", label: t.nav.references, id: "references" },
    { to: "/contact", label: t.nav.contact, id: "contact" },
  ];

  const isActive = (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  return (
    <header
      data-testid="main-header"
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${hidden && !open ? "-translate-y-full" : ""}`}
    >
      {/* Bandeau de coordonnées : visible sur grand écran, se replie au défilement */}
      <div
        className={`hidden lg:block bg-band text-band-soft text-[13px] overflow-hidden transition-[height] duration-300 ease-out ${
          scrolled ? "h-0" : "h-9"
        }`}
      >
        <div className="shell h-9 flex items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-brand" />
            {t.nav.offices}
          </span>
          <div className="flex items-center gap-6">
            <a href="tel:+2250748290303" className="inline-flex items-center gap-2 hover:text-band-ink transition-colors">
              <Phone className="size-3.5 text-brand" />
              +225 07 48 29 03 03
            </a>
            <a href="mailto:contact@itexperts4africa.com" className="inline-flex items-center gap-2 hover:text-band-ink transition-colors">
              <Mail className="size-3.5 text-brand" />
              contact@itexperts4africa.com
            </a>
            <a href="https://www.linkedin.com/company/itexperts4africa" rel="noopener" target="_blank" className="inline-flex items-center hover:text-band-ink transition-colors">
                <LinkedIn className="size-3.5 text-brand"/>
            </a>
          </div>
        </div>
      </div>

      {/* Barre principale */}
      <div
        className={`bg-paper/90 backdrop-blur-md border-b transition-[border-color,box-shadow] duration-300 ${
          scrolled || open ? "border-line shadow-[0_8px_24px_-18px_rgb(19_38_58/0.35)]" : "border-transparent"
        }`}
      >
        <div className="shell h-[72px] flex items-center gap-6">
          <Link to="/" data-testid="logo-link" aria-label="IT Experts 4 Africa, accueil" className="shrink-0">
            <Logo className="h-9 sm:h-10" />
          </Link>

          <nav className="hidden lg:flex items-center ml-6 xl:ml-10" aria-label="Navigation principale">
            {links.map((l) => {
              const active = isActive(l.to);
              return (
                <NavLink
                  key={l.id}
                  to={l.to}
                  data-testid={`nav-${l.id}-link`}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 xl:px-3.5 py-2 text-[15px] font-medium transition-colors ${
                    active ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-3 right-3 xl:left-3.5 xl:right-3.5 -bottom-[15px] flex items-center"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    >
                      <span className="h-[2px] flex-1 bg-brand" />
                      <span className="size-[6px] -ml-px rounded-full bg-brand" />
                    </motion.span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:block">
              <LangSwitch />
            </div>
            <ThemeToggle />
            <Link to="/contact" data-testid="header-cta-button" className="btn btn-primary hidden lg:inline-flex !py-3">
              {t.nav.cta}
            </Link>
            <button
              data-testid="mobile-menu-button"
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden grid size-10 place-items-center rounded-md border border-line text-ink"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-testid="mobile-menu-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-paper overflow-y-auto"
          >
            <nav className="shell pt-4 pb-10 flex flex-col min-h-full" aria-label="Navigation mobile">
              <ul>
                {links.map((l, i) => {
                  const active = isActive(l.to);
                  return (
                    <motion.li
                      key={l.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.3 }}
                      className="border-b border-line"
                    >
                      <NavLink
                        to={l.to}
                        data-testid={`mobile-nav-${l.id}-link`}
                        className={`flex items-center justify-between py-4 font-heading text-2xl font-semibold [font-stretch:110%] ${
                          active ? "text-ink" : "text-ink-soft"
                        }`}
                      >
                        {l.label}
                        {active && <span className="size-2 rounded-full bg-brand" />}
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-auto pt-10 space-y-6">
                <div className="flex items-center justify-between">
                  <LangSwitch />
                  <a href="tel:+2250748290303" className="text-sm text-ink-soft">+225 07 48 29 03 03</a>
                </div>
                <Link to="/contact" data-testid="mobile-cta-button" className="btn btn-primary w-full">
                  {t.nav.cta}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
