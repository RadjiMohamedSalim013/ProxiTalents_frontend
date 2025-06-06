import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPrestataire } from '../../services/prestataire.service';
import type { IService, IReseaux } from '../../types/prestataire.types';

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

  // Suppression complète de la variable medias pour éviter le type implicite any[]

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleAddService = () => {
    setServices([...services, { nom: '', description: '', tarif: 0 }]);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('zoneGeographique', zoneGeographique);
    formData.append('disponibilite', disponibilite);
    formData.append('telephone', telephone);

    formData.append('reseaux[facebook]', reseaux.facebook || '');
    formData.append('reseaux[instagram]', reseaux.instagram || '');
    formData.append('reseaux[linkedin]', reseaux.linkedin || '');
    formData.append('reseaux[tiktok]', reseaux.tiktok || '');
    formData.append('reseaux[youtube]', reseaux.youtube || '');
    formData.append('reseaux[siteWeb]', reseaux.siteWeb || '');

      services.forEach((service, index) => {
      formData.append(`services[${index}][nom]`, service.nom);
      formData.append(`services[${index}][description]`, service.description || '');
      formData.append(`services[${index}][tarif]`, (service.tarif ?? 0).toString());
    });

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append('medias', file);
      });
    }

    try {
      await createPrestataire(formData);
      alert('Profil prestataire créé avec succès !');
      navigate('/dashboard-prestataire');
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6" encType="multipart/form-data">
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
              value={service.tarif ?? 0}
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
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
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
