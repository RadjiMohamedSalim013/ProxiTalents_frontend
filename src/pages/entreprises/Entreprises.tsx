import React, { useEffect, useState } from 'react';
import { getAllEntreprises } from '../../services/entreprise.service';
import type { IEntreprise } from '../../types/entreprise.types';
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaIndustry, FaInfoCircle } from 'react-icons/fa';

const Entreprises: React.FC = () => {
  const [entreprises, setEntreprises] = useState<IEntreprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const data = await getAllEntreprises();
        setEntreprises(data);
        setError(null);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Erreur lors du chargement des entreprises');
      } finally {
        setLoading(false);
      }
    };

    fetchEntreprises();
  }, []);

  const filteredEntreprises = entreprises.filter(entreprise =>
    entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entreprise.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entreprise.secteurActivite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-600 text-center py-10 text-lg">
      <FaInfoCircle className="inline-block mr-2" />
      {error}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          <FaBuilding className="inline-block mr-2 text-blue-600" />
          Annuaire des entreprises
        </h1>
        
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Rechercher par nom, ville ou secteur..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredEntreprises.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Aucune entreprise trouvée</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntreprises.map((entreprise) => (
            <div key={entreprise._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaBuilding className="text-blue-600 text-xl" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{entreprise.nom}</h2>
                </div>
                
                {entreprise.description && (
                  <p className="text-gray-600 mb-4 italic">"{entreprise.description}"</p>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaIndustry className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{entreprise.secteurActivite}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" />
                    <span className="text-gray-700">
                      {entreprise.adresse}, {entreprise.ville}
                    </span>
                  </div>
                  
                  {entreprise.telephone && (
                    <div className="flex items-center">
                      <FaPhone className="text-gray-500 mr-2" />
                      <a href={`tel:${entreprise.telephone}`} className="text-blue-600 hover:underline">
                        {entreprise.telephone}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-500 mr-2" />
                    <a href={`mailto:${entreprise.email}`} className="text-blue-600 hover:underline">
                      {entreprise.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Entreprises;