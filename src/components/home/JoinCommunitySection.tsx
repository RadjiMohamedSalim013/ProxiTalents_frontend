import React from 'react';

const JoinCommunitySection = () => {
  return (
    <section className="bg-indigo-600 py-20 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Rejoignez notre communauté solidaire</h2>
        <p className="text-lg mb-8">
          Un espace WhatsApp pour échanger, s'entraider et découvrir les talents de la plateforme.
        </p>

        <a
          href="https://chat.whatsapp.com/VOTRE-LIEN-DU-GROUPE"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          🔗 Rejoindre le groupe WhatsApp
        </a>
      </div>
    </section>
  );
};

export default JoinCommunitySection;
