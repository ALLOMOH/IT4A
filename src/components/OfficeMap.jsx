import { useState } from "react";
import { ExternalLink, Navigation } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../theme/ThemeContext";

// Carte Google Maps des deux bureaux, avec un sélecteur Abidjan / Maurice.
// L'intégration se fait sans clé d'API (lien "output=embed").
const OFFICES = [
  { key: "abidjan", query: "itexperts4africa" },
  { key: "maurice", query: "Avenue des Rosiers, La Preneuse, Rivière Noire, Mauritius" },
];

// En mode sombre, on inverse les couleurs de la carte pour qu'elle ne fasse pas une tache blanche.
const DARK_FILTER = "invert(0.9) hue-rotate(180deg) saturate(0.6) brightness(0.95)";

export const OfficeMap = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const cx = t.x.contact;
  const [active, setActive] = useState(0);
  const office = OFFICES[active];
  const addr = t.contact.addresses[active];
  const q = encodeURIComponent(office.query);

  return (
    <div>
      <div className="flex rounded-full bg-card-2 p-1" role="tablist" aria-label={cx.officesTitle}>
        {OFFICES.map((o, i) => (
          <button
            key={o.key}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
              active === i ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t.contact.addresses[i].city}
          </button>
        ))}
      </div>

      <div className="relative mt-4 aspect-4/3 overflow-hidden rounded-2xl border border-line bg-card-2">
        
          <iframe
            key={office.key}
            title={`${cx.officesTitle} : ${addr.city}`}
            src={`https://www.google.com/maps?q=${q}&z=15&output=embed`}
            className="absolute inset-0 size-full border-0"
            style={{ filter: theme === "dark" ? DARK_FILTER : "none" }}
            referrerPolicy="no-referrer-when-downgrade"
            landing="lazy"
            allowFullScreen
          />
        
        
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noreferrer" className="btn btn-primary py-2.5! px-4! text-sm">
          <Navigation className="size-4" />
          {cx.directions}
        </a>
        <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer" className="btn btn-ghost py-2.5! px-4! text-sm">
          <ExternalLink className="size-4" />
          {cx.openMaps}
        </a>
      </div>
    </div>
  );
};
