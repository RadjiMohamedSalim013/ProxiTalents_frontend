import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IPrestataire } from '../../types/prestataire.types';
import { getPrestataires } from '../../services/prestataire.service';
import FilterPrestataires from './FilterPrestataires';
import { MapPin, Briefcase, Phone, Mail, Smartphone } from 'lucide-react';

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg bg-[#F3F4F6]">
        Chargement des prestataires...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg bg-[#F3F4F6]">
        Erreur : {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Filtres */}
        <FilterPrestataires
          villeFilter={villeFilter}
          setVilleFilter={setVilleFilter}
          metierFilter={metierFilter}
          setMetierFilter={setMetierFilter}
          prixFilter={prixFilter}
          setPrixFilter={setPrixFilter}
          resetFilters={resetFilters}
        />

        {/* Liste */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPrestataires.length === 0 && (
            <p className="col-span-full text-center text-gray-600 text-lg mt-10">
              Aucun prestataire trouvé.
            </p>
          )}

          {filteredPrestataires.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col justify-between border border-transparent hover:border-blue-400"
            >
              <div>
                <h2 className="text-2xl font-extrabold mb-2 text-[#1E40AF]">
                  {typeof p.userId === 'object' && p.userId !== null
                    ? p.userId.nom
                    : 'Nom inconnu'}
                </h2>
                <p className="text-gray-700 mb-5 min-h-[80px] leading-relaxed">{p.bio || 'Pas de bio disponible.'}</p>

                <div className="flex items-center text-blue-600 mb-3 space-x-3 font-semibold">
                  <MapPin className="w-6 h-6" />
                  <span className="text-base">{p.zoneGeographique || 'Zone non spécifiée'}</span>
                </div>

                <div>
                  <h3 className="flex items-center gap-3 font-extrabold text-[#2563EB] mb-3 text-lg">
                    <Briefcase className="w-6 h-6" />
                    Services
                  </h3>
                  <ul className="list-disc list-inside text-gray-800 max-h-28 overflow-y-auto space-y-1 text-sm">
                    {p.services.map((s, i) => (
                      <li key={i}>
                        {s.nom} {s.tarif ? `- ${s.tarif.toLocaleString()} FCFA` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {typeof p.userId === 'object' && p.userId !== null && (
                <div className="mt-7 border-t pt-5 text-sm text-gray-700 space-y-3">
                  {p.userId.telephone && (
                    <p className="flex items-center gap-3 text-blue-600 font-semibold">
                      <Phone className="w-5 h-5" />
                      <span>{p.userId.telephone}</span>
                      <a
                        href={`https://wa.me/${p.userId.telephone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-green-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Smartphone className="w-5 h-5" /> WhatsApp
                      </a>
                    </p>
                  )}
                  <p className="flex items-center gap-3 text-blue-600 font-semibold">
                    <Mail className="w-5 h-5" />
                    <a href={`mailto:${p.userId.email}`} className="hover:underline">
                      {p.userId.email}
                    </a>
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate(`/prestataire/${p._id}`)}
                className="mt-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-extrabold py-3 rounded-xl transition-all shadow-lg"
              >
                Visiter le profil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrestataireList;
