import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Handshake, Globe } from 'lucide-react';

export default function ApercuAproposSection() {
  const brandName = 'ProxiTalents'; 

  return (
    <section className="py-20 px-6 md:px-20 bg-slate-50 text-center">
      <div className="max-w-7xl mx-auto">
        {/* Titre avec icône intégrée */}
        <div className="inline-flex items-center gap-3 mb-2">
          <Handshake className="w-8 h-8 text-amber-500" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Pourquoi choisir {brandName} ?
          </h2>
        </div>

        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          {brandName} révolutionne la mise en relation entre <span className="font-medium text-slate-800">professionnels qualifiés</span>, 
          particuliers et entreprises. Notre plateforme favorise l&apos;économie locale tout en offrant 
          une expérience <span className="font-medium text-slate-800">sans intermédiaire</span>.
        </p>

        {/* Points clés  */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              icon: <Users className="w-6 h-6 text-amber-500" />,
              title: "Réseau local",
              text: "Connectez-vous avec des talents près de chez vous"
            },
            {
              icon: <Handshake className="w-6 h-6 text-amber-500" />,
              title: "Relations directes",
              text: "Échangez sans commission ni intermédiaire"
            },
            {
              icon: <Globe className="w-6 h-6 text-amber-500" />,
              title: "Opportunités",
              text: "Développez votre activité ou trouvez le bon profil"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
              </div>
              <p className="text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA  */}
        <div className="mt-16">
          <Link
            to="/a-propos"
            className="inline-flex items-center gap-2 group text-amber-600 hover:text-amber-700 font-medium text-lg transition-colors"
          >
            Découvrir notre vision
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}