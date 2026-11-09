import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal, PageHero } from "../components/Reveal";
import { CtaSection } from "../components/CtaSection";

const IMAGES = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => `/image/domains/d${i}.webp`);

export default function Expertises() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const fromLink = parseInt(params.get("domaine") ?? "0", 10);
  const [active, setActive] = useState(
    Number.isInteger(fromLink) && fromLink >= 0 && fromLink < t.expertises.domains.length ? fromLink : 0
  );
  const domain = t.expertises.domains[active];

  return (
    <>
      <PageHero label={t.expertises.label} title={t.expertises.title} sub={t.expertises.sub} />

      <section data-testid="expertises-tabs-section" className="py-16 sm:py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-4">
            <p className="hidden lg:block mb-4 text-sm font-semibold text-ink-soft">
              {t.expertises.domains.length} {t.x.expertises.count}
            </p>
            <div
              className="-mx-4 px-4 sm:mx-0 sm:px-0 flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible lg:border-t lg:border-line [scrollbar-width:none]"
              role="tablist"
              aria-label={t.expertises.label}
            >
              {t.expertises.domains.map((d, i) => {
                const on = active === i;
                return (
                  <button
                    key={d.label}
                    role="tab"
                    aria-selected={on}
                    data-testid={`expertise-tab-${i}`}
                    onClick={() => setActive(i)}
                    className={`relative shrink-0 text-left text-[15px] font-medium transition-colors
                      px-4 py-2.5 rounded-md border lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-4 lg:flex lg:items-center lg:justify-between
                      ${on ? "bg-ink text-paper border-ink lg:bg-transparent lg:text-ink lg:font-semibold" : "border-line text-ink-soft hover:text-ink"}`}
                  >
                    {on && (
                      <motion.span
                        layoutId="exp-active"
                        className="hidden lg:block absolute -left-4 top-3 bottom-3 w-[3px] rounded-full bg-brand"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    {d.label}
                    <ArrowRight className={`hidden lg:block size-4 transition-opacity ${on ? "opacity-100 text-mark" : "opacity-0"}`} />
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="min-w-0 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                data-testid="expertise-panel"
                role="tabpanel"
                className="overflow-hidden rounded-3xl border border-line bg-card"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/8] bg-card-2">
                  <img src={IMAGES[active]} alt="" className="absolute inset-0 size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1824]/80 via-transparent to-transparent" />
                  <h2 className="absolute left-6 sm:left-9 bottom-5 sm:bottom-7 font-heading text-2xl sm:text-4xl font-bold text-white leading-tight pr-6">
                    {domain.label}
                  </h2>
                </div>
                <div className="p-6 sm:p-9">
                  <p className="text-lg text-ink-soft leading-relaxed max-w-2xl">{domain.desc}</p>
                  <ul className="mt-7 grid sm:grid-cols-2 gap-3">
                    {domain.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-3 rounded-xl bg-card-2 px-4 py-3.5 text-ink" data-testid={`expertise-bullet-${i}`}>
                        <span className="grid size-6 place-items-center rounded-full bg-brand text-on-brand shrink-0">
                          <Check className="size-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="text-[15px] font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn btn-primary group mt-8">
                    {t.x.expertises.see}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
