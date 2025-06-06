import React, { useEffect, useState } from 'react';
import type { IEntreprise } from '../../types/entreprise.types';
import { getAllEntreprises } from '../../services/entreprise.service';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiEdit, FiPlus, FiList, FiMail, FiPhone, FiMapPin, FiUsers } from 'react-icons/fi';

const PageDashboardEntreprise: React.FC = () => {
  const [entreprise, setEntreprise] = useState<IEntreprise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntreprise = async () => {
      try {
        const data = await getAllEntreprises();
        const token = localStorage.getItem('token');
        let userId = '';
        
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.id || payload._id || '';
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
        } else {
          setError('Profil entreprise non trouvé');
        }
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchEntreprise();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    </div>
  );

  if (!entreprise) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <FiBriefcase className="text-amber-500" />
              Tableau de bord Entreprise
            </h1>
            <p className="text-slate-600 mt-2">
              Gérer votre profil et vos offres d'emploi
            </p>
          </div>
          <button
            onClick={() => navigate(`/modification-entreprise/${entreprise._id}`)}
            className="mt-4 md:mt-0 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition"
          >
            <FiEdit />
            Modifier le profil
          </button>
        </div>

        {/* Section profil */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Informations de l'entreprise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <FiBriefcase className="text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Nom</p>
                  <p className="font-medium">{entreprise.nom || 'Non spécifié'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiUsers className="text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Secteur d'activité</p>
                  <p className="font-medium">{entreprise.secteurActivite || 'Non spécifié'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Ville</p>
                  <p className="font-medium">{entreprise.ville || 'Non spécifiée'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium">{entreprise.email || 'Non spécifié'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">WhatsApp</p>
                  <p className="font-medium">{entreprise.whatsapp || 'Non spécifié'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-slate-400 mt-1 w-5 h-5 flex items-center justify-center">📝</div>
                <div>
                  <p className="text-sm text-slate-500">Description</p>
                  <p className="font-medium">{entreprise.description || 'Pas de description'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FiList className="text-amber-500" />
              Gestion des offres
            </h3>
            <p className="text-slate-600 mb-4">
              Consultez et gérez toutes vos offres d'emploi publiées
            </p>
            <button
              onClick={() => navigate('/gestion-offres')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FiList />
              Accéder à la gestion
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FiPlus className="text-amber-500" />
              Nouvelle offre
            </h3>
            <p className="text-slate-600 mb-4">
              Publiez une nouvelle offre d'emploi pour attirer des talents
            </p>
            <button
              onClick={() => navigate('/creation-offre')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FiPlus />
              Créer une offre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashboardEntreprise;