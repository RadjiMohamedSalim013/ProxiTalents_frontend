import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { IService, IReseaux } from '../../types/prestataire.types';
import { getPrestataireById, updatePrestataire } from '../../services/prestataire.service';

const PageModificationPrestataire: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log('PageModificationPrestataire - ID extrait:', id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    const fetchPrestataire = async () => {
      try {
        if (!id) {
          setError('ID prestataire manquant');
          setLoading(false);
          return;
        }
        const found = await getPrestataireById(id);
        console.log('PageModificationPrestataire - Prestataire récupéré:', found);

        if (found) {
          setBio(found.bio || '');
          setZoneGeographique(found.zoneGeographique || '');
          setDisponibilite(found.disponibilite || '');
          setTelephone(typeof found.userId === 'object' && found.userId !== null ? found.userId.telephone || '' : '');
          setReseaux(found.reseaux || {
            facebook: '',
            instagram: '',
            linkedin: '',
            tiktok: '',
            youtube: '',
            siteWeb: '',
          });
          setServices(found.services || []);
          setError(null);
        } else {
          setError('Profil prestataire non trouvé, redirection vers création...');
          setTimeout(() => {
            navigate('/creation-prestataire');
          }, 2000);
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

  const handleServiceChange = (index: number, field: keyof IService, value: string | number) => {
    const updated = [...services];
    if (field === 'tarif' && typeof value === 'string') {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = value as never;
    }
    setServices(updated);
  };

  const handleAddService = () => {
    setServices([...services, { nom: '', description: '', tarif: 0 }]);
  };

  const handleRemoveService = (index: number) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPrestataire = {
      bio,
      zoneGeographique,
      disponibilite,
      telephone,
      reseaux,
      services,
      id, // Ajout de l'id du prestataire pour la mise à jour
    };



    try {
      console.log('PageModificationPrestataire - Données envoyées pour mise à jour:', updatedPrestataire);
      await updatePrestataire(updatedPrestataire as any);
      alert('Profil prestataire mis à jour avec succès !');
      navigate('/dashboard-prestataire');
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Modifier le profil prestataire</h2>

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
        className="border p-2"
        placeholder="Téléphone (optionnel)"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Services</h3>
        {services.map((service, index) => (
          <div key={index} className="grid grid-cols-4 gap-2">
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
              onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
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
            <button
              type="button"
              onClick={() => handleRemoveService(index)}
              className="text-red-600 underline"
            >
              Supprimer
            </button>
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
        Enregistrer les modifications
      </button>
    </form>
  );
};

export default PageModificationPrestataire;
