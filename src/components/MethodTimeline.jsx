import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

// Frise des 5 étapes, reliée par une ligne comme les traits "circuit" du logo.
// La ligne jaune avance avec le défilement : horizontale sur ordinateur, verticale sur mobile.
export const MethodTimeline = () => {
  const { t } = useLanguage();
  const m = t.x.method;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const reached = useTransform(scrollYProgress, (v) => v);

  return (
    <div ref={ref}>
      <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-6">
        {/* Rail horizontal (ordinateur) */}
        <span className="hidden lg:block absolute left-0 right-0 top-[21px] h-0.5 bg-line" aria-hidden="true" />
        <motion.span style={{ width: fill }} className="hidden lg:block absolute left-0 top-[21px] h-0.5 bg-brand" aria-hidden="true" />
        {/* Rail vertical (mobile) */}
        <span className="lg:hidden absolute left-[21px] top-2 bottom-8 w-0.5 bg-line" aria-hidden="true" />
        <motion.span style={{ height: fill }} className="lg:hidden absolute left-[21px] top-2 w-0.5 bg-brand max-h-[calc(100%-2.5rem)]" aria-hidden="true" />

        {m.steps.map((s, i) => (
          <Step key={s.title} i={i} total={m.steps.length} step={s} progress={reached} />
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap items-center gap-2.5">
        <span className="text-sm font-semibold text-ink-soft mr-1">{m.along}</span>
        {m.transverse.map((x) => (
          <span key={x} className="rounded-full bg-card-2 px-4 py-2 text-sm font-semibold text-ink">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
};

const Step = ({ i, total, step, progress }) => {
  const threshold = i / total;
  const [on, setOn] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setOn(v >= threshold));
  return (
    <li className="relative flex gap-5 lg:block pb-8 lg:pb-0">
      <span
        className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 text-sm font-bold transition-colors duration-300 ${
          on ? "bg-brand border-brand text-on-brand" : "bg-card border-line text-ink-soft"
        }`}
      >
        {i + 1}
      </span>
      <div className="pt-1.5 lg:pt-6">
        <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug text-ink">{step.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{step.text}</p>
      </div>
    </li>
  );
};
