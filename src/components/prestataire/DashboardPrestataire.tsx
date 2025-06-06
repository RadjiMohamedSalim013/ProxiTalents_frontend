import React, { useEffect, useState } from 'react';
import type { IPrestataire } from '../../types/prestataire.types';
import { getPrestataires } from '../../services/prestataire.service';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiEdit, FiPlus, FiMapPin, FiClock, FiLink, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { FaTiktok, FaYoutube, FaGlobe } from 'react-icons/fa';

export const DashboardPrestataire: React.FC = () => {
  const [prestataire, setPrestataire] = useState<IPrestataire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrestataire = async () => {
      try {
        const data = await getPrestataires();
        const token = localStorage.getItem('token');
        let userId = '';
        
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.id || payload._id || '';
        }

        const found = data.find((p) => {
          if (typeof p.userId === 'string') {
            return p.userId === userId;
          } else if (typeof p.userId === 'object' && p.userId !== null) {
            return p.userId._id?.toString() === userId || p.userId.toString() === userId;
          }
          return false;
        });

        if (found) {
          setPrestataire(found);
          setError(null);
        } else {
          setError('Profil prestataire non trouvé');
        }
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchPrestataire();
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

  if (!prestataire) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Tableau de bord Prestataire</h1>
            <p className="text-slate-600 mt-2">
              Gérer vos services et votre profil
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => navigate(`/prestataire/ajout-service/${prestataire._id}`)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition"
            >
              <FiPlus />
              Ajouter un service
            </button>
            <button
              onClick={() => navigate(`/prestataire/modification/${prestataire._id}`)}
              className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition"
            >
              <FiEdit />
              Modifier le profil
            </button>
          </div>
        </div>

        {/* Section profil */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <FiUser className="text-amber-500" />
              Mon profil
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <FiUser className="text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Nom</p>
                  <p className="font-medium">
                    {typeof prestataire.userId === 'object' && prestataire.userId !== null 
                      ? prestataire.userId.nom 
                      : 'Nom inconnu'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Zone géographique</p>
                  <p className="font-medium">
                    {prestataire.zoneGeographique || 'Non spécifiée'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock className="text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Disponibilité</p>
                  <p className="font-medium">
                    {prestataire.disponibilite || 'Non spécifiée'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-slate-400 mt-1 w-5 h-5 flex items-center justify-center">📝</div>
                <div>
                  <p className="text-sm text-slate-500">Bio</p>
                  <p className="font-medium">
                    {prestataire.bio || 'Pas de bio'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section services */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <div className="text-amber-500">🛠️</div>
              Mes services
            </h2>

            {prestataire.services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prestataire.services.map((service, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">{service.nom}</h3>
                    {service.tarif && (
                      <p className="text-amber-600 font-medium mb-2">
                        {service.tarif} FCFA
                      </p>
                    )}
                    <p className="text-slate-600 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">Aucun service enregistré</p>
            )}
          </div>
        </div>

        {/* Section médias */}
        {prestataire.medias && prestataire.medias.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <div className="text-amber-500">📷</div>
                Mes médias
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {prestataire.medias.map((media, index) => {
                  const mediaUrl = media.url.startsWith('http') 
                    ? media.url 
                    : `${import.meta.env.VITE_BACKEND_URL || ''}${media.url}`;
                  
                  return (
                    <div key={index} className="rounded-lg overflow-hidden border border-slate-200">
                      {media.type === 'image' ? (
                        <img 
                          src={mediaUrl} 
                          alt={media.description || 'Media'} 
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <video className="w-full h-40 object-cover" controls>
                          <source src={mediaUrl} type="video/mp4" />
                        </video>
                      )}
                      {media.description && (
                        <p className="text-xs text-slate-600 p-2 truncate">
                          {media.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Section réseaux sociaux */}
        {prestataire.reseaux && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <FiLink className="text-amber-500" />
                Mes réseaux sociaux
              </h2>

              <div className="flex flex-wrap gap-4">
                {prestataire.reseaux.facebook && (
                  <a 
                    href={prestataire.reseaux.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    <FiFacebook />
                    Facebook
                  </a>
                )}

                {prestataire.reseaux.instagram && (
                  <a 
                    href={prestataire.reseaux.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg"
                  >
                    <FiInstagram />
                    Instagram
                  </a>
                )}

                {prestataire.reseaux.linkedin && (
                  <a 
                    href={prestataire.reseaux.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    <FiLinkedin />
                    LinkedIn
                  </a>
                )}

                {prestataire.reseaux.tiktok && (
                  <a 
                    href={prestataire.reseaux.tiktok} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
                  >
                    <FaTiktok />
                    TikTok
                  </a>
                )}

                {prestataire.reseaux.youtube && (
                  <a 
                    href={prestataire.reseaux.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    <FaYoutube />
                    YouTube
                  </a>
                )}

                {prestataire.reseaux.siteWeb && (
                  <a 
                    href={prestataire.reseaux.siteWeb} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg"
                  >
                    <FaGlobe />
                    Site Web
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};