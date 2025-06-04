import React, { useEffect, useState } from 'react';
import type  { IPrestataire } from '../../types/prestataire.types';
import { getPrestataires } from '../../services/prestataire.service';

const PrestataireList: React.FC = () => {
  const [prestataires, setPrestataires] = useState<IPrestataire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestataires = async () => {
      try {
        const data = await getPrestataires();
        setPrestataires(data);
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

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="text-center text-red-600">Erreur : {error}</div>;

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prestataires.map((p) => (
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
        </div>
      ))}
    </div>
  );
};

export default PrestataireList;
