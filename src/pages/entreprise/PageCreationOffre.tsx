import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { creerOffre } from '../../services/offreEmploi.service';
import { FiBriefcase, FiFileText, FiSave, FiArrowLeft } from 'react-icons/fi';

const PageCreationOffre: React.FC = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!titre.trim() || !description.trim()) {
      setError('Le titre et la description sont obligatoires');
      return;
    }

    setLoading(true);
    try {
      await creerOffre({ titre, description });
      navigate('/gestion-offres');
    } catch {
      setError('Erreur lors de la création de l\'offre');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* En-tête avec bouton retour */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 transition"
          >
            <FiArrowLeft />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FiBriefcase className="text-amber-500" />
            Nouvelle offre d'emploi
          </h1>
        </div>

        {/* Carte du formulaire */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p>{error}</p>
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Titre */}
              <div>
                <label htmlFor="titre" className="block text-sm font-medium text-slate-700 mb-1">
                  Titre de l'offre
                </label>
                <div className="relative">
                  <input
                    id="titre"
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition disabled:bg-slate-100"
                    placeholder="Ex: Développeur Full Stack"
                    disabled={loading}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBriefcase className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Champ Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                  Description détaillée
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition min-h-[150px] disabled:bg-slate-100"
                    placeholder="Décrivez en détail le poste, les missions, les compétences requises..."
                    rows={5}
                    disabled={loading}
                    required
                  />
                  <div className="absolute top-2 left-3">
                    <FiFileText className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Publier l'offre
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCreationOffre;