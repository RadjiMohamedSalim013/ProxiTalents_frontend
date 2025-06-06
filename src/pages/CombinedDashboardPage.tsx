import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPrestataireByUser, getEntrepriseByUser } from '../services/profile.service';
import type { IPrestataire } from '../types/prestataire.types';
import type { IEntreprise } from '../types/entreprise.types';

const CombinedDashboardPage: React.FC = () => {
  const [prestataire, setPrestataire] = useState<IPrestataire | null>(null);
  const [entreprise, setEntreprise] = useState<IEntreprise | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const prestataireData = await getPrestataireByUser();
        setPrestataire(prestataireData as IPrestataire);
      } catch (error) {
        setPrestataire(null);
      }
      try {
        const entrepriseData = await getEntrepriseByUser();
        setEntreprise(entrepriseData as IEntreprise);
      } catch (error) {
        setEntreprise(null);
      }
      setLoading(false);
    };
    fetchProfiles();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mes Profils</h1>
      {!prestataire && !entreprise && (
        <p>Aucun profil trouvé. Veuillez créer un profil prestataire ou entreprise.</p>
      )}
      {prestataire && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-2xl font-semibold">Profil Prestataire</h2>
          <p><strong>Nom:</strong> {typeof prestataire.userId === 'object' ? prestataire.userId?.nom : 'Nom inconnu'}</p>
          <button
            onClick={() => navigate(`/prestataire/dashboard/${prestataire._id}`)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Accéder au dashboard Prestataire
          </button>
        </div>
      )}
      {entreprise && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-2xl font-semibold">Profil Entreprise</h2>
          <p><strong>Nom:</strong> {entreprise.nom || 'Nom inconnu'}</p>
          <button
            onClick={() => navigate(`/entreprise/dashboard/${entreprise._id}`)}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Accéder au dashboard Entreprise
          </button>
        </div>
      )}
    </div>
  );
};

export default CombinedDashboardPage;
