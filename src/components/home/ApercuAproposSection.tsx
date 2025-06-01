// src/components/home/ApercuAproposSection.tsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function ApercuAproposSection() {
  return (
    <section className="py-16 px-6 md:px-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
        Pourquoi WAKAWAKA ?
      </h2>

      <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
        WAKAWAKA est une plateforme qui connecte directement les prestataires de services avec les utilisateurs
        et les entreprises. Nous croyons en la force du talent local et en l'autonomie économique.
      </p>

      <div className="mt-8">
        <Link
          to="/a-propos"
          className="text-orange-500 hover:underline font-medium"
        >
          En savoir plus →
        </Link>
      </div>
    </section>
  );
}
