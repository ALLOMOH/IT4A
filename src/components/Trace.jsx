// Les lignes "circuit" qui surmontent le logo IT4A, reprises comme motif.
// Chaque ligne part de la gauche en fondu et se termine par un point.

const LINES = [
  { y: 8, end: 78 },
  { y: 24, end: 97 },
  { y: 40, end: 64 },
  { y: 56, end: 97 },
  { y: 72, end: 86, mid: 58 },
  { y: 90, end: 92, mid: 70 },
];

// Coordonnées en pourcentages : le tracé s'étire en largeur sans déformer les points.
export const Trace = ({ className = "", animate = true, id = "trace", style }) => (
  <svg className={className} style={style} aria-hidden="true" fill="none" overflow="visible">
    <defs>
      <linearGradient id={`${id}-fade`} gradientUnits="userSpaceOnUse" x1="0" x2="100%" y1="0" y2="0">
        <stop offset="0" stopColor="currentColor" stopOpacity="0" />
        <stop offset="0.4" stopColor="currentColor" stopOpacity="0.35" />
        <stop offset="1" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    {LINES.map((l, i) => (
      <g key={i}>
        <line
          x1="0"
          x2={`${l.end}%`}
          y1={`${l.y}%`}
          y2={`${l.y}%`}
          stroke={`url(#${id}-fade)`}
          strokeWidth="1.5"
          pathLength="1"
          className={animate ? "trace-line" : ""}
          style={animate ? { animationDelay: `${0.15 + i * 0.08}s` } : undefined}
        />
        {l.mid && (
          <circle
            cx={`${l.mid}%`}
            cy={`${l.y}%`}
            r="2.5"
            fill="currentColor"
            className={animate ? "trace-dot" : ""}
            style={animate ? { animationDelay: `${0.95 + i * 0.08}s` } : undefined}
          />
        )}
        <circle
          cx={`${l.end}%`}
          cy={`${l.y}%`}
          r="3.5"
          fill="currentColor"
          className={animate ? "trace-dot" : ""}
          style={animate ? { animationDelay: `${1.2 + i * 0.08}s` } : undefined}
        />
      </g>
    ))}
  </svg>
);

// Petit repère : un trait et un point, utilisé devant les intitulés de section.
export const TraceMark = ({ className = "" }) => (
  <span className={`inline-flex items-center ${className}`} aria-hidden="true">
    <span className="h-px w-6 bg-gradient-to-r from-transparent to-current" />
    <span className="size-1.5 rounded-full bg-current" />
  </span>
);
