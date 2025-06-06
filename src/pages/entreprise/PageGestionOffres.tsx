import React, { useEffect, useState } from 'react';
import { getOffresEntreprise, deleteOffre } from '../../services/offreEmploi.service';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiTrash2, FiEdit, FiEye, FiPlus } from 'react-icons/fi';

const PageGestionOffres: React.FC = () => {
  const [offres, setOffres] = useState<Array<{ _id: string; titre: string; description: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const data = await getOffresEntreprise();
        setOffres(data);
        setError(null);
      } catch {
        setError('Erreur lors de la récupération des offres');
      } finally {
        setLoading(false);
      }
    };

    fetchOffres();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette offre ?')) return;
    try {
      await deleteOffre(id);
      setOffres((prev) => prev.filter((offre) => offre._id !== id));
    } catch {
      alert('Erreur lors de la suppression de l\'offre');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête avec bouton d'action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <FiBriefcase className="text-amber-500" />
              Gestion des offres d'emploi
            </h1>
            <p className="text-slate-600 mt-2">
              Consultez et gérez toutes vos offres publiées
            </p>
          </div>
          <button
            onClick={() => navigate('/creation-offre')}
            className="mt-4 md:mt-0 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition"
          >
            <FiPlus />
            Nouvelle offre
          </button>
        </div>

        {/* Contenu principal */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{error}</p>
          </div>
        ) : offres.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-slate-600 mb-4">Vous n'avez pas encore publié d'offres</p>
            <button
              onClick={() => navigate('/creation-offre')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 transition"
            >
              <FiPlus />
              Publier votre première offre
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offres.map((offre) => (
              <div key={offre._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-slate-200">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">{offre.titre}</h2>
                  <p className="text-slate-600 mb-4">
                    {offre.description.length > 100 
                      ? offre.description.substring(0, 100) + '...' 
                      : offre.description}
                  </p>
                </div>
                <div className="bg-slate-50 px-6 py-4 flex justify-between border-t border-slate-200">
                  <button
                    onClick={() => navigate(`/offre/${offre._id}`)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
                  >
                    <FiEye />
                    Voir
                  </button>
                  <button
                    onClick={() => navigate(`/modification-offre/${offre._id}`)}
                    className="text-amber-600 hover:text-amber-800 flex items-center gap-1 transition"
                  >
                    <FiEdit />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(offre._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 transition"
                  >
                    <FiTrash2 />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageGestionOffres;