import { Eye, Target, Gem, Award, ShieldCheck, HeartHandshake, Ear } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Reveal, SectionHeading, SectionLabel, PageHero } from "../components/Reveal";
import { Trace } from "../components/Trace";
import { CtaSection } from "../components/CtaSection";

const engagementIcons = [Target, ShieldCheck, HeartHandshake, Award];
const valueIcons = [Gem, ShieldCheck, HeartHandshake, Ear];

// Le constat fondateur, mis en avant comme une citation, à côté de la photo de l'équipe
const Story = () => {
  const { t } = useLanguage();
  const [intro, insight, how] = t.about.story;
  return (
    <section data-testid="story-section" className="py-20 sm:py-28">
      <div className="shell grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:col-span-7">
          <SectionLabel className="mb-6">{t.x.about.quoteLabel}</SectionLabel>
          <blockquote className="relative mt-12">
            <span aria-hidden="true" className="absolute -left-1 -top-10 font-heading text-[7rem] leading-none text-brand select-none">“</span>
            <p className="relative font-heading text-[1.6rem] sm:text-3xl lg:text-[2.35rem] font-bold leading-[1.2] tracking-[-0.015em] text-ink">
              {insight}
            </p>
          </blockquote>
          <div className="mt-10 grid sm:grid-cols-2 gap-6 border-t border-line pt-8">
            <p className="text-[16px] text-ink-soft leading-relaxed">{intro}</p>
            <p className="text-[16px] text-ink-soft leading-relaxed">{how}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <figure className="relative">
            <img src="/image/opt-team.webp" alt={t.x.about.teamAlt} className="w-full aspect-[4/5] object-cover rounded-[20px]" loading="lazy" />
            <span className="absolute -left-3 top-12 hidden lg:block h-24 w-3 rounded-l-sm bg-brand" aria-hidden="true" />
          </figure>
        </Reveal>
      </div>
    </section>
  );
};

const VisionMission = () => {
  const { t } = useLanguage();
  return (
    <section className="pb-20 sm:pb-28">
      <div className="shell grid md:grid-cols-2 gap-4">
        <Reveal>
          <div data-testid="vision-card" className="relative h-full overflow-hidden rounded-3xl bg-band text-band-ink p-8 sm:p-10 min-h-[280px] flex flex-col justify-between gap-10">
            <Trace animate={false} id="vision" className="absolute right-8 top-10 h-10 w-44 text-brand" />
            <Eye className="size-8 text-brand" strokeWidth={1.6} />
            <div>
              <h2 className="font-heading text-sm font-semibold text-band-soft [font-stretch:100%] tracking-normal">{t.about.visionLabel}</h2>
              <p className="mt-3 font-heading text-2xl sm:text-[1.75rem] font-bold leading-snug">{t.about.vision}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div data-testid="mission-card" className="h-full rounded-3xl border border-line bg-card p-8 sm:p-10 min-h-[280px] flex flex-col justify-between gap-10">
            <Target className="size-8 text-mark" strokeWidth={1.6} />
            <div>
              <h2 className="font-heading text-sm font-semibold text-ink-soft [font-stretch:100%] tracking-normal">{t.about.missionLabel}</h2>
              <p className="mt-3 font-heading text-2xl sm:text-[1.75rem] font-bold leading-snug text-ink">{t.about.mission}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Engagement = () => {
  const { t } = useLanguage();
  return (
    <section data-testid="engagement-section" className="py-20 sm:py-28 bg-card border-y border-line">
      <div className="shell">
        <SectionHeading label={t.about.engagementLabel} title={t.about.engagementTitle} />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {t.about.engagements.map((e, i) => {
            const Icon = engagementIcons[i];
            return (
              <Reveal key={i} delay={i * 0.06}>
                <article data-testid={`engagement-card-${i}`} className="h-full">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand text-on-brand">
                    <Icon className="size-[22px]" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-6 font-heading text-xl font-bold text-ink">{e.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">{e.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Values = () => {
  const { t } = useLanguage();
  return (
    <section data-testid="values-section" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading label={t.about.valuesLabel} title={t.about.valuesTitle} sub={t.x.about.valuesSub} />
        <ul className="mt-12 border-t border-line">
          {t.about.values.map((v, i) => {
            const Icon = valueIcons[i];
            return (
              <li key={v} data-testid={`value-tag-${i}`} className="group flex items-center justify-between gap-6 border-b border-line py-6 sm:py-8">
                <span className="font-heading text-[2.4rem] sm:text-6xl lg:text-7xl font-bold leading-none [font-stretch:115%] tracking-[-0.03em] text-ink transition-colors group-hover:text-mark">
                  {v}
                </span>
                <span className="grid size-12 sm:size-14 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-colors group-hover:bg-brand group-hover:border-brand group-hover:text-on-brand">
                  <Icon className="size-5 sm:size-6" strokeWidth={1.7} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero label={t.about.label} title={t.about.title} />
      <Story />
      <VisionMission />
      <Engagement />
      <Values />
      <CtaSection />
    </>
  );
}
