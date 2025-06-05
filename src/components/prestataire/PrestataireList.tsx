import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type  { IPrestataire } from '../../types/prestataire.types';
import { getPrestataires } from '../../services/prestataire.service';
import FilterPrestataires from './FilterPrestataires';

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
    console.log('Filtres appliqués:', { villeFilter, metierFilter, prixFilter });
  }, [villeFilter, metierFilter, prixFilter, prestataires]);

  const resetFilters = () => {
    setVilleFilter('');
    setMetierFilter('');
    setPrixFilter(null);
  };

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="text-center text-red-600">Erreur : {error}</div>;

  return (
    <div>
      <FilterPrestataires
        villeFilter={villeFilter}
        setVilleFilter={setVilleFilter}
        metierFilter={metierFilter}
        setMetierFilter={setMetierFilter}
        prixFilter={prixFilter}
        setPrixFilter={setPrixFilter}
        resetFilters={resetFilters}
      />
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrestataires.map((p) => (
          <div key={p._id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{typeof p.userId === 'object' && p.userId !== null ? p.userId.nom : 'Nom inconnu'}</h2>
            <p className="text-sm text-gray-700">{p.bio || 'Pas de bio'}</p>
            <p className="mt-2 text-sm text-gray-500">Zone : {p.zoneGeographique || 'Non spécifiée'}</p>
            <p className="mt-2 text-sm text-gray-500">
              Services :
              <ul className="list-disc ml-5">
                {p.services.map((s, i) => (
                  <li key={i}>
                    {s.nom} {s.tarif && `- ${s.tarif} FCFA`}
                  </li>
                ))}
              </ul>
            </p>
            {typeof p.userId === 'object' && p.userId !== null && (
              <div className="mt-4 text-sm">
                {p.userId.telephone && (
                  <p>
                    Téléphone: {p.userId.telephone}{' '}
                    <a
                      href={`https://wa.me/${p.userId.telephone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline ml-2"
                    >
                      WhatsApp
                    </a>
                  </p>
                )}
                <p>
                  Email: <a href={`mailto:${p.userId.email}`} className="text-blue-600 hover:underline">{p.userId.email}</a>
                </p>
              </div>
            )}
            <button
              onClick={() => navigate(`/prestataire/${p._id}`)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Visiter le profil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrestataireList;
