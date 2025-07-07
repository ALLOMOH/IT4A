// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from 'astro:assets';



interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

interface HeaderProps {
  bannerText?: string;
  logo: string;
  navItems: NavItem[];
  ctaButton: {
    label: string;
    onClick: () => void;
  };
  // Vous pouvez ajouter d'autres props si nécessaire
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Header component for the site, featuring a promotional banner, logo, navigation menu (with support for submenus),
 * call-to-action button, and responsive mobile menu with animated transitions.
 *
 * @component
 * @param {HeaderProps} props - The props for the Header component.
 * @param {string} [props.bannerText] - The text to display in the promotional banner. Defaults to a launch offer message.
 * @param {string} props.logo - The source URL for the logo image.
 * @param {Array<NavItem>} props.navItems - The navigation items to display, each potentially with subItems for dropdowns.
 * @param {CtaButton} props.ctaButton - The call-to-action button configuration, including label and onClick handler.
 * @param {string} [props.className] - Additional class names to apply to the header.
 *
 * @returns {JSX.Element} The rendered Header component.
 *
 * @example
 * <Header
 *   logo="/logo.png"
 *   navItems={[
 *     { label: "Home", href: "home" },
 *     { label: "Services", href: "services", subItems: [{ label: "Web", href: "web" }] }
 *   ]}
 *   ctaButton={{ label: "Contact Us", onClick: () => alert("Contact!") }}
 * />
 */
const Header: React.FC<HeaderProps> = ({ 
  bannerText = "🔔 Nouveau ! Profitez de notre offre spéciale de lancement", 
  logo,
  navItems,
  ctaButton,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  // Effet pour gérer le défilement
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Activer l'effet "flottant" après 50px de défilement
      setIsScrolled(scrollPosition > 50);
      
      // Cacher la bannière après .1px de défilement
      setIsBannerVisible(scrollPosition <= .1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gérer le défilement du corps lorsque le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Fonction pour faire défiler vers une section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveSubMenu(null);
    }
  };

  return (
    <header 
      ref={headerRef}
      className={` ${className}  top-0 z-150 w-full transition-all duration-200 bg-transparent
      ${isScrolled ? 'fixed p-5' : 'sticky'}
      `}
    >
      {/* Bannière promotionnelle avec animation de disparition */}
      <AnimatePresence>
        {isBannerVisible && (
          <motion.div
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden"
          >
            <div className="container mx-auto flex items-center justify-center px-4 py-2">
              <span className="mr-2 animate-pulse">✨</span>
              <p className="text-sm md:text-base truncate">{bannerText}</p>
              <button 
                className="ml-4 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
                onClick={ctaButton.onClick}
              >
                Découvrir
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation principale */}
      <nav className={`container mx-auto px-4 ${
        isScrolled 
          ? 'backdrop-blur-xl border border-it4a-secondary shadow py-0 rounded-xl' 
          : 'bg-transparent py-2'
      }`}>
        <div className="flex  items-center justify-between py-3">
          {/* Logo avec transition */}
          <div className="flex items-center">
            <motion.img 
              src={logo} 
              alt="Logo" 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'
              }`}
              whileHover={{ rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            />
          </div>
          
          {/* Navigation desktop */}
          <div className=" hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveSubMenu(item.label)}
                onMouseLeave={() => setActiveSubMenu(null)}
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative py-2"
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full`}></span>
                </motion.button>
                
                {/* Sous-menu */}
                {item.subItems && activeSubMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 mt-1 w-48 bg-white/90 backdrop-blur-lg shadow-lg rounded-xl py-2 z-50 border border-gray-100"
                  >
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={`#${subItem.href}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(subItem.href);
                        }}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          
          {/* Bouton CTA */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={ctaButton.onClick}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg transition-all"
            >
              {ctaButton.label}
            </motion.button>
          </div>
          
          {/* Menu mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-700 p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'top-3'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </motion.button>
        </div>
      </nav>
      
      {/* Menu mobile - Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 h-full w-4/5 bg-white/95 backdrop-blur-xl shadow-xl max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <img src={logo} alt="Logo" className="h-10" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.label} className="border-b border-gray-100">
                      <button
                        onClick={() => {
                          if (item.subItems) {
                            setActiveSubMenu(activeSubMenu === item.label ? null : item.label);
                          } else {
                            scrollToSection(item.href);
                          }
                        }}
                        className="w-full text-left py-3 px-2 flex justify-between items-center text-gray-700 font-medium hover:text-blue-600"
                      >
                        {item.label}
                        {item.subItems && (
                          <span className={`transform transition-transform ${activeSubMenu === item.label ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        )}
                      </button>
                      
                      {item.subItems && activeSubMenu === item.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="pl-4 pb-2 space-y-2"
                        >
                          {item.subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <button
                                onClick={() => scrollToSection(subItem.href)}
                                className="w-full text-left py-2 px-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              >
                                {subItem.label}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      ctaButton.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-medium shadow-md"
                  >
                    {ctaButton.label}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;