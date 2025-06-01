import React from 'react';
import { categories } from '../../data/categories';

const CategoriesServicesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Services Populaires</h2>
        <p className="text-gray-600 mb-10">Trouvez rapidement des prestataires qualifiés dans les domaines les plus recherchés.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col items-center justify-center"
            >
              <span className="text-4xl mb-3">{cat.icone}</span>
              <h3 className="text-xl font-semibold">{cat.nom}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesServicesSection;
