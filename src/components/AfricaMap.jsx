import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

// Carte de l'Afrique en points, calculée à partir d'un masque des terres émergées
// (pas de 1,2° en latitude et en longitude). Chaque ligne liste les plages de colonnes
// qui sont sur la terre ferme. Une colonne = 9,17 px dans le repère 600 x 600.
const ROWS = [[[14,14]],[[17,24]],[[11,12],[15,24],[36,36],[43,43]],[[10,23]],[[8,25],[34,34]],[[8,28],[33,37]],[[8,30],[32,42]],[[7,43]],[[5,43]],[[5,43]],[[4,44]],[[3,44]],[[2,45]],[[2,46]],[[2,46]],[[2,46]],[[3,47]],[[2,47]],[[2,48]],[[1,49]],[[2,50]],[[2,51]],[[3,51],[56,57]],[[4,57]],[[5,57]],[[6,56]],[[7,56]],[[8,11],[13,14],[20,55]],[[24,55]],[[24,54]],[[24,52]],[[24,51]],[[23,50]],[[24,49]],[[25,48]],[[26,48]],[[26,47]],[[26,48]],[[27,48]],[[27,48]],[[27,49]],[[27,49]],[[27,49],[53,53]],[[26,49],[56,57]],[[26,49],[55,57]],[[26,48],[53,56]],[[26,46],[53,56]],[[26,45],[53,56]],[[27,44],[53,56]],[[27,44],[52,55]],[[28,45],[52,55]],[[28,44],[52,55]],[[28,44],[53,54]],[[28,42]],[[29,42]],[[29,42]],[[30,41]],[[31,40]],[[31,39]],[[31,38]],[[32,32]]];
const STEP = 9.17;
// Tous les points dans un seul tracé SVG (bien plus léger à dessiner que 1 778 cercles séparés).
const R = 1.9;
const DOTS_PATH = (() => {
  let d = "";
  ROWS.forEach((row, i) => row.forEach(([a, b]) => {
    for (let j = a; j <= b; j++) {
      const x = j * STEP + 4, y = i * STEP + 4;
      d += `M${(x - R).toFixed(1)} ${y.toFixed(1)}a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 ${-2 * R} 0Z`;
    }
  }));
  return d;
})();

// Positions des villes dans le même repère (projection équirectangulaire).
const CITY = {
  abidjan: [114.8, 250.4],
  cameroun: [219.5, 260.4],
  rdc: [262.4, 324.4],
  maurice: [584.9, 445.8],
};

// Étiquettes : position du coin haut gauche, en pourcentage du cadre.
const LABELS = [
  { key: "abidjan", office: true, left: "-4%", top: "48%" },
  { key: "cameroun", office: false, left: "40%", top: "30%" },
  { key: "rdc", office: false, left: "48%", top: "57%" },
  { key: "maurice", office: true, left: "62%", top: "81%" },
];

const arc = (a, b, lift) => {
  const [ax, ay] = CITY[a];
  const [bx, by] = CITY[b];
  return `M${ax} ${ay}Q${(ax + bx) / 2} ${Math.min(ay, by) - lift} ${bx} ${by}`;
};

const ARCS = [
  { d: arc("abidjan", "cameroun", 46), dashed: false },
  { d: arc("abidjan", "rdc", 90), dashed: false },
  { d: arc("abidjan", "maurice", 210), dashed: true },
];

export const AfricaMap = ({ variant = "full" }) => {
  const officesOnly = variant === "offices";
  const { t } = useLanguage();
  const m = t.x.map;

  return (
    <figure className="relative w-full max-w-[600px] mx-auto" aria-label={m.aria} role="img">
      <div className="relative aspect-square">
        <svg viewBox="0 0 600 600" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <path d={DOTS_PATH} className="text-ink" fill="currentColor" opacity="0.22" />

          {(officesOnly ? [ARCS[2]] : ARCS).map((a, i) => (
            <motion.path
              key={i}
              d={a.d}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={a.dashed ? "2 7" : undefined}
              initial={a.dashed ? { opacity: 0 } : { pathLength: 0 }}
              animate={a.dashed ? { opacity: 1 } : { pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.6 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}

          {Object.entries(CITY).filter(([key]) => !officesOnly || key === "abidjan" || key === "maurice").map(([key, [x, y]]) => {
            const office = key === "abidjan" || key === "maurice";
            return (
              <g key={key}>
                {key === "abidjan" && (
                  <>
                    <circle cx={x} cy={y} r="28" fill="none" stroke="var(--brand)" strokeOpacity="0.35" strokeWidth="1.5" className="map-pulse" />
                    <circle cx={x} cy={y} r="43" fill="none" stroke="var(--brand)" strokeOpacity="0.18" strokeWidth="1.5" className="map-pulse map-pulse-2" />
                  </>
                )}
                <circle cx={x} cy={y} r="15" fill="var(--brand)" fillOpacity="0.25" />
                <circle
                  cx={x}
                  cy={y}
                  r={office ? 6.5 : 5.5}
                  fill="var(--brand)"
                  stroke={office ? "var(--ink)" : "none"}
                  strokeWidth={office ? 3 : 0}
                />
              </g>
            );
          })}
        </svg>

        {LABELS.filter((l) => !officesOnly || l.office).map(({ key, office, left, top }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 + i * 0.12 }}
            className="absolute rounded-xl border border-line bg-card px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-[0_10px_28px_-10px_rgb(19_38_58/0.28)] dark:shadow-[0_10px_28px_-10px_rgb(0_0_0/0.6)]"
            style={{ left, top }}
          >
            <p className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] font-semibold text-ink whitespace-nowrap">
              <span className={`size-1.5 sm:size-[7px] rounded-full ${office ? "bg-ink" : "bg-brand"}`} />
              {m[key].title}
            </p>
            <p className="hidden sm:block mt-0.5 text-[12px] text-ink-soft whitespace-nowrap">{m[key].sub}</p>
          </motion.div>
        ))}
      </div>

      {!officesOnly && <figcaption className="mt-2 flex items-center gap-5 text-[13px] text-ink-soft">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-brand ring-2 ring-ink" />
          {m.offices}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-brand" />
          {m.projects}
        </span>
      </figcaption>}
    </figure>
  );
};
