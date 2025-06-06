import React from 'react';
import { categories } from '../../data/categories.data';

const CategoriesServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Services Populaires</h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto"></div>
        </div>

        {/* Grille à 3 colonnes avec éléments élargis */}
        <div className="grid grid-cols-3 gap-6">
          {categories.slice(0, 9).map((cat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center"
            >
              <span className="text-4xl text-amber-500 mb-4">{cat.icone}</span>
              <h3 className="text-lg font-medium text-gray-800">{cat.nom}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesServicesSection;