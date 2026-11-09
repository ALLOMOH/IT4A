import { Link } from "react-router-dom";
import { ArrowUp, Phone, Mail} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Trace } from "./Trace";
import { lenisRef } from "../lib/lenis";
// Pied de page marine dans les deux modes, avec les deux bureaux.
export const Footer = () => {
  const { t } = useLanguage();
  const f = t.x.footer;
  const links = [
    { to: "/", label: t.nav.home, id: "home" },
    { to: "/a-propos", label: t.nav.about, id: "about" },
    { to: "/services", label: t.nav.services, id: "services" },
    { to: "/expertises", label: t.nav.expertises, id: "expertises" },
    { to: "/references", label: t.nav.references, id: "references" },
    { to: "/contact", label: t.nav.contact, id: "contact" },
  ];
  const toTop = () => (lenisRef.current ? lenisRef.current.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }));
  const pin = <span className="size-2.5 rounded-full bg-brand ring-2 ring-band-ink/90" aria-hidden="true" />;

  return (
    <footer data-testid="main-footer" className="relative overflow-hidden bg-band text-band-ink border border-t-amber-300 border-dashed border-primary/10  ">
      <div style={{
        makeImage: "radial-gradient(ellipse 90% 80% at 50% 30%, black 50%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 50% 80% at 50% 30%, black 50%, transparent 90%)",
      }} className="absolute inset-0 border top-0 pointer-events-none bg-[url(/image/motif-transparent.png)] bg-no-repeat bg-top bg-cover opacity-10"/>
      <Trace animate={false} id="foot" className="pointer-events-none absolute left-0 top-16 h-12 w-[42%] text-brand/70 hidden md:block" />
      <div className="shell relative pt-16 sm:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-b border-white/10 pb-12 md:pt-14">
          <p className="font-heading text-[2rem] sm:text-5xl font-bold leading-[1.05] font-stretch-112% tracking-[-0.02em] max-w-3xl">
            {t.footer.motto}
          </p>
          <p className="text-sm font-semibold text-brand shrink-0">{t.home.badge}</p>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          <div>
            <img src="/brand/logo-h-dark.png" alt="IT Experts 4 Africa" className="h-11 w-auto" width="872" height="324" />
            <p className="mt-6 text-[15px] text-band-soft leading-relaxed max-w-xs">{t.footer.tagline}</p>
          </div>

          <nav aria-label={t.footer.navTitle}>
            <h3 className="text-sm font-semibold mb-4 [font-stretch:100%] tracking-normal">{t.footer.navTitle}</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-2.5">
              {links.map((l) => (
                <li key={l.id}>
                  <Link to={l.to} data-testid={`footer-nav-${l.id}-link`} className="text-[15px] text-band-soft hover:text-band-ink transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="flex items-center gap-2.5 text-sm font-semibold mb-4 [font-stretch:100%] tracking-normal">{pin}{f.abidjan}</h3>
            <ul className="space-y-2.5 text-[15px] text-band-soft">
              <li>{f.abidjanAddr}</li>
              <li>
                <a href="tel:+2250748290303" data-testid="footer-phone-link" className="inline-flex items-center gap-2 hover:text-band-ink transition-colors">
                  <Phone className="size-4 text-brand" />+225 07 48 29 03 03
                </a>
              </li>
              <li>
                <a href="mailto:contact@itexperts4africa.com" data-testid="footer-email-link" className="inline-flex items-center gap-2 hover:text-band-ink transition-colors break-all">
                  <Mail className="size-4 text-brand shrink-0" />contact@itexperts4africa.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2.5 text-sm font-semibold mb-4 [font-stretch:100%] tracking-normal">{pin}{f.maurice}</h3>
            <ul className="space-y-2.5 text-[15px] text-band-soft">
              {f.mauriceAddr.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 py-6 text-[13px] text-band-soft">
          <p>{t.footer.rights}</p>
          <button onClick={toTop} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-band-ink hover:border-white/40 transition-colors">
            <ArrowUp className="size-4" />
            {f.top}
          </button>
        </div>
      </div>
    </footer>
  );
};
