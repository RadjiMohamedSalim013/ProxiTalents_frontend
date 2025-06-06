import React, { useEffect, useState } from 'react';
import { getOffresEntreprise, deleteOffre } from '../../services/offreEmploi.service';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Gestion des offres d'emploi</h1>
      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <ul>
          {offres.map((offre) => (
            <li key={offre._id} className="mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold">{offre.titre}</h2>
              <p>{offre.description.length > 100 ? offre.description.substring(0, 100) + '...' : offre.description}</p>
              <button
                onClick={() => navigate(`/offre/${offre._id}`)}
                className="text-blue-600 underline mr-4"
              >
                Détails
              </button>
              <button
                onClick={() => handleDelete(offre._id)}
                className="text-red-600 underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PageGestionOffres;
