import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { IPrestataire } from '../../types/prestataire.types';
import { getPrestataires } from '../../services/prestataire.service';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaGlobe, FaClock, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const PageProfilPrestataire: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prestataire, setPrestataire] = useState<IPrestataire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestataire = async () => {
      try {
        const data = await getPrestataires();
        const found = data.find((p) => p._id === id);
        if (found) {
          setPrestataire(found);
          setError(null);
        } else {
          setError('Prestataire non trouvé');
        }
      } catch (error: unknown) {
        let message = 'Erreur inconnue';
        if (error instanceof Error) {
          message = error.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrestataire();
  }, [id]);

  if (loading) return <div className="text-center py-10">Chargement en cours...</div>;
  if (error) return <div className="text-red-600 text-center py-10 text-xl">{error}</div>;
  if (!prestataire) return null;

  const nomPrestataire = typeof prestataire.userId === 'object' && prestataire.userId !== null ? prestataire.userId.nom : 'Nom inconnu';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header avec photo de profil et infos de base */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            {prestataire.medias?.find(m => m.type === 'image') ? (
              <img 
                src={prestataire.medias.find(m => m.type === 'image')?.url || ''} 
                alt={nomPrestataire}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-400 text-6xl" />
            )}
          </div>
        </div>
        
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{nomPrestataire}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              <span>{prestataire.zoneGeographique || 'Zone non spécifiée'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2" />
              <span>{prestataire.disponibilite || 'Disponibilité non spécifiée'}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">À propos</h2>
            <p className="text-gray-600">{prestataire.bio || 'Pas de bio disponible'}</p>
          </div>
        </div>
      </div>

      {/* Section Services */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Services proposés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestataire.services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.nom}</h3>
              {service.tarif && (
                <p className="text-blue-600 font-medium mb-3">{service.tarif} FCFA</p>
              )}
              <p className="text-gray-600">{service.description || 'Aucune description disponible'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Médias */}
      {prestataire.medias && prestataire.medias.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {prestataire.medias.map((media, index) => {
              const mediaUrl = media.url.startsWith('http') ? media.url : `${import.meta.env.VITE_BACKEND_URL || ''}${media.url}`;
              return (
                <div key={index} className="rounded-lg overflow-hidden bg-gray-100 aspect-square">
                  {media.type === 'image' ? (
                    <img 
                      src={mediaUrl} 
                      alt={media.description || 'Media'} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  ) : (
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                    >
                      <source src={mediaUrl} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Section Réseaux sociaux */}
      {prestataire.reseaux && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Réseaux sociaux</h2>
          <div className="flex flex-wrap gap-4">
            {prestataire.reseaux.facebook && (
              <a 
                href={prestataire.reseaux.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaFacebook className="mr-2" />
                Facebook
              </a>
            )}
            {prestataire.reseaux.instagram && (
              <a 
                href={prestataire.reseaux.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <FaInstagram className="mr-2" />
                Instagram
              </a>
            )}
            {prestataire.reseaux.linkedin && (
              <a 
                href={prestataire.reseaux.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <FaLinkedin className="mr-2" />
                LinkedIn
              </a>
            )}
            {prestataire.reseaux.tiktok && (
              <a 
                href={prestataire.reseaux.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FaTiktok className="mr-2" />
                TikTok
              </a>
            )}
            {prestataire.reseaux.youtube && (
              <a 
                href={prestataire.reseaux.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaYoutube className="mr-2" />
                YouTube
              </a>
            )}
            {prestataire.reseaux.siteWeb && (
              <a 
                href={prestataire.reseaux.siteWeb} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FaGlobe className="mr-2" />
                Site Web
              </a>
            )}
          </div>
        </section>
      )}

      {/* Bouton de contact */}
      <div className="mt-8 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-md">
          Contacter ce prestataire
        </button>
      </div>
    </div>
  );
};

export default PageProfilPrestataire;