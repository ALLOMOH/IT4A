import { ChevronRight, Cloud, Code, Container, Loader, Network, Settings, Shield } from 'lucide-react';
import GlowButton from '../UI/components/GlowButton';
import NetworkBackground from '../UI/Animation/NetworkBackground';
import CountUpAnimation from '../UI/components/CountUpAnimation';
import FloatingCard from '../UI/components/FloatingCard';
import backgroundHero from "/image/sections/homme_de_tir_moyen-travaillant-removebg-preview.png?url";
import DecryptedText from "../UI/Text/DecryptedText";
import CountUp from "../UI/Text/CountUp";
import ShinyText from "../UI/Text/ShinyText";

const Hero = () => {
  return (
    <section className={ `box-border relative  w-full h-svh flex items-center justify-center px-4 backdrop-blur-xl md:backdrop-blur-none  md:px-4 py-20  md:py-40`}>
      <NetworkBackground 
        animationSpeed={5}
        baseColor={`#f1ca13`}
        connectionDistance={20}
        mouseRepulsion={20}
        className='absolute z-0 sm:-z-10 h-full w-full top-0 left-0' 
      />

      <div className={` px-2 max-w-7xl grid lg:grid-cols-2 gap-12 items-center relative z-10`}>
        <div className="space-y-2 lg:space-y-8">
          <div className="space-y-2 lg:space-y-2">
            <h1 className="text-2xl md:text-5xl lg:text-4xl text-white leading-tight">
              <DecryptedText speed={70}    animateOn='view'  text={`IT Experts`} />
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">
              <DecryptedText speed={70}   animateOn='view' text={`4 Africa`} />
              </span>
            </h1>
            <p className="text-xs md:text-xl line-clamp-5 text-gray-300  leading-relaxed">
              <ShinyText textAlign="left" duration={.1}  splitType={'words'} text={`Boostez la performance de votre entreprise grâce à des solutions réseau sur mesure.Nous accompagnons les PME et grandes structures dans l’installation, la gestion et la sécurisation de leurs infrastructures informatiques.
                `}
                 />
            </p>
          </div>

          <div className="flex text-xs flex-col sm:flex-row gap-4">
              <GlowButton variant="primary" className="group">
                En savoir plus
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </GlowButton>

             <FloatingCard delay={15}>
                <GlowButton variant="outline">
                  Nos services
                </GlowButton>
             </FloatingCard>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#f1ca13]/20">
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-[#f1ca13]">
                {/* <CountUpAnimation end={10} suffix="+" /> */}
                <CountUp  from={0} to={10} delay={.5} duration={10}/>
              </div>
              <p className="text-xs md:text-sm text-gray-400">ans d'expérience</p>
            </div>
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-[#f1ca13]">
                {/* <CountUpAnimation end={500} suffix="+" /> */}
                <CountUp  from={0} to={500} delay={1} duration={10}/>
              </div>
              <p className="text-xs md:text-sm text-gray-400">clients satisfaits</p>
            </div>
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-[#f1ca13]">
                {/* <CountUpAnimation end={4000} suffix="+" /> */}
                <CountUp  from={0} to={4000} delay={1.5} duration={10}/>
              </div>
              <p className="text-xs md:text-sm text-gray-400">projets réalisés</p>
            </div>
          </div>
        </div>
        {/* 
        <div className="relative  hidden md:flex   ">
          <div className={`relative w-full h-96 lg:h-[500px]  bg-[url(${backgroundHero})] bg-cover bg-no-repeat bg-bottom-right `}></div>
        </div> 
        */}
      </div>
    </section>
  );
};

export default Hero;