import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Rocket, Users, Infinity as InfinityIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal, SectionHeading } from "../components/Reveal";
import { Trace } from "../components/Trace";
import { CLIENT_LOGOS } from "../i18n/translations";
import { RotatingHeadline } from "../components/RotatingHeadline";
import { ClientLogo } from "../components/ClientLogo";
import { GridBackground } from "../components/GridBackground";
import { CountUp } from "../components/CountUp";
import { DomainCarousel } from "../components/DomainCarousel";
import { AfricaMap } from "../components/AfricaMap";
import { MethodTimeline } from "../components/MethodTimeline";
// import { CaseCard } from "../components/CaseCard";
import { CtaSection } from "../components/CtaSection";

const ease = [0.22, 1, 0.36, 1];

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section data-testid="hero-section" className="relative overflow-hidden pt-[100px] lg:pt-[140px] pb-16 lg:pb-24">
    <GridBackground />
      <div className="shell relative grid lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        <div className="lg:col-span-6 relative z-2">
          {/* Les lignes du logo, prolongées jusqu'au bord de l'écran */}
          <div className="relative h-12 sm:h-14 mb-8 sm:mb-10">
            <Trace
              id="hero"
              className="absolute top-0 right-[6%] h-full text-ink"
              style={{ width: "calc(94% + max(1rem, (100vw - 76rem) / 2 + 2.5rem))" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative text-[15px] font-semibold text-mark mb-5"
            data-testid="hero-badge"
          >
            {t.home.badge}
          </motion.p>

          <RotatingHeadline
            before={t.home.heroTitle.before}
            words={t.home.heroTitle.words}
            after={t.home.heroTitle.after}
            className="font-heading font-bold text-ink leading-[1.5] [font-stretch:112%] tracking-[-0.025em] text-[1.3rem] md:text-xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="mt-7 md:text-lg text-sm text-ink-soft leading-relaxed max-w-xl"
            data-testid="hero-subtitle"
          >
            {t.home.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link to="/contact" data-testid="hero-cta-primary" className="btn btn-primary group">
              {t.home.ctaPrimary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/services" data-testid="hero-cta-secondary" className="btn btn-ghost">
              {t.home.ctaSecondary}
            </Link>
          </motion.div>

          {/* Trois chiffres rapides */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-12 grid grid-cols-3 max-w-md"
          >
            {t.x.quick.map((q, i) => (
              <div key={q.label} className={`pr-3 sm:pr-6 ${i ? "pl-3 sm:pl-6 border-l border-line" : ""}`}>
                <dt className="sr-only">{q.label}</dt>
                <dd className="font-heading text-[1.5rem] sm:text-[1.75rem] font-bold leading-none font-stretch-115% text-ink">
                  <CountUp value={q.value} />
                </dd>
                <dd className="mt-1.5 text-[13px] sm:text-sm leading-snug text-ink-soft">{q.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="lg:col-span-6 lg:pl-2 xl:-mr-8 relative z-2"
        >
          <AfricaMap  />
        </motion.div>
      </div>
        
    </section>
  );
};

const ClientsMarquee = () => {
  const { t } = useLanguage();
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section data-testid="clients-marquee-section" className="border-y border-line bg-card">
      <div className="shell py-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
        <p className="shrink-0 text-sm font-semibold text-ink-soft">{t.home.clientsLabel}</p>
        <div className="marquee-mask overflow-hidden flex-1">
          <ul className="flex w-max animate-marquee gap-4 pr-4 hover:paused">
            {doubled.map((c, i) => (
              <li key={i} data-testid={`client-logo-${i}`} aria-hidden={i >= CLIENT_LOGOS.length ? "true" : undefined}>
                <ClientLogo name={c.name} src={c.src} dark={c.dark} className="h-16 w-36" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// Chiffres clés en mosaïque de cartes de tailles différentes
const Stats = () => {
  const { t } = useLanguage();
  const s = t.home.stats;
  const b = t.x.bento;
  const tile = "rounded-[20px] p-6 sm:p-7 flex flex-col justify-between gap-6 min-h-[200px]";
  const num = "font-heading font-bold leading-none [font-stretch:115%] tracking-[-0.02em]";
  return (
    <section data-testid="stats-section" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading label={t.home.statsLabel} title={t.home.statsTitle} />
        <Reveal className="mt-12">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-12 lg:grid-rows-[230px_230px]">
            {/* Photo + ingénieurs */}
            <div data-testid="stat-card-2" className="relative col-span-2 lg:col-span-5 lg:row-span-2 min-h-[340px] overflow-hidden rounded-[20px]">
              <img src="/image/opt-team.webp" alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1824]/90 via-[#0b1824]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
                <p className={`${num} text-6xl`}><CountUp value={s[2].value} /></p>
                <p className="mt-3 max-w-sm text-white/85">{b.photo}</p>
              </div>
            </div>
            {/* +15 */}
            <div data-testid="stat-card-0" className={`${tile} relative overflow-hidden col-span-2 lg:col-span-4 bg-band text-band-ink`}>
              <Trace animate={false} id="bento" className="absolute right-6 top-8 h-10 w-40 text-brand" />
              <p className={`${num} text-6xl`}><CountUp value={s[0].value} /></p>
              <p className="max-w-[16rem] text-band-soft">{s[0].label}</p>
            </div>
            {/* 100% */}
            <div data-testid="stat-card-4" className={`${tile} col-span-2 sm:col-span-1 lg:col-span-3 bg-card border border-line`}>
              <div>
                <p className={`${num} text-5xl text-ink`}><CountUp value={s[4].value} /></p>
                <div className="mt-4 h-1.5 rounded-full bg-card-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-brand"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease }}
                  />
                </div>
              </div>
              <p className="text-ink-soft">{s[4].label}</p>
            </div>
            {/* +12 */}
            <div data-testid="stat-card-5" className={`${tile} col-span-2 sm:col-span-1 lg:col-span-3 bg-card border border-line`}>
              <div>
                <p className={`${num} text-5xl text-ink`}><CountUp value={s[5].value} /></p>
                <p className="mt-2 text-ink-soft">{s[5].label}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {b.chips.map((c) => (
                  <li key={c} className="rounded-full bg-card-2 px-2.5 py-1 text-[13px] text-ink">{c}</li>
                ))}
              </ul>
            </div>
            {/* 4 ans */}
            <div data-testid="stat-card-1" className={`${tile} lg:col-span-2 bg-card-2`}>
              <p className={`${num} text-5xl text-ink`}><CountUp value={s[1].value} /></p>
              <p className="text-ink-soft">{b.years}</p>
            </div>
            {/* 2 entités */}
            <div data-testid="stat-card-3" className={`${tile} lg:col-span-2 bg-card border border-line`}>
              <p className={`${num} text-5xl text-ink`}><CountUp value={s[3].value} /></p>
              <p className="text-ink-soft">{b.entities}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Domains = () => {
  const { t } = useLanguage();
  return (
    <section data-testid="domains-section" className="pb-20 sm:pb-28">
      <div className="shell">
        <SectionHeading label={t.home.domainsLabel} title={t.home.domainsTitle} />
      </div>
      <div className="mt-6">
        <DomainCarousel />
      </div>
    </section>
  );
};

const Method = () => {
  const { t } = useLanguage();
  const m = t.x.method;
  return (
    <section data-testid="method-section" className="py-20 sm:py-28 bg-card border-y border-line">
      <div className="shell">
        <SectionHeading label={m.label} title={m.title} sub={m.sub} />
        <div className="mt-14">
          <MethodTimeline />
        </div>
      </div>
    </section>
  );
};

const Cases = () => {
  const { t } = useLanguage();
  const c = t.references.cases;
  const pick = [c[0], c[2], c[3]];
  return (
    <section data-testid="cases-section" className="py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading label={t.x.cases.label} title={t.x.cases.title} />
          <Reveal>
            <Link to="/references" className="btn btn-ghost group shrink-0">
              {t.x.cases.all}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
          <Reveal className="lg:row-span-2">
            <CaseCard c={pick[0]} featured />
          </Reveal>
          <Reveal delay={0.06}>
            <CaseCard c={pick[1]} />
          </Reveal>
          <Reveal delay={0.12}>
            <CaseCard c={pick[2]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const whyIcons = [Rocket, Users, InfinityIcon];

const WhyUs = () => {
  const { t } = useLanguage();
  return (
    <section data-testid="why-us-section" className="py-20 sm:py-28 bg-card border-y border-line">
      <div className="shell grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:col-span-5">
          <figure className="relative overflow-hidden rounded-[20px]">
            <img src="/image/domains/d5.webp" alt="" className="w-full aspect-[5/6] object-cover" loading="lazy" />
            <figcaption className="absolute left-5 bottom-5 flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-[0_12px_32px_-10px_rgb(19_38_58/0.35)]">
              <span className="size-2.5 rounded-full bg-brand" />
              <span>
                <span className="block text-sm font-semibold text-ink">{t.x.why.badgeTitle}</span>
                <span className="block text-[13px] text-ink-soft">{t.x.why.badgeSub}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHeading label={t.home.whyLabel} title={t.home.whyTitle} />
          <div className="mt-8 border-t border-line">
            {t.home.whyCards.map((c, i) => {
              const Icon = whyIcons[i];
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div data-testid={`why-card-${i}`} className="flex gap-5 py-6 border-b border-line">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-on-brand">
                      <Icon className="size-[22px]" strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold leading-snug text-ink">{c.title}</h3>
                      <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <ClientsMarquee />
      <Stats />
      <Domains />
      <Method />
      {/* <Cases /> */}
      <WhyUs />
      <CtaSection />
    </>
  );
}
