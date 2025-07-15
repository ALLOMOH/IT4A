import { cn } from "../../../lib/utils";
import { Cloud, Code, Settings, Users, Shield } from 'lucide-react';
import TriangularBackground from "../UI/Animation/TriangularBackground";
import TitleDescript from "../UI/components/TitleDescript";


interface ServicesProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  index?: number;
  className?: string;
}


export const ServicesSection: React.FC<ServicesProps> = (
  { className }
) => {
  const services = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Conseil et stratégie IT",
      description: "Optimisation de votre infrastructure technologique pour une performance maximale.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Réseaux et cybersécurité",
      description: "Protection avancée de vos données et systèmes contre les menaces numériques.",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Solutions cloud et hébergement",
      description: "Migration et gestion cloud pour une infrastructure flexible et évolutive.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Développement et intégration",
      description: "Solutions logicielles sur mesure adaptées à vos besoins spécifiques.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Support et maintenance IT",
      description: "Assistance technique 24/7 pour garantir la continuité de vos opérations.",
    }
  ];
  return (
    <section className={` py-10 md:py-20 h-full w-full flex flex-col items-center backdrop-blur-xs px-2  md:px-4  bg-it4a-secondary/50 justify-center scroll-mt-px z-0 ${className} `}>
      <TitleDescript title="Nos services IT sur mesure" descript="Des solutions complètes pour accompagner votre transformation numérique" />
      <div className={` container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto `}>
        {services.map((services, index) => (
          <Services key={services.title} {...services} index={index} />
        ))}
      </div>

      <div className="custom-shape-divider-top-1752494969">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <rect x="1200" height="3.6"></rect>
          <rect height="3.6"></rect>
          <path d="M0,0V3.6H580.08c11,0,19.92,5.09,19.92,13.2,0-8.14,8.88-13.2,19.92-13.2H1200V0Z" className="shape-fill"></path>
        </svg>
      </div>
      <style>
        {`
        .custom-shape-divider-top-1752494969 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.custom-shape-divider-top-1752494969 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 224px;
}

.custom-shape-divider-top-1752494969 .shape-fill {
    fill: #f1ca13;
}

        
        `}
      </style>
    </section>
  );
}
const Services: React.FC<ServicesProps> = ({
  title,
  description,
  icon,
  index = 0,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/Services dark:border-neutral-800 bg-white/20",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-it4a-primary/20"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/Services:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/Services:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 dark:text-neutral-400 text-neutral-900">
        {icon}
      </div>
      <div className="text-xs md:text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/Services:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/Services:bg-it4a-primary transition-all duration-200 origin-center" />
        <span className="group-hover/Services:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-900 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};


export default ServicesSection;

