import { ChevronRight, Cloud, Code, Network, Settings, Shield } from 'lucide-react';
import GlowButton from '../UI/components/GlowButton';
import NetworkBackground from '../UI/Animation/NetworkBackground';
import CountUpAnimation from '../UI/components/CountUpAnimation';
import FloatingCard from '../UI/components/FloatingCard';
import backgroundHero from "/image/bg/backgroundMaquette.png?url";


const Hero = () => {
  return (
    <section className={` relative w-full h-svh items-center justify-center px-2 py-50 overflow-hidden `}>
      <NetworkBackground 
        animationSpeed={5}
        baseColor={`#f1ca13`}
        connectionDistance={20}
        mouseRepulsion={20}
        className='absolute z-0 h-full w-full top-0 left-0' 
      />

      <div className="container  max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl text-white leading-tight">
              IT Experts
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">
                4 Africa
              </span>
            </h1>
            <p className="text-xl text-gray-300  leading-relaxed">
              Boostez la performance de votre entreprise grâce à des solutions réseau sur mesure.
              Nous accompagnons les PME et grandes structures dans l’installation, la gestion et la sécurisation de leurs infrastructures informatiques.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <GlowButton variant="primary" className="group">
              En savoir plus
              <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GlowButton>
            <GlowButton variant="outline">
              Nos services
            </GlowButton>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#f1ca13]/20">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-[#f1ca13]">
                <CountUpAnimation end={10} suffix="+" />
              </div>
              <p className="text-sm text-gray-400">ans d'expérience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-[#f1ca13]">
                <CountUpAnimation end={500} suffix="+" />
              </div>
              <p className="text-sm text-gray-400">clients satisfaits</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-[#f1ca13]">
                <CountUpAnimation end={4000} suffix="+" />
              </div>
              <p className="text-sm text-gray-400">projets réalisés</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:flex md:hidden">
          <div className="relative w-full h-96 lg:h-[500px]  bg-[url(/image/sections/image-service-presentation.png)] bg-content bg-no-repeat bg-center rounded-3xl "></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;