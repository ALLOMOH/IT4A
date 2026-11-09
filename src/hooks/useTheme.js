import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    console.log(root);
    const read = () => setTheme(root.classList.contains("dark") ? "dark" : "light");

    read(); // valeur initiale
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
};