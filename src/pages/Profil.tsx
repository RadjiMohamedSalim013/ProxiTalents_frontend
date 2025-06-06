import React, { useEffect, useState } from 'react';
import type { Utilisateur } from '../types/users.types';
import { recupererUtilisateurConnecte } from '../services/user.service';
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { getPrestataireByUser, getEntrepriseByUser } from '../services/profile.service';

const Profil: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');  // Redirige vers login après déconnexion
  };

  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [prestataire, setPrestataire] = useState<any>(null);
  const [entreprise, setEntreprise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await recupererUtilisateurConnecte();
        setUtilisateur(user);

        let prest = null;
        let ent = null;

        try {
          prest = await getPrestataireByUser();
        } catch (e) {
          prest = null;
        }

        try {
          ent = await getEntrepriseByUser();
        } catch (e) {
          ent = null;
        }

        setPrestataire(prest);
        setEntreprise(ent);
      } catch (err) {
        setError('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Profil utilisateur</h1>
      {utilisateur && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
          <p><strong>Nom:</strong> {utilisateur.nom}</p>
          <p><strong>Email:</strong> {utilisateur.email}</p>
          <p><strong>Rôle:</strong> {utilisateur.role}</p>
          <p><strong>Inscrit depuis:</strong> {new Date(utilisateur.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {prestataire && entreprise && (
          <>
            <p className="mb-4">Vous avez les deux profils :</p>
            <button
              onClick={() => navigate('/dashboard-prestataire')}
              className="mr-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Accéder au dashboard Prestataire
            </button>
            <button
              onClick={() => navigate('/dashboard-entreprise')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Accéder au dashboard Entreprise
            </button>
          </>
        )}

        {prestataire && !entreprise && (
          <>
            <p className="mb-4">Vous avez un profil Prestataire.</p>
            <button
              onClick={() => navigate(`/prestataire/dashboard/${prestataire._id}`)}
              className="mr-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Accéder au dashboard Prestataire
            </button>
            <button
              onClick={() => navigate('/creation-entreprise')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Créer un profil Entreprise
            </button>
          </>
        )}

        {!prestataire && entreprise && (
          <>
            <p className="mb-4">Vous avez un profil Entreprise.</p>
            <button
              onClick={() => navigate(`/entreprise/dashboard/${entreprise._id}`)}
              className="mr-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Accéder au dashboard Entreprise
            </button>
            <button
              onClick={() => navigate('/creation')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Créer un profil Prestataire
            </button>
          </>
        )}

        {!prestataire && !entreprise && (
          <>
            <p className="mb-4">Vous n'avez pas encore de profil.</p>
            <button
              onClick={() => navigate('/creation')}
              className="mr-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Créer un profil Prestataire
            </button>
            <button
              onClick={() => navigate('/creation-entreprise')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Créer un profil Entreprise
            </button>
          </>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default Profil;
