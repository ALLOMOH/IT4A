import { useEffect, useState } from "react";

// Titre écrit lettre par lettre, avec un curseur jaune.
// Le texte complet est réservé dès le départ (invisible) pour que la page ne saute pas.
export const TypeHeadline = ({ text, className = "", speed = 32, startDelay = 450 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    let timer;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = setTimeout(tick, speed + (text[i - 1] === " " ? 20 : 0));
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  const done = count >= text.length;

  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span
          className={`inline-block w-[0.07em] h-[0.82em] ml-[0.04em] -mb-[0.06em] bg-brand align-baseline ${done ? "animate-[caret_1s_steps(1)_infinite]" : ""}`}
        />
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </h1>
  );
};
