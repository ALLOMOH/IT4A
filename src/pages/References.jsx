// import { useMemo, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { 
  // Reveal, 
  // SectionHeading, 
  SectionLabel, PageHero } from "../components/Reveal";
import { CLIENT_LOGOS, CLIENTS_WITHOUT_LOGO } from "../i18n/translations";
import { ClientLogo } from "../components/ClientLogo";
// import { CaseCard } from "../components/CaseCard";
import { CtaSection } from "../components/CtaSection";

const LogoGrid = () => {
  const { t } = useLanguage();
  return (
    <section data-testid="clients-grid-section" className="py-16 sm:py-24">
      <div className="shell">
        <SectionLabel className="mb-8">{t.references.clientsLabel}</SectionLabel>
        <div className="overflow-hidden rounded-2xl border border-line bg-card">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 -mr-px -mb-px">
            {CLIENT_LOGOS.map((c, i) => (
              <li key={c.name} data-testid={`client-card-${i}`} className="flex items-center justify-center border-r border-b border-line p-5 sm:p-6">
                <ClientLogo name={c.name} src={c.src} dark={c.dark} className="h-20 w-full max-w-48" />
              </li>
            ))}
            {CLIENTS_WITHOUT_LOGO && CLIENTS_WITHOUT_LOGO.map((c) => (
              <li key={c} className="grid place-items-center border-r border-b border-line px-4 py-9 text-center font-heading text-lg sm:text-xl font-semibold font-stretch-112% text-ink-soft">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// const CaseStudies = () => {
//   const { t } = useLanguage();
//   const cases = t.references.cases;
//   const tags = useMemo(() => [...new Set(cases.map((c) => c.tag))], [cases]);
//   const [tag, setTag] = useState(null);
//   const shown = tag ? cases.filter((c) => c.tag === tag) : cases;
//   const chip = (on) =>
//     `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${on ? "bg-ink text-paper" : "bg-card-2 text-ink hover:bg-line"}`;
//   return (
//     <section data-testid="case-studies-section" className="py-20 sm:py-28 bg-card border-t border-line">
//       <div className="shell">
//         <SectionHeading label={t.references.casesLabel} title={t.references.casesTitle} />
//         <Reveal>
//           <div className="mt-10 flex flex-wrap gap-2" role="group">
//             <button className={chip(!tag)} onClick={() => setTag(null)} aria-pressed={!tag}>{t.x.references.filterAll}</button>
//             {tags.map((g) => (
//               <button key={g} className={chip(tag === g)} onClick={() => setTag(g)} aria-pressed={tag === g}>{g}</button>
//             ))}
//           </div>
//         </Reveal>
//         <motion.div layout className="mt-8 grid md:grid-cols-2 gap-4">
//           <AnimatePresence mode="popLayout">
//             {shown.map((c, i) => (
//               <motion.div
//                 key={c.title}
//                 layout
//                 initial={{ opacity: 0, scale: 0.98 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.98 }}
//                 transition={{ duration: 0.25 }}
//                 data-testid={`case-card-${i}`}
//               >
//                 <CaseCard c={c} featured={!tag && i === 0} />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

export default function References() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero label={t.references.label} title={t.references.title} sub={t.references.sub} />
      <LogoGrid />
      {/* <CaseStudies /> */}
      <CtaSection />
    </>
  );
}
