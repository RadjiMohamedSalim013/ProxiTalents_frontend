import { testimonials } from '../../data/testimonials.data';
import { FaQuoteLeft } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête avec séparateur */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Ils témoignent sur ProxiTalents</h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez ce que nos utilisateurs disent de leur expérience
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100"
            >
              {/* Icône de citation */}
              <FaQuoteLeft className="text-amber-400 text-3xl mb-6 opacity-20" />
              
              {/* Note en étoiles (optionnelle) */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`w-5 h-5 ${i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                  />
                ))}
              </div>

              {/* Témoignage */}
              <p className="text-slate-700 mb-6 leading-relaxed">“{item.message}”</p>
              
              {/* Auteur */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="font-semibold text-slate-800">{item.nom}</h4>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
