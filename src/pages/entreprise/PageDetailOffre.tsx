import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOffreById, deleteOffre } from '../../services/offreEmploi.service';
import { FiArrowLeft, FiTrash2, FiEdit } from 'react-icons/fi';

const PageDetailOffre: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [offre, setOffre] = useState<{ 
    _id: string; 
    titre: string; 
    description: string; 
    entrepriseId: string;
    createdAt?: string;
    competencesRequises?: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Assuming the current user's entrepriseId is stored in localStorage or can be decoded from token
  const currentEntrepriseId = localStorage.getItem('entrepriseId');

  useEffect(() => {
    const fetchOffre = async () => {
      if (!id) {
        setError('ID de l\'offre manquant');
        setLoading(false);
        return;
      }
      try {
        const data = await getOffreById(id);
        setOffre(data);
        setError(null);
      } catch {
        setError('Erreur lors de la récupération de l\'offre');
      } finally {
        setLoading(false);
      }
    };
    fetchOffre();
  }, [id]);

  const handleDelete = async () => {
    if (!offre?._id) return;
    if (!window.confirm('Voulez-vous vraiment supprimer cette offre ?')) return;
    try {
      await deleteOffre(offre._id);
      navigate('/gestion-offres');
    } catch {
      alert('Erreur lors de la suppression de l\'offre');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    </div>
  );

  if (!offre) return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <p className="text-slate-600">Offre non trouvée</p>
    </div>
  );

  const isOwner = currentEntrepriseId === offre.entrepriseId;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8 transition"
        >
          <FiArrowLeft />
          Retour aux offres
        </button>

        {/* Carte de l'offre */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* En-tête avec titre et date */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{offre.titre}</h1>
              {offre.createdAt && (
                <p className="text-sm text-slate-500 mt-2 sm:mt-0">
                  Publiée le {new Date(offre.createdAt).toLocaleDateString('fr-FR')}
                </p>
              )}
            </div>

            {/* Section description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">Description du poste</h2>
              <div className="prose max-w-none text-slate-600">
                {offre.description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section compétences requises */}
            {offre.competencesRequises && offre.competencesRequises.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Compétences requises</h2>
                <div className="flex flex-wrap gap-2">
                  {offre.competencesRequises.map((competence, index) => (
                    <span 
                      key={index} 
                      className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm"
                    >
                      {competence}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {isOwner && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
                <button
                  onClick={() => navigate(`/modification-offre/${offre._id}`)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition"
                >
                  <FiEdit />
                  Modifier l'offre
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition"
                >
                  <FiTrash2 />
                  Supprimer l'offre
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetailOffre;