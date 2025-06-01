// src/pages/Accueil/index.tsx
import React from 'react';



const HeroSection = () => {
 return (
    <section className="bg-gradient-to-r from-yellow-100 to-orange-200 py-20 px-6 md:px-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
        Trouve un <span className="text-orange-600">prestataire</span>
        , apprends un <span className="text-orange-600">métier</span>, ou
        connecte ton <span className="text-orange-600">entreprise</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-600">
        ProxiTalent, la plateforme qui met en relation les talents et les opportunités en toute simplicité.
      </p>

      <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
        <a
          href="/prestataires"
          className="bg-orange-500 text-white py-3 px-6 rounded-xl hover:bg-orange-600 transition"
        >
          Trouver un prestataire
        </a>
        <a
          href="/entreprises"
          className="border border-orange-500 text-orange-500 py-3 px-6 rounded-xl hover:bg-orange-100 transition"
        >
          Pour les entreprises
        </a>
      </div>
    </section>
  );
}


export default HeroSection;
