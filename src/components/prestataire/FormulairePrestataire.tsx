import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPrestataire } from '../../services/prestataire.service';
import type { IPrestataire, IService, IMedia, IReseaux } from '../../types/prestataire.types';

const PrestataireForm: React.FC = () => {
  const navigate = useNavigate();

  const [bio, setBio] = useState<string>('');
  const [zoneGeographique, setZoneGeographique] = useState<string>('');
  const [disponibilite, setDisponibilite] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [reseaux, setReseaux] = useState<IReseaux>({
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
    siteWeb: '',
  });

  const [services, setServices] = useState<IService[]>([
    { nom: '', description: '', tarif: 0 },
  ]);

  const [medias, setMedias] = useState<IMedia[]>([
    { type: 'image', url: '', description: '' },
  ]);

  const handleAddService = () => {
    setServices([...services, { nom: '', description: '', tarif: 0 }]);
  };

  const handleAddMedia = () => {
    setMedias([...medias, { type: 'image', url: '', description: '' }]);
  };

  const handleServiceChange = (index: number, field: keyof IService, value: string | number) => {
    const updated = [...services];
    if (field === 'tarif' && typeof value === 'string') {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = value as never;
    }
    setServices(updated);
  };

  const handleMediaChange = (index: number, field: keyof IMedia, value: string) => {
    const updated = [...medias];
    if (field === 'type') {
      updated[index][field] = value as 'image' | 'video';
    } else {
      updated[index][field] = value as never;
    }
    setMedias(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profil: Omit<IPrestataire, 'userId' | '_id'> = {
      bio,
      zoneGeographique,
      disponibilite,
      telephone,
      reseaux,
      services,
      medias,
    };

    console.log('Profil à envoyer :', profil);

    try {
      await createPrestataire(profil);
      alert('Profil prestataire créé avec succès !');
      navigate('/dashboard');
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Créer un profil prestataire</h2>

      <textarea
        className="w-full border p-2"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Zone géographique"
        value={zoneGeographique}
        onChange={(e) => setZoneGeographique(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Disponibilité"
        value={disponibilite}
        onChange={(e) => setDisponibilite(e.target.value)}
      />
      <input
        className="w-full border p-2"
        placeholder="Téléphone (optionnel)"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Services</h3>
        {services.map((service, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <input
              className="border p-2"
              placeholder="Nom"
              value={service.nom}
              onChange={(e) => handleServiceChange(index, 'nom', e.target.value)}
              required
            />
            <input
              className="border p-2"
              placeholder="Description"
              value={service.description}
              onChange={(e) =>
                handleServiceChange(index, 'description', e.target.value)
              }
              required
            />
            <input
              type="number"
              className="border p-2"
              placeholder="Tarif"
              value={service.tarif}
              onChange={(e) => handleServiceChange(index, 'tarif', e.target.value)}
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddService}
          className="text-blue-600 underline"
        >
          + Ajouter un service
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Médias</h3>
        {medias.map((media, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <label htmlFor={`media-type-${index}`} className="sr-only">Type de média</label>
            <select
              id={`media-type-${index}`}
              className="border p-2"
              value={media.type}
              onChange={(e) => handleMediaChange(index, 'type', e.target.value as 'image' | 'video')}
            >
              <option value="image">Image</option>
              <option value="video">Vidéo</option>
            </select>
            <input
              className="border p-2"
              placeholder="URL"
              value={media.url}
              onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
            />
            <input
              className="border p-2"
              placeholder="Description"
              value={media.description}
              onChange={(e) => handleMediaChange(index, 'description', e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMedia}
          className="text-blue-600 underline"
        >
          + Ajouter un média
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <input
          className="border p-2"
          placeholder="Facebook"
          value={reseaux.facebook}
          onChange={(e) => setReseaux({ ...reseaux, facebook: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Instagram"
          value={reseaux.instagram}
          onChange={(e) => setReseaux({ ...reseaux, instagram: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Linkedin"
          value={reseaux.linkedin}
          onChange={(e) => setReseaux({ ...reseaux, linkedin: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="TikTok"
          value={reseaux.tiktok}
          onChange={(e) => setReseaux({ ...reseaux, tiktok: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="YouTube"
          value={reseaux.youtube}
          onChange={(e) => setReseaux({ ...reseaux, youtube: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Site Web"
          value={reseaux.siteWeb}
          onChange={(e) => setReseaux({ ...reseaux, siteWeb: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Créer le profil
      </button>
    </form>
  );
};

export default PrestataireForm;
