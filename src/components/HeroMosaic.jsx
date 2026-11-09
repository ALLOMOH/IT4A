import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { CountUp } from "./CountUp";

const ease = [0.22, 1, 0.36, 1];

// Visuel du haut de l'accueil : trois photos des équipes au travail, en mosaïque.
// Les deux colonnes glissent à des vitesses différentes quand on fait défiler (léger effet de profondeur).
export const HeroMosaic = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const stat = t.home.stats[0];

  const tile = "relative overflow-hidden rounded-xl bg-card-2 ring-1 ring-line";
  const img = "absolute inset-0 size-full object-cover";

  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <motion.div
          style={{ y: yLeft }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="space-y-3 sm:space-y-4"
        >
          <div className={`${tile} aspect-[3/4]`}>
            <img src="/image/hero-a.webp" alt="Ingénieurs IT4A en salle serveurs" className={img} fetchPriority="high" />
          </div>
          <div className={`${tile} aspect-[4/3]`}>
            <img src="/image/hero-c.webp" alt="Équipe IT4A sur une baie de brassage" className={img} />
          </div>
        </motion.div>

        <motion.div
          style={{ y: yRight }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="space-y-3 sm:space-y-4 pt-10 sm:pt-16"
        >
          <div className={`${tile} aspect-[4/5]`}>
            <img src="/image/hero-b.webp" alt="Supervision des réseaux et de la sécurité" className={img} />
          </div>

          {/* Carte chiffre : vraie donnée du site (années d'expérience) */}
          <div className="rounded-xl bg-band text-band-ink p-5 sm:p-6">
            <p className="font-heading text-4xl sm:text-5xl font-bold [font-stretch:115%] leading-none">
              <CountUp value={stat.value} />
            </p>
            <p className="mt-3 text-sm text-band-soft leading-snug">{stat.label}</p>
            <span className="mt-4 block h-1 w-10 rounded-full bg-brand" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
