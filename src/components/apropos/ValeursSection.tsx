import React from "react";
import { valeurs } from "../../data/apropos.data";

export default function ValeursSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Nos Valeurs</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {valeurs.map((valeur, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">{valeur.icone}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{valeur.titre}</h3>
              <p className="text-gray-600 text-sm">{valeur.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
