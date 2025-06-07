import { Scissors, Wrench, Mic2, Code, Camera, BookOpen } from 'lucide-react';

const CategoriesServicesSection = () => {
  // Données des catégories avec icônes
  const categories = [
    { nom: "Couturier", icon: <Scissors className="w-8 h-8 text-amber-500" /> },
    { nom: "Mécanicien", icon: <Wrench className="w-8 h-8 text-amber-500" /> },
    { nom: "Maître de cérémonie", icon: <Mic2 className="w-8 h-8 text-amber-500" /> },
    { nom: "Développeur Web", icon: <Code className="w-8 h-8 text-amber-500" /> },
    { nom: "Photographe", icon: <Camera className="w-8 h-8 text-amber-500" /> },
    { nom: "Enseignant", icon: <BookOpen className="w-8 h-8 text-amber-500" /> }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Nos Professionnels</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Découvrez nos experts dans chaque domaine</p>
          <div className="w-16 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>

        {/* Grille responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 group"
            >
              <div className="bg-amber-50 p-4 rounded-full mb-4 group-hover:bg-amber-100 transition-colors duration-300">
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-amber-600 transition-colors duration-300">
                {cat.nom}
              </h3>
              <p className="text-sm text-gray-500 mt-2 text-center">Professionnels qualifiés</p>
            </div>
          ))}
        </div>

        {/* Bouton optionnel */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 font-medium shadow-sm hover:shadow-md">
            Trouver un professionnel
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesServicesSection;