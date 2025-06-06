import React from "react";
import { FiUsers, FiTarget, FiHeart } from "react-icons/fi";

export default function PresentationSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Image de fond (à remplacer) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 z-0">
        <div className="bg-[url('/images/pattern.svg')] w-full h-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Colonne image */}
          <div className="order-2 md:order-1">
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              {/* Remplacez par votre image */}
              <img 
                src="/images/equipe-proxitalents.jpg" 
                alt="Équipe ProxiTalents"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Colonne texte */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Notre <span className="text-amber-500">histoire</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600">
              <p>
                ProxiTalents est né de la rencontre entre des professionnels passionnés et une conviction forte :
                chaque talent mérite d'être visible et chaque besoin trouve sa solution localement.
              </p>
              <p>
                Depuis 2023, nous construisons des ponts entre les compétences locales et les opportunités professionnelles.
              </p>
            </div>

            {/* Chiffres clés */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { value: "500+", label: "Professionnels" },
                { value: "10k+", label: "Utilisateurs" },
                { value: "100%", label: "Satisfaction" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-amber-500">{item.value}</p>
                  <p className="text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}