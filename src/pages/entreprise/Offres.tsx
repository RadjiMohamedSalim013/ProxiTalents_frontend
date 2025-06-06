import React, { useEffect, useState } from 'react';
import { getAllOffres } from '../../services/offreEmploi.service';
import { useNavigate } from 'react-router-dom';

interface IOffre {
  _id: string;
  titre: string;
  description: string;
  entrepriseId: string;
}

const Offres: React.FC = () => {
  const [offres, setOffres] = useState<IOffre[]>([]);
  const [filteredOffres, setFilteredOffres] = useState<IOffre[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const data = await getAllOffres();
        setOffres(data as IOffre[]);
        setFilteredOffres(data as IOffre[]);
        setError(null);
      } catch (error: unknown) {
        setError('Erreur lors du chargement des offres.');
      } finally {
        setLoading(false);
      }
    };
    fetchOffres();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOffres(offres);
    } else {
      const filtered = offres.filter((offre) =>
        offre.titre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOffres(filtered);
    }
  }, [searchTerm, offres]);

  if (loading) return <div>Chargement des offres...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Toutes les offres d'emploi</h1>
      <input
        type="text"
        placeholder="Rechercher une offre par titre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {filteredOffres.length === 0 ? (
        <p>Aucune offre trouvée.</p>
      ) : (
        <ul>
          {filteredOffres.map((offre) => (
            <li
              key={offre._id}
              className="mb-4 p-4 border border-gray-200 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/offre/${offre._id}`)}
            >
              <h2 className="text-xl font-semibold">{offre.titre}</h2>
              <p>{offre.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Offres;
