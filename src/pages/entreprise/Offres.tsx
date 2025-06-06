import React, { useEffect, useState } from 'react';
import { getAllOffres } from '../../services/offreEmploi.service';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Search, Building2 } from 'lucide-react';

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Chargement des offres...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Briefcase className="text-blue-600 w-8 h-8" />
          <h1 className="text-4xl font-bold text-gray-800">
            Toutes les offres d'emploi
          </h1>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une offre par titre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Liste des offres */}
        {filteredOffres.length === 0 ? (
          <p className="text-gray-600">Aucune offre trouvée.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredOffres.map((offre) => (
              <div
                key={offre._id}
                onClick={() => navigate(`/offre/${offre._id}`)}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 border border-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="text-gray-500" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {offre.titre}
                  </h2>
                </div>
                <p className="text-gray-600 line-clamp-3">
                  {offre.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offres;
