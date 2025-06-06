import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Rejoignez la communauté WAKAWAKA</h2>
        <p className="text-gray-600 mb-12">
          Que vous soyez utilisateur, prestataire ou entreprise, WAKAWAKA vous connecte aux bonnes personnes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Je suis un utilisateur</h3>
            <p className="text-gray-600 mb-6">Trouvez rapidement un prestataire fiable près de chez vous.</p>
            <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Rechercher un prestataire
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Je suis un prestataire</h3>
            <p className="text-gray-600 mb-6">Proposez vos services et augmentez votre visibilité.</p>
            <Link to="/login" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              M’inscrire comme prestataire
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Je suis une entreprise</h3>
            <p className="text-gray-600 mb-6">Trouvez des prestataires compétents pour vos besoins professionnels.</p>
            <Link to="/login" className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700">
              Recruter un prestataire
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
