import React from 'react';
import { ETAPES } from '../../data/homeSteps.data';

const CommentCaMarcheSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
        <p className="text-gray-600 mb-12">
          WAKAWAKA simplifie la mise en relation entre prestataires, utilisateurs et entreprises.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {ETAPES.map((etape, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-md transition duration-300">
              <div className="text-4xl mb-4">{etape.icone}</div>
              <h3 className="text-xl font-semibold mb-2">{etape.titre}</h3>
              <p className="text-gray-700">{etape.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentCaMarcheSection;
