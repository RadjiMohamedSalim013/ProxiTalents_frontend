import { FaWhatsapp, FaUsers, FaHandsHelping } from 'react-icons/fa';

const JoinCommunitySection = () => {
  return (
    <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-24 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Icônes décoratives */}
        <div className="flex justify-center gap-8 mb-8 opacity-20 text-white">
          <FaUsers className="text-5xl" />
          <FaHandsHelping className="text-5xl" />
          <FaWhatsapp className="text-5xl" />
        </div>

        {/* Contenu principal */}
        <h2 className="text-4xl font-bold mb-6">
          Rejoignez la communauté <span className="text-slate-800">ProxiTalents</span>
        </h2>
        
        <div className="w-24 h-1 bg-slate-800 mx-auto mb-8"></div>
        
        <p className="text-xl text-amber-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          Un espace privilégié pour échanger, trouver des opportunités et faire grandir votre réseau professionnel local.
        </p>

        {/* Bouton CTA */}
        <a
          href="https://chat.whatsapp.com/D1oAmHw7eDg39YmroveRfX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 group shadow-lg"
        >
          <FaWhatsapp className="text-2xl" />
          <span>Rejoindre notre groupe WhatsApp</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>

        {/* Note complémentaire */}
        <p className="mt-8 text-sm text-amber-100">
          +500 membres actifs • Discussions modérées • 100% gratuit
        </p>
      </div>
    </section>
  );
};

export default JoinCommunitySection;
