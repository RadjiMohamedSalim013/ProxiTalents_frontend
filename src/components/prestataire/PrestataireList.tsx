import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IPrestataire } from '../../types/prestataire.types';
import { getPrestataires } from '../../services/prestataire.service';
import FilterPrestataires from './FilterPrestataires';
import { MapPin, Briefcase, Phone, Mail, Smartphone, Star } from 'lucide-react';

const PrestataireList: React.FC = () => {
  const [prestataires, setPrestataires] = useState<IPrestataire[]>([]);
  const [filteredPrestataires, setFilteredPrestataires] = useState<IPrestataire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [villeFilter, setVilleFilter] = useState<string>('');
  const [metierFilter, setMetierFilter] = useState<string>('');
  const [prixFilter, setPrixFilter] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrestataires = async () => {
      try {
        const data = await getPrestataires();
        setPrestataires(data);
        setFilteredPrestataires(data);
        setError(null);
      } catch (error: any) {
        console.error("Erreur lors du chargement des prestataires :", error);
        setError(error.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchPrestataires();
  }, []);

  useEffect(() => {
    let filtered = prestataires;

    if (villeFilter) {
      filtered = filtered.filter(p =>
        p.zoneGeographique?.toLowerCase().includes(villeFilter.toLowerCase())
      );
    }

    if (metierFilter) {
      filtered = filtered.filter(p =>
        p.services.some(s => s.nom.toLowerCase().includes(metierFilter.toLowerCase()))
      );
    }

    if (prixFilter !== null) {
      filtered = filtered.filter(p =>
        p.services.some(s => s.tarif !== undefined && s.tarif <= prixFilter)
      );
    }

    setFilteredPrestataires(filtered);
  }, [villeFilter, metierFilter, prixFilter, prestataires]);

  const resetFilters = () => {
    setVilleFilter('');
    setMetierFilter('');
    setPrixFilter(null);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
        <p>Erreur lors du chargement : {error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Trouvez le prestataire idéal
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Des professionnels qualifiés près de chez vous
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-12">
          <FilterPrestataires
            villeFilter={villeFilter}
            setVilleFilter={setVilleFilter}
            metierFilter={metierFilter}
            setMetierFilter={setMetierFilter}
            prixFilter={prixFilter}
            setPrixFilter={setPrixFilter}
            resetFilters={resetFilters}
          />
        </div>

        {/* Liste */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrestataires.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-white p-8 rounded-xl shadow-sm max-w-md mx-auto">
                <p className="text-lg text-slate-600 mb-4">Aucun prestataire ne correspond à vos critères</p>
                <button
                  onClick={resetFilters}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          ) : (
            filteredPrestataires.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col border border-slate-200"
              >
                {/* En-tête carte */}
                <div className="p-6 pb-0">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-slate-800">
                      {typeof p.userId === 'object' && p.userId !== null
                        ? p.userId.nom
                        : 'Nom inconnu'}
                    </h2>
                    <div className="flex items-center bg-amber-50 text-amber-600 px-2 py-1 rounded text-sm">
                      <Star className="w-4 h-4 mr-1" />
                      <span>4.8</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {p.bio || 'Ce prestataire n\'a pas encore rédigé de bio.'}
                  </p>

                  <div className="flex items-center text-slate-600 mb-6">
                    <MapPin className="w-5 h-5 mr-2 text-slate-400" />
                    <span>{p.zoneGeographique || 'Zone non spécifiée'}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="px-6 pb-6">
                  <h3 className="flex items-center text-slate-700 font-semibold mb-3">
                    <Briefcase className="w-5 h-5 mr-2 text-slate-400" />
                    Services proposés
                  </h3>
                  <ul className="space-y-2">
                    {p.services.slice(0, 3).map((s, i) => (
                      <li key={i} className="flex justify-between text-sm">
                        <span className="text-slate-800">{s.nom}</span>
                        {s.tarif && (
                          <span className="text-amber-600 font-medium">
                            {s.tarif.toLocaleString()} FCFA
                          </span>
                        )}
                      </li>
                    ))}
                    {p.services.length > 3 && (
                      <li className="text-sm text-slate-500">
                        +{p.services.length - 3} autres services
                      </li>
                    )}
                  </ul>
                </div>

                {/* Contact */}
                {typeof p.userId === 'object' && p.userId !== null && (
                  <div className="mt-auto border-t border-slate-200 p-6 bg-slate-50">
                    <div className="space-y-3">
                      {p.userId.telephone && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-slate-400" />
                            <span className="text-slate-700">{p.userId.telephone}</span>
                          </div>
                          <a
                            href={`https://wa.me/${p.userId.telephone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                          >
                            <Smartphone className="w-4 h-4 mr-1" />
                            WhatsApp
                          </a>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-slate-400" />
                        <a 
                          href={`mailto:${p.userId.email}`} 
                          className="text-slate-700 hover:text-blue-600 text-sm truncate"
                        >
                          {p.userId.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bouton action */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => navigate(`/prestataire/${p._id}`)}
                    className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow-md"
                  >
                    Voir le profil complet
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PrestataireList;