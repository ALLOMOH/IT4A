import GlowButton from "../UI/components/GlowButton";

function CtaSection() {
    return(
          <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Prêt à transformer votre 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]">
                infrastructure IT ?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contactez nos experts dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons optimiser vos systèmes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton variant="primary" className="text-lg">
                Consultation gratuite
              </GlowButton>
              <GlowButton variant="outline" className="text-lg">
                Voir nos projets
              </GlowButton>
            </div>
          </div>
        </div>
      </section>
    );
}

export default CtaSection;