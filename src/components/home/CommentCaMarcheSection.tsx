import React from 'react';
import { ETAPES } from '../../data/homeSteps.data';
import { FiSearch, FiUserPlus , FiCheckCircle } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';

const CommentCaMarcheSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête avec ligne de séparation */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez en 4 étapes simples comment ProxiTalents connecte les talents aux opportunités
          </p>
        </div>

        {/* Étapes avec numérotation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ETAPES.map((etape, index) => (
            <div 
              key={index} 
              className="relative bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-amber-200 transition-all duration-300 group"
            >
              {/* Numéro d'étape discret */}
              <div className="absolute top-4 left-4 text-5xl font-bold text-gray-100 z-0">
                0{index + 1}
              </div>
              
              {/* Contenu */}
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="bg-amber-50 p-4 rounded-full text-amber-500 text-3xl group-hover:bg-amber-100 transition-colors">
                    {index === 0 && <FiSearch />}
                    {index === 1 && <FiUserPlus />}
                    {index === 2 && <FaHandshake />}
                    {index === 3 && <FiCheckCircle />}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{etape.titre}</h3>
                <p className="text-gray-600 leading-relaxed">{etape.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note optionnelle en bas */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          * Processus simple et sécurisé - Sans intermédiaire
        </div>
      </div>
    </section>
  );
};

export default CommentCaMarcheSection;