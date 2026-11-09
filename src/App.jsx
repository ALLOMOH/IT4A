import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { lenisRef } from "./lib/lenis";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/toast";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Expertises from "./pages/Expertises";
import References from "./pages/References";
import Contact from "./pages/Contact";
import RouteSeo  from "./components/RouteSeo";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const LenisRoot = ({ children }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  return children;
};

const HtmlLang = () => {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HtmlLang />
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <LenisRoot>
              <ScrollToTop />
              <RouteSeo />
              <div className="min-h-screen bg-paper text-ink font-body">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/expertises" element={<Expertises />} />
                    <Route path="/references" element={<References />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster />
              </div>
            </LenisRoot>
          </BrowserRouter>
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
