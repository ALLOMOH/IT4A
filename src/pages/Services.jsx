import { Link } from "react-router-dom";
import { Compass, Ruler, ClipboardCheck, ServerCog, Activity, Users, GraduationCap, Code2, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal, SectionHeading, PageHero } from "../components/Reveal";
import { MethodTimeline } from "../components/MethodTimeline";
import { CtaSection } from "../components/CtaSection";

const serviceIcons = [Compass, Ruler, ClipboardCheck, ServerCog, Activity, Users, GraduationCap, Code2];

export default function Services() {
  const { t } = useLanguage();
  const sx = t.x.services;
  return (
    <>
      <PageHero label={t.services.label} title={t.services.title} sub={t.services.sub} />

      <section className="py-20 sm:py-28 bg-card border-b border-line">
        <div className="shell">
          <SectionHeading label={sx.coreLabel} title={sx.coreTitle} />
          <div className="mt-14">
            <MethodTimeline />
          </div>
        </div>
      </section>

      <section data-testid="services-grid-section" className="py-20 sm:py-28">
        <div className="shell">
          <SectionHeading label={sx.allLabel} title={sx.allTitle} />
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {t.services.items.map((s, i) => {
              const Icon = serviceIcons[i];
              const transverse = i >= 5;
              return (
                <Reveal key={s.id} delay={(i % 2) * 0.06}>
                  <article
                    data-testid={`service-card-${s.id}`}
                    className="group h-full rounded-2xl border border-line bg-card p-7 sm:p-9 flex flex-col transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink-soft/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-12 place-items-center rounded-xl bg-brand text-on-brand">
                        <Icon className="size-[22px]" strokeWidth={1.9} />
                      </span>
                      {transverse && (
                        <span className="rounded-full bg-card-2 px-3 py-1 text-xs font-semibold text-ink">{sx.transverseTitle}</span>
                      )}
                    </div>
                    <h2 className="mt-7 font-heading text-xl sm:text-[1.5rem] font-bold leading-snug text-ink">{s.title}</h2>
                    <p className="mt-3 text-[15px] text-ink-soft leading-relaxed flex-1">{s.desc}</p>
                    <Link
                      to="/contact"
                      data-testid={`service-cta-${s.id}`}
                      aria-label={`${s.title}, ${t.nav.cta}`}
                      className="mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-ink border-b border-line pb-0.5 transition-colors hover:border-brand"
                    >
                      {t.nav.cta}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
