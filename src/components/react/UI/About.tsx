import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  Users, 
  Award,
  MapPin,
  Briefcase,
  Calendar,
  Trophy
} from "lucide-react";

import ScrollReveal from "@/components/react/UI/Animation/ScrollReveal";
import CountUp from "@/components/react/UI/Text/CountUp";

export default function About() {
  const teamMembers = [
    {
      name: "Jean-Claude Kouassi",
      role: "Directeur Technique",
      experience: "12 ans",
      specialty: "Architecture réseau & Cloud"
    },
    {
      name: "Aminata Traoré", 
      role: "Ingénieure Sécurité",
      experience: "8 ans",
      specialty: "Cybersécurité & Audit"
    },
    {
      name: "David Assamoi",
      role: "Chef de Projet",
      experience: "10 ans", 
      specialty: "Gestion d'infrastructure"
    }
  ];

  const achievements = [
    {
      icon: Trophy,
      title: "200+ Projets",
      description: "Projets IT réalisés avec succès",
      color: "text-yellow-600 bg-yellow-100",
      count: 200
    },
    {
      icon: Users,
      title: "50+ Clients",
      description: "Entreprises nous font confiance",
      color: "text-blue-600 bg-blue-100",
      count: 50
    },
    {
      icon: Calendar,
      title: "10+ Années",
      description: "D'expertise dans le domaine IT",
      color: "text-green-600 bg-green-100",
      count: 10
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Partenaire agréé des grandes marques",
      color: "text-purple-600 bg-purple-100",
      count: 15
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 lg:py-32 overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                À propos d'
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                  ITExperts4Africa
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Spécialisés dans les services réseaux et infrastructures IT, nous accompagnons 
                les entreprises africaines vers l'excellence technologique.
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern office with IT equipment" 
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </motion.div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-8">
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="h-6 w-6 text-orange-500" />
                  <span className="text-lg text-gray-700">Basé à Abidjan, Cocody</span>
                </motion.div>
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  ITExperts4Africa est née de la volonté de démocratiser l'accès aux technologies 
                  IT de pointe en Afrique. Notre équipe d'ingénieurs passionnés cumule plus de 
                  10 ans d'expérience dans la conception, la maintenance et l'optimisation de 
                  systèmes informatiques.
                </motion.p>
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Nous croyons fermement que la transformation numérique est un levier essentiel 
                  pour la croissance des entreprises africaines. C'est pourquoi nous mettons 
                  notre expertise au service de votre réussite.
                </motion.p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white border-none shadow-lg h-full">
                  <CardContent className="p-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.div 
                        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Target className="h-8 w-8 text-blue-600" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-900">Notre Mission</h2>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Aider les entreprises africaines à bénéficier de réseaux performants, 
                      sécurisés et parfaitement adaptés à leurs besoins spécifiques. Nous 
                      démocratisons l'accès aux technologies IT de pointe pour accélérer 
                      la croissance de nos clients.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white border-none shadow-lg h-full">
                  <CardContent className="p-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.div 
                        className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Eye className="h-8 w-8 text-orange-600" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-900">Notre Vision</h2>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Devenir un acteur clé de la transformation numérique en Afrique en 
                      proposant des solutions IT innovantes, fiables et accessibles. Nous 
                      voulons être le partenaire de référence pour toute entreprise souhaitant 
                      moderniser son infrastructure technologique.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Nos réalisations en chiffres
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Des résultats concrets qui témoignent de notre expertise
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border-none shadow-lg text-center hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <motion.div 
                        className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${achievement.color}`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <achievement.icon className="h-8 w-8" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        <CountUp onStart={0}  onEnd={parseInt(achievement.count)} duration={2} />
                      </h3>
                      <p className="text-gray-600">{achievement.description} </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Notre équipe d'experts
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Des professionnels passionnés au service de votre réussite
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <motion.div 
                        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white font-bold text-2xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                      <div className="space-y-2">
                        <motion.div 
                          className="flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600 text-sm">{member.experience} d'expérience</span>
                        </motion.div>
                        <p className="text-gray-600 text-sm">{member.specialty}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/svg%3E')",
            backgroundSize: "40px 40px"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Nos valeurs fondamentales
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { title: "Excellence", description: "Nous visons l'excellence dans chaque projet, avec des solutions IT de qualité supérieure." },
                { title: "Innovation", description: "Nous restons à la pointe de la technologie pour offrir les solutions les plus avancées." },
                { title: "Partenariat", description: "Nous construisons des relations durables basées sur la confiance et la transparence." }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-blue-100">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}