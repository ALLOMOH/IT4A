import { motion } from "motion/react";
import { Trace, TraceMark } from "./Trace";
import { GridBackground } from "./GridBackground";

// Apparition discrète au défilement : court, une seule fois.
export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionLabel = ({ children, className = "" }) => (
  <p className={`flex items-center gap-2.5 text-sm font-semibold text-mark ${className}`} data-testid="section-label">
    <TraceMark />
    {children}
  </p>
);

export const SectionHeading = ({ label, title, sub, center = false, as: Tag = "h2", big = false }) => (
  <Reveal className={center ? "text-center" : ""}>
    {label && <SectionLabel className={`mb-4 ${center ? "justify-center" : ""}`}>{label}</SectionLabel>}
    <Tag className={`font-heading font-bold text-ink max-w-3xl mx-0 [.text-center_&]:mx-auto ${big ? "text-[2.3rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] [font-stretch:112%] tracking-[-0.025em]" : "text-[1.85rem] sm:text-4xl lg:text-[2.75rem] leading-[1.1]"}`}>
      {title}
    </Tag>
    {sub && (
      <p className={`mt-5 text-lg text-ink-soft leading-relaxed max-w-2xl ${center ? "mx-auto" : ""}`}>{sub}</p>
    )}
  </Reveal>
);

// En-tête commun des pages intérieures : même grille et mêmes lignes "circuit" que l'accueil.
export const PageHero = ({ label, title, sub, children }) => (
  <section className="relative overflow-hidden pt-[100px] lg:pt-[140px] pb-14 sm:pb-20 border-b border-line">
    <GridBackground />
    <div className="shell relative">
      <div className="relative h-10 sm:h-12 mb-8 sm:mb-10">
        <Trace
          id="page"
          className="absolute top-0 right-[30%] h-full text-ink"
          style={{ width: "calc(70% + max(1rem, (100vw - 76rem) / 2 + 2.5rem))" }}
        />
      </div>
      <div className="grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <SectionHeading label={label} title={title} sub={sub} as="h1" big />
        </div>
        {children && <div className="lg:col-span-4">{children}</div>}
      </div>
    </div>
  </section>
);
