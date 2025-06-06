import React, { useEffect, useState } from 'react';
import type { IEntreprise } from '../../types/entreprise.types';
import { getAllEntreprises } from '../../services/entreprise.service';
import { useNavigate } from 'react-router-dom';

const PageDashboardEntreprise: React.FC = () => {
  const [entreprise, setEntreprise] = useState<IEntreprise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntreprise = async () => {
      try {
        const data = await getAllEntreprises();

        // Récupérer le token et extraire l'ID utilisateur
        const token = localStorage.getItem('token');
        let userId = '';
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.id || payload._id || '';
          console.log('Token payload userId:', userId);
        }

        const found = data.find((e: any) => {
          if (typeof e.utilisateurId === 'string') {
            return e.utilisateurId === userId;
          } else if (typeof e.utilisateurId === 'object' && e.utilisateurId !== null) {
            return e.utilisateurId._id?.toString() === userId || e.utilisateurId.toString() === userId;
          }
          return false;
        });

        if (found) {
          setEntreprise(found);
          setError(null);
          console.log('Entreprise trouvée:', found);
        } else {
          setError('Profil entreprise non trouvé');
          console.log('Profil entreprise non trouvé pour userId:', userId);
        }
      } catch (error: unknown) {
        let message = 'Erreur inconnue';
        if (error instanceof Error) {
          message = error.message;
        }
        setError(message);
        console.error('Erreur fetchEntreprise:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntreprise();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!entreprise) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Entreprise</h1>
      <p className="mb-2"><strong>Nom:</strong> {entreprise.nom || 'Nom inconnu'}</p>
      <p className="mb-2"><strong>Description:</strong> {entreprise.description || 'Pas de description'}</p>
      <p className="mb-2"><strong>Ville:</strong> {entreprise.ville || 'Non spécifiée'}</p>
      <p className="mb-2"><strong>Whatsapp:</strong> {entreprise.whatsapp || 'Non spécifié'}</p>
      <p className="mb-2"><strong>Email:</strong> {entreprise.email || 'Non spécifié'}</p>
      <p className="mb-2"><strong>Secteur d'activité:</strong> {entreprise.secteurActivite || 'Non spécifié'}</p>

      <button
        onClick={() => {
          console.log('PageDashboardEntreprise - ID utilisé pour modification:', entreprise._id);
          navigate(`/modification-entreprise/${entreprise._id}`);
        }}
        className="text-blue-600 underline bg-transparent border-none p-0 cursor-pointer"
      >
        Modifier le profil
      </button>
      <br />
      <button
        onClick={() => {
          navigate('/gestion-offres');
        }}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Gérer les offres d'emploi
      </button>
      <br />
      <button
        onClick={() => {
          navigate('/creation-offre');
        }}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Créer une offre d'emploi
      </button>
    </div>
  );
};

export default PageDashboardEntreprise;
