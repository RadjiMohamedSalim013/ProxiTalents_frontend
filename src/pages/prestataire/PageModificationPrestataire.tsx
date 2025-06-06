import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { IService, IReseaux } from '../../types/prestataire.types';
import { getPrestataireById, updatePrestataire } from '../../services/prestataire.service';
import { FiEdit, FiTrash2, FiPlus, FiSave, FiArrowLeft, FiFacebook, FiInstagram, FiLinkedin, FiPhone, FiGlobe } from 'react-icons/fi';
import { FaTiktok, FaYoutube } from 'react-icons/fa';

const PageModificationPrestataire: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
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
          setError('Profil prestataire non trouvé');
          setTimeout(() => navigate('/creation-prestataire'), 2000);
        }
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchPrestataire();
  }, [id, navigate]);

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
      id,
    };

    try {
      await updatePrestataire(updatedPrestataire as any);
      alert('Profil prestataire mis à jour avec succès !');
      navigate('/dashboard-prestataire');
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête avec bouton retour */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 transition"
          >
            <FiArrowLeft />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FiEdit className="text-amber-500" />
            Modifier mon profil
          </h1>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
          {/* Section informations de base */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">
              Informations générales
            </h2>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-1">
                Bio / Présentation
              </label>
              <textarea
                id="bio"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition min-h-[100px]"
                placeholder="Décrivez votre activité, vos compétences..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="zoneGeographique" className="block text-sm font-medium text-slate-700 mb-1">
                  Zone géographique
                </label>
                <input
                  id="zoneGeographique"
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="Ex: Abidjan, Cocody"
                  value={zoneGeographique}
                  onChange={(e) => setZoneGeographique(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="disponibilite" className="block text-sm font-medium text-slate-700 mb-1">
                  Disponibilité
                </label>
                <input
                  id="disponibilite"
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="Ex: Lundi-Vendredi, 9h-18h"
                  value={disponibilite}
                  onChange={(e) => setDisponibilite(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-slate-700 mb-1">
                  Téléphone
                </label>
                <div className="relative">
                  <input
                    id="telephone"
                    type="tel"
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    placeholder="Votre numéro"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section services */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-slate-800">
                Services proposés
              </h2>
              <button
                type="button"
                onClick={handleAddService}
                className="text-amber-600 hover:text-amber-800 flex items-center gap-1 text-sm"
              >
                <FiPlus />
                Ajouter un service
              </button>
            </div>

            {services.length === 0 ? (
              <p className="text-slate-500 text-center py-4">
                Aucun service ajouté
              </p>
            ) : (
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b pb-4">
                    <div className="md:col-span-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                        placeholder="Nom du service"
                        value={service.nom}
                        onChange={(e) => handleServiceChange(index, 'nom', e.target.value)}
                        required
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                        placeholder="Description du service"
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Tarif (FCFA)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                        placeholder="0"
                        value={service.tarif ?? 0}
                        onChange={(e) => handleServiceChange(index, 'tarif', e.target.value)}
                        required
                        min="0"
                      />
                    </div>

                    <div className="md:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Supprimer ce service"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section réseaux sociaux */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">
              Réseaux sociaux
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <FiFacebook className="text-blue-600" />
                  Facebook
                </label>
                <input
                  id="facebook"
                  type="url"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="https://facebook.com/votreprofil"
                  value={reseaux.facebook}
                  onChange={(e) => setReseaux({ ...reseaux, facebook: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <FiInstagram className="text-pink-600" />
                  Instagram
                </label>
                <input
                  id="instagram"
                  type="url"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="https://instagram.com/votreprofil"
                  value={reseaux.instagram}
                  onChange={(e) => setReseaux({ ...reseaux, instagram: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <FiLinkedin className="text-blue-700" />
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  type="url"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="https://linkedin.com/in/votreprofil"
                  value={reseaux.linkedin}
                  onChange={(e) => setReseaux({ ...reseaux, linkedin: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="tiktok" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <FaTiktok className="text-black" />
                  TikTok
                </label>
                <input
                  id="tiktok"
                  type="url"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="https://tiktok.com/@votreprofil"
                  value={reseaux.tiktok}
                  onChange={(e) => setReseaux({ ...reseaux, tiktok: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="youtube" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <FaYoutube className="text-red-600" />
                  YouTube
                </label>
                <input
                  id="youtube"
                  type="url"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="https://youtube.com/votrechaine"
                  value={reseaux.youtube}
                  onChange={(e) => setReseaux({ ...reseaux, youtube: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="siteWeb" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <FiGlobe className="text-blue-500" />
                  Site Web
                </label>
                <input
                  id="siteWeb"
                  type="url"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="https://votresite.com"
                  value={reseaux.siteWeb}
                  onChange={(e) => setReseaux({ ...reseaux, siteWeb: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FiSave />
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageModificationPrestataire;