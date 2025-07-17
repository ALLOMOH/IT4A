import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  Headphones
} from "lucide-react";

export default function Conctact () {

    const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "+225 01 23 45 67 89",
      description: "Appelez-nous pour un conseil immédiat",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@itexperts4africa.com",
      description: "Écrivez-nous, nous répondons sous 24h",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "Abidjan, Cocody, II Plateaux",
      description: "Côte d'Ivoire",
      color: "text-orange-600 bg-orange-100"
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lun - Ven : 8h30 - 18h00",
      description: "Support d'urgence 24/7",
      color: "text-purple-600 bg-purple-100"
    }
  ];


  return(
         <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <form>
              <div className="bg-white border-none shadow-2xl">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Envoyez-nous un message
                  </h3>
                  <p className="text-gray-600">
                    Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
                  </p>
                </div>
                {/* <div className="p-8 pt-0">
                  {isSubmitted ? (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Votre message a été transmis avec succès ! Nous vous recontacterons très bientôt à l'adresse {formData.email || "que vous avez fournie"}.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Votre nom et prénom"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre.email@exemple.com"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Décrivez votre projet ou votre besoin..."
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg"
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Envoyer le message
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <p className="text-sm text-gray-500">
                          Vous pouvez aussi nous contacter directement par téléphone au{" "}
                          <span className="font-semibold text-blue-600">+225 01 23 45 67 89</span>
                        </p>
                      </div>
                    </form>
                  )}
                </div> */}
              </div>
            </form>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nos coordonnées
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Plusieurs moyens de nous contacter selon votre préférence. 
                  Nous sommes à votre écoute !
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${info.color}`}>
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-900 font-medium mb-1">
                            {info.value}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-white border-none shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notre localisation</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Abidjan, Cocody, II Plateaux</p>
                      <p className="text-gray-500 text-sm">Côte d'Ivoire</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}