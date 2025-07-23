import GlowButton from "../UI/components/GlowButton";
import TitleDescript from "../UI/components/TitleDescript";


function CtaSection() {
    return(
          <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-2 md:gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-2 md:p-12 border border-white/10">
            
            <TitleDescript className={``} title="Transformer votre infrastructure IT ?" descript={`Contactez nos experts dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons optimiser vos systèmes.`}/>
            
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
              <GlowButton href="/contact" variant="primary" className="text-xs md:text-lg">
                Consultation gratuite
              </GlowButton>
              <GlowButton  variant="outline" className="text-xs md:text-lg">
                Voir nos projets
              </GlowButton>
            </div>
          </div>
        </div>
      </section>
    );
}

export default CtaSection;