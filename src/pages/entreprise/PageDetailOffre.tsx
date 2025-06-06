import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOffreById, deleteOffre } from '../../services/offreEmploi.service';

const PageDetailOffre: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [offre, setOffre] = useState<{ _id: string; titre: string; description: string; entrepriseId: string } | null>(null);
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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!offre) return <div>Offre non trouvée</div>;

  const isOwner = currentEntrepriseId === offre.entrepriseId;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{offre.titre}</h1>
      <p>{offre.description}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-4"
      >
        Retour
      </button>
      {isOwner && (
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Supprimer l'offre
        </button>
      )}
    </div>
  );
};

export default PageDetailOffre;
