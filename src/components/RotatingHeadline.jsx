import { useEffect, useRef, useState } from "react";

// Titre fixe avec un seul mot qui change : il s'écrit, reste affiché, s'efface,
// puis le synonyme suivant s'écrit à sa place.
// Le mot a sa propre ligne : quand il change de longueur, le reste du titre ne bouge pas.

const TYPE_MS = 75; // vitesse de frappe (par lettre)
const TYPE_JITTER = 45; // petite variation pour un rythme naturel
const DELETE_MS = 38; // l'effacement est plus rapide que la frappe
const HOLD_MS = 2200; // temps d'affichage du mot complet
const GAP_MS = 320; // pause entre l'effacement et le mot suivant

export const RotatingHeadline = ({ before, words, after, className = "" }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting
  const [running, setRunning] = useState(true);
  const ref = useRef(null);

  // Repart du premier mot quand la langue change.
  useEffect(() => {
    setIndex(0);
    setText("");
    setPhase("typing");
  }, [words]);

  // Met en pause quand le titre n'est pas visible (onglet caché ou page défilée plus bas).
  useEffect(() => {
    const el = ref.current;
    let inView = true;
    const update = () => setRunning(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    if (el) io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const word = words[index % words.length];
    let timer;

    if (phase === "typing") {
      if (text.length < word.length) {
        const delay = (text.length === 0 ? 250 : 0) + TYPE_MS + Math.random() * TYPE_JITTER;
        timer = setTimeout(() => setText(word.slice(0, text.length + 1)), delay);
      } else {
        timer = setTimeout(() => setPhase("deleting"), HOLD_MS);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      } else {
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, GAP_MS);
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, index, words, running]);

  const idle = phase === "typing" && text.length === words[index % words.length].length;

  return (
    <h1 ref={ref} className={className} aria-label={`${before} ${words[0]} ${after}`}>
      <span aria-hidden="true">
        <span className="block">{before}</span>
        <span className="block whitespace-nowrap">
          <span className="relative inline-block">
            {text || "​"}
            {/* Trait jaune sous le mot : il suit la longueur du mot */}
            <span
              className="absolute left-0 right-0 -bottom-[0.02em] h-[0.09em] rounded-full bg-brand origin-left transition-transform duration-300"
              style={{ transform: text ? "scaleX(1)" : "scaleX(0)" }}
            />
          </span>
          <span
            className={`caret inline-block w-[0.06em] h-[0.78em] ml-[0.06em] -mb-[0.04em] rounded-[1px] bg-brand ${
              idle ? "animate-[caret_1.05s_steps(1)_infinite]" : ""
            }`}
          />
        </span>
        <span className="block">{after}</span>
      </span>
    </h1>
  );
};
