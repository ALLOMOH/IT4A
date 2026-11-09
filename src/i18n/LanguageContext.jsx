import { createContext, useContext, useState } from "react";
import { translations } from "./translations";
import { extra } from "./extra";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("fr");
  const t = { ...translations[lang], x: extra[lang] };
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
