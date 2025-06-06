import React from "react";
import { FiGlobe, FiTarget, FiHeart } from "react-icons/fi";

export default function VisionSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Colonne texte */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-amber-400"></div>
              <span className="text-amber-400 font-medium">Notre vision</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-8">
              Construire l'<span className="text-amber-400">économie locale</span> de demain
            </h2>
            
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                Nous imaginons un écosystème où chaque compétence trouve son utilité, 
                où chaque professionnel peut vivre de son talent, et où chaque entreprise 
                trouve les ressources locales dont elle a besoin.
              </p>

              <p>
                ProxiTalents s'engage à créer des connexions qui dépassent le simple service, 
                pour bâtir des relations professionnelles durables.
              </p>
            </div>

            {/* Points clés */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: <FiTarget className="text-amber-400" />, text: "Valorisation des talents" },
                { icon: <FiGlobe className="text-amber-400" />, text: "Réseau local et global" },
                { icon: <FiHeart className="text-amber-400" />, text: "Approche humaine" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-xl">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne image */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl border-2 border-white/10">
            {/* Image illustrative - économie locale collaborative */}
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
              alt="Économie locale collaborative"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}