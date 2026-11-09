import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);
const STORAGE_KEY = "it4a-theme";

const readInitial = () => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

// Change la classe sur <html> en coupant toutes les transitions CSS le temps du changement.
// Sans ça, des centaines d'éléments animent leur couleur chacun à leur rythme et la page saccade.
const applyTheme = (next) => {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.classList.toggle("dark", next === "dark");
  // Deux images plus tard, on rend les transitions (le navigateur a fini de repeindre).
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readInitial);

  // Suit le réglage du système tant que le visiteur n'a pas choisi lui-même.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      let saved = null;
      try { saved = localStorage.getItem(STORAGE_KEY); } catch { /* stockage indisponible */ }
      if (!saved) {
        const next = e.matches ? "dark" : "light";
        applyTheme(next);
        setTheme(next);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Bascule clair / sombre : la nouvelle couleur s'ouvre en cercle à partir du bouton cliqué.
  // Le navigateur fait l'animation sur une image figée de la page, donc elle reste fluide.
  const toggle = useCallback((event) => {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* stockage indisponible */ }

    const swap = () => { applyTheme(next); flushSync(() => setTheme(next)); };
    if (!document.startViewTransition) { swap(); return; }

    const x = event?.clientX ?? window.innerWidth - 60;
    const y = event?.clientY ?? 60;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(swap);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => {});
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
