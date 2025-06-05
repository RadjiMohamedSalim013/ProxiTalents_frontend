import React, { useEffect, useState } from 'react';
import type { IPrestataire } from '../../types/prestataire.types';
import { getPrestataires } from '../../services/prestataire.service';
import { useNavigate } from 'react-router-dom';

export const DashboardPrestataire: React.FC = () => {
  const [prestataire, setPrestataire] = useState<IPrestataire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrestataire = async () => {
      try {
        const data = await getPrestataires();

        // Récupérer le token et extraire l'ID utilisateur
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
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!prestataire) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Prestataire</h1>
      <button
        onClick={() => {
          console.log('DashboardPrestataire - ID utilisé pour ajout service:', prestataire?._id);
          navigate(`/prestataire/ajout-service/${prestataire?._id}`);
        }}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Ajouter un service
      </button>
      <p className="mb-2"><strong>Nom:</strong> {typeof prestataire.userId === 'object' && prestataire.userId !== null ? prestataire.userId.nom : 'Nom inconnu'}</p>
      <p className="mb-2"><strong>Bio:</strong> {prestataire.bio || 'Pas de bio'}</p>
      <p className="mb-2"><strong>Zone géographique:</strong> {prestataire.zoneGeographique || 'Non spécifiée'}</p>
      <p className="mb-2"><strong>Disponibilité:</strong> {prestataire.disponibilite || 'Non spécifiée'}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Services</h2>
        <ul className="list-disc ml-5">
          {prestataire.services.map((service, index) => (
            <li key={index}>
              {service.nom} {service.tarif && `- ${service.tarif} FCFA`}
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
      {prestataire.medias && prestataire.medias.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Médias</h2>
          <div className="grid grid-cols-3 gap-4">
            {prestataire.medias.map((media, index) => {
              // Préfixer l'URL si nécessaire (ex: ajouter le chemin backend)
              const mediaUrl = media.url.startsWith('http') ? media.url : `${import.meta.env.VITE_BACKEND_URL || ''}${media.url}`;
              return (
                <div key={index}>
                  {media.type === 'image' ? (
                    <img src={mediaUrl} alt={media.description || 'Media'} className="w-full h-auto rounded" />
                  ) : (
                    <video controls className="w-full h-auto rounded">
                      <source src={mediaUrl} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                  )}
                  {media.description && <p>{media.description}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {prestataire.reseaux && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Réseaux sociaux</h2>
          <ul>
            {prestataire.reseaux.facebook && <li><a href={prestataire.reseaux.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>}
            {prestataire.reseaux.instagram && <li><a href={prestataire.reseaux.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>}
            {prestataire.reseaux.linkedin && <li><a href={prestataire.reseaux.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
            {prestataire.reseaux.tiktok && <li><a href={prestataire.reseaux.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></li>}
            {prestataire.reseaux.youtube && <li><a href={prestataire.reseaux.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>}
            {prestataire.reseaux.siteWeb && <li><a href={prestataire.reseaux.siteWeb} target="_blank" rel="noopener noreferrer">Site Web</a></li>}
          </ul>
        </div>
      )}
      <button
        onClick={() => navigate(`/prestataire/modification/${prestataire._id}`)}
        className="text-blue-600 underline bg-transparent border-none p-0 cursor-pointer"
      >
        Modifier le profil
      </button>


    </div>
  );
};
