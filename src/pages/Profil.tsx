import React, { useEffect, useState } from 'react';
import type { Utilisateur } from '../types/users.types';
import { recupererUtilisateurConnecte } from '../services/user.service';
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { getPrestataireByUser, getEntrepriseByUser } from '../services/profile.service';
import { FiUser, FiMail, FiShield, FiCalendar, FiLogOut, FiBriefcase, FiHome } from 'react-icons/fi';

const Profil: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse text-slate-500">Chargement de votre profil...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-800">Mon Profil</h1>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>

        {/* Section informations utilisateur */}
        {utilisateur && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <FiUser className="text-amber-500" />
                Informations personnelles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <FiUser className="text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Nom complet</p>
                    <p className="font-medium">{utilisateur.nom}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FiMail className="text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{utilisateur.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FiShield className="text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Rôle</p>
                    <p className="font-medium capitalize">{utilisateur.role}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FiCalendar className="text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Membre depuis</p>
                    <p className="font-medium">
                      {new Date(utilisateur.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section profils */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <FiBriefcase className="text-amber-500" />
              Mes profils
            </h2>

            <div className="space-y-6">
              {prestataire && entreprise && (
                <div className="space-y-4">
                  <p className="text-slate-600">Vous avez les deux profils :</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate('/dashboard-prestataire')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FiUser />
                      Dashboard Prestataire
                    </button>
                    <button
                      onClick={() => navigate('/dashboard-entreprise')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FiHome />
                      Dashboard Entreprise
                    </button>
                  </div>
                </div>
              )}

              {prestataire && !entreprise && (
                <div className="space-y-4">
                  <p className="text-slate-600">Vous avez un profil Prestataire.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate(`/prestataire/dashboard/${prestataire._id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FiUser />
                      Dashboard Prestataire
                    </button>
                    <button
                      onClick={() => navigate('/creation-entreprise')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FiHome />
                      Créer profil Entreprise
                    </button>
                  </div>
                </div>
              )}

              {!prestataire && entreprise && (
                <div className="space-y-4">
                  <p className="text-slate-600">Vous avez un profil Entreprise.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate(`/entreprise/dashboard/${entreprise._id}`)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FiHome />
                      Dashboard Entreprise
                    </button>
                    <button
                      onClick={() => navigate('/creation')}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FiUser />
                      Créer profil Prestataire
                    </button>
                  </div>
                </div>
              )}

              {!prestataire && !entreprise && (
                <div className="space-y-4">
                  <p className="text-slate-600">Vous n'avez pas encore de profil actif.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate('/creation')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FiUser />
                      Créer profil Prestataire
                    </button>
                    <button
                      onClick={() => navigate('/creation-entreprise')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FiHome />
                      Créer profil Entreprise
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bouton de déconnexion */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors"
          >
            <FiLogOut />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profil;