import { Search, ArrowRight, Briefcase, Check } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-[600px] md:h-[800px] flex items-center justify-center py-100">
      {/* Arrière-plan avec image professionnelle moderne */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
        {/* Overlay sombre pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-slate-900/70"></div>
        
        {/* Gradient en bas pour fondre avec la section suivante */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Titre principal */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          <span className="block">Transformez vos <span className="text-amber-400">besoins</span></span>
          <span className="block mt-3">en <span className="text-amber-400">opportunités</span> concrètes</span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-8 text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto drop-shadow-md">
          La plateforme qui brise les barrières entre compétences locales et besoins professionnels
        </p>

        {/* Boutons CTA principaux */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/prestataires"
            className="group flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Search className="w-5 h-5" />
            Trouver un expert
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="/entreprises"
            className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Briefcase className="w-5 h-5" />
            Solutions pros
          </a>
        </div>

        {/* Badges de confiance */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            "Aucune commission",
            "Paiement sécurisé",
            "Profils vérifiés",
            "Support 7j/7"
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10">
              <Check className="w-5 h-5 text-amber-400" />
              <span className="text-slate-200 text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;