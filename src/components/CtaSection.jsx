import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { Trace } from "./Trace";

// Bloc d'appel à l'action commun à toutes les pages.
export const CtaSection = () => {
  const { t } = useLanguage();
  const c = t.x.cta;
  const rows = [
    { Icon: Phone, label: c.phone, value: "+225 07 48 29 03 03", href: "tel:+2250748290303" },
    { Icon: Mail, label: c.email, value: "contact@itexperts4africa.com", href: "mailto:contact@itexperts4africa.com" },
    { Icon: MapPin, label: c.offices, value: c.officesValue, href: "/contact" },
  ];
  return (
    <section data-testid="cta-banner-section" className="py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-band text-band-ink">
            <Trace animate={false} id="cta" className="pointer-events-none absolute right-0 top-10 h-14 w-[46%] text-brand/80 hidden lg:block" />
            <div className="relative grid lg:grid-cols-12 gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="lg:col-span-7">
                <p className="flex items-center gap-2.5 text-sm font-semibold text-brand">
                  <span className="h-px w-6 bg-gradient-to-r from-transparent to-current" />
                  <span className="size-1.5 rounded-full bg-current" />
                  {c.label}
                </p>
                <h2 className="mt-5 font-heading text-[1.9rem] sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-band-ink">{c.title}</h2>
                <p className="mt-5 text-lg text-band-soft max-w-xl">{c.text}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to="/contact" data-testid="cta-banner-button" className="btn btn-primary group">
                    {c.primary}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a href="tel:+2250748290303" className="btn border border-white/20 text-band-ink hover:border-white/45">
                    {c.call}
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 lg:pt-10">
                <div className="rounded-2xl bg-card text-ink p-5 sm:p-7 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.5)]">
                  <p className="font-heading text-lg font-bold">{c.cardTitle}</p>
                  <ul className="mt-4 divide-y divide-line">
                    {rows.map(({ Icon, label, value, href }) => {
                      const inner = (
                        <>
                          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-on-brand">
                            <Icon className="size-[18px]" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13px] text-ink-soft">{label}</span>
                            <span className="block text-[14px] sm:text-base font-semibold [overflow-wrap:anywhere]">{value}</span>
                          </span>
                        </>
                      );
                      return (
                        <li key={label}>
                          {href.startsWith("/") ? (
                            <Link to={href} className="flex items-center gap-4 py-4 hover:text-mark transition-colors">{inner}</Link>
                          ) : (
                            <a href={href} className="flex items-center gap-4 py-4 hover:text-mark transition-colors">{inner}</a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
