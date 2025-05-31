import React, { useEffect, useState } from 'react';
import type { Utilisateur } from '../types/users.types';
import { recupererUtilisateurConnecte } from '../services/user.service';
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';


const Profil: React.FC = () => {
  const navigate = useNavigate();
const handleLogout = () => {
    logout();
    navigate('/login');  // Redirige vers login après déconnexion
  };


  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        const user = await recupererUtilisateurConnecte();
        setUtilisateur(user);
      } catch (err) {
        setError('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateur();
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Profil utilisateur</h1>
      {utilisateur && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <p><strong>Nom:</strong> {utilisateur.nom}</p>
          <p><strong>Email:</strong> {utilisateur.email}</p>
          <p><strong>Rôle:</strong> {utilisateur.role}</p>
          <p><strong>Inscrit depuis:</strong> {new Date(utilisateur.createdAt).toLocaleDateString()}</p>
        </div>
      )}

            <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Déconnexion
      </button>
    </div>
    
  );
};

export default Profil;
