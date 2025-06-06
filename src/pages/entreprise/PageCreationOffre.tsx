import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { creerOffre } from '../../services/offreEmploi.service';

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
      setError('Le titre et la description sont obligatoires.');
      return;
    }

    setLoading(true);
    try {
      await creerOffre({ titre, description });
      navigate('/gestion-offres');
    } catch {
      setError('Erreur lors de la création de l\'offre.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Créer une nouvelle offre d'emploi</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titre" className="block mb-1 font-semibold">Titre</label>
          <input
            id="titre"
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 font-semibold">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={5}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Création...' : 'Créer l\'offre'}
        </button>
      </form>
    </div>
  );
};

export default PageCreationOffre;
