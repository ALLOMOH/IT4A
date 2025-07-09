import FloatingCard from "../UI/components/FloatingCard";
import ChromaGrid from "../UI/components/ChromaGrid";


export default function SectorActivitet(){
    const sectors = [
    { name: "Santé", image: "👨‍⚕️" },
    { name: "Finance & Banque", image: "💼" },
    { name: "Éducation", image: "🎓" },
    { name: "Télécommunications", image: "📡" },
    { name: "E-commerce", image: "🛒" },
    { name: "Secteur Public", image: "🏛️" },
    { name: "Logistique & Transport", image: "🚚" }
  ];
    
  return(
      <section className="py-20 px-4 bg-gradient-to-r from-[#1d3446]/50 to-[#0a84c1]/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl dark:text-white text-black sm:text-2xl mb-6">
              Secteurs d'<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nous accompagnons les entreprises de tous secteurs avec des technologies de pointe
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {sectors.map((sector, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#f1ca13]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#f1ca13]/20 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {sector.image}
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-[#f1ca13] transition-colors duration-300">
                    {sector.name}
                  </h3>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>
  );
}