import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const IMAGES = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => `/image/domains/d${i}.webp`);

// Carrousel des domaines : défilement continu en boucle, on peut aussi glisser au doigt
// ou utiliser les flèches. La liste déborde jusqu'au bord de l'écran.
export const DomainCarousel = () => {
  const { t } = useLanguage();
  const domains = t.expertises.domains;
  const scroller = useRef(null);
  const [active, setActive] = useState(0);
  const pos = useRef(0); // position voulue, en pixels (peut être décimale)
  const paused = useRef(false);
  const visible = useRef(true);

  // Largeur d'une copie complète de la liste (les cartes sont affichées deux fois pour boucler sans saut).
  const loopWidth = useCallback(() => {
    const el = scroller.current;
    if (!el) return 0;
    const items = el.children;
    return items[domains.length] ? items[domains.length].offsetLeft - items[0].offsetLeft : 0;
  }, [domains.length]);

  const cardWidth = () => {
    const card = scroller.current?.querySelector("li");
    return card ? card.getBoundingClientRect().width + 16 : 300;
  };

  // Défilement continu, comme le bandeau des logos clients.
  // Il s'arrête au survol, au toucher, et quand le carrousel n'est pas à l'écran.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    io.observe(el);
    let raf;
    let last = performance.now();
    const SPEED = 32; // pixels par seconde
    const tick = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      const half = loopWidth();
      if (!paused.current && visible.current && document.visibilityState === "visible" && half > 0) {
        pos.current += (SPEED * dt) / 1000;
        if (pos.current >= half) pos.current -= half;
        el.scrollLeft = pos.current;
      } else {
        pos.current = el.scrollLeft;
      }
      if (half > 0) setActive(Math.round((pos.current % half) / cardWidth()) % domains.length);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [loopWidth, domains.length]);

  const pause = () => { paused.current = true; };
  const resume = () => { pos.current = scroller.current?.scrollLeft ?? pos.current; paused.current = false; };

  // Les flèches avancent ou reculent d'une carte, puis le défilement reprend.
  const step = (dir) => {
    const el = scroller.current;
    if (!el) return;
    paused.current = true;
    const half = loopWidth();
    if (dir < 0 && el.scrollLeft < cardWidth() && half) el.scrollLeft += half;
    el.scrollBy({ left: dir * cardWidth(), behavior: "smooth" });
    setTimeout(() => { if (el.scrollLeft >= half && half) el.scrollLeft -= half; resume(); }, 700);
  };

  const arrow =
    "grid size-11 place-items-center rounded-full border border-line bg-card text-ink transition-colors hover:border-ink-soft disabled:opacity-35 disabled:pointer-events-none";

  return (
    <div>
      <div className="shell flex justify-end gap-2 -mt-2 mb-6">
        <button type="button" onClick={() => step(-1)} aria-label={t.home.prev} className={arrow}>
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label={t.home.next} className={arrow}>
          <ChevronRight className="size-5" />
        </button>
      </div>

      <ul
        ref={scroller}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={() => setTimeout(resume, 2500)}
        onFocus={pause}
        onBlur={resume}
        data-lenis-prevent-horizontal
        className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          px-[max(1rem,calc((100vw-76rem)/2+1rem))] sm:px-[max(1.5rem,calc((100vw-76rem)/2+1.5rem))] lg:px-[max(2.5rem,calc((100vw-76rem)/2+2.5rem))]
          scroll-px-[max(1rem,calc((100vw-76rem)/2+1rem))] sm:scroll-px-[max(1.5rem,calc((100vw-76rem)/2+1.5rem))] lg:scroll-px-[max(2.5rem,calc((100vw-76rem)/2+2.5rem))]"
      >
        {[...domains, ...domains].map((d, k) => {
          const i = k % domains.length;
          const copy = k >= domains.length;
          return (
          <li key={k} aria-hidden={copy ? "true" : undefined} className="shrink-0 w-[78vw] sm:w-[340px] lg:w-[360px]">
            <Link
              to={`/expertises?domaine=${i}`}
              tabIndex={copy ? -1 : undefined}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-card-2"
            >
              <img
                src={IMAGES[i]}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1824]/90 via-[#0b1824]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="font-heading text-2xl font-bold leading-tight">{d.label}</h3>
                <p className="mt-2 text-[15px] text-white/80 leading-snug line-clamp-2">{d.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  {t.home.domainsLink}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </li>
          );
        })}
      </ul>

      {/* Indicateur de position : le trait jaune montre la carte affichée */}
      <div className="shell mt-6 flex items-center gap-1.5" aria-hidden="true">
        {domains.map((d, i) => (
          <span
            key={d.label}
            className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-brand" : "w-2 bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
};
