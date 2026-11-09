import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

// Compte de 0 jusqu'à la valeur quand le chiffre arrive à l'écran ("+15", "100%", "4"...).
export const CountUp = ({ value, duration = 1.6, className = "" }) => {
  const match = String(value).match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : "";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration, match]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={String(value)}>
      <span aria-hidden="true">{prefix}{n}{suffix}</span>
    </span>
  );
};
