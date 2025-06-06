import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEntrepriseByUser, updateEntreprise } from '../../services/entreprise.service';
import { FiSave, FiArrowLeft, FiBriefcase, FiMapPin, FiPhone, FiMail, FiGlobe, FiEdit2 } from 'react-icons/fi';

const PageModificationEntreprise: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    ville: '',
    whatsapp: '',
    email: '',
    siteWeb: '',
    secteurActivite: ''
  });

  useEffect(() => {
    const fetchEntreprise = async () => {
      try {
        const data = await getEntrepriseByUser();
        if (data) {
          setFormData({
            nom: data.nom,
            description: data.description || '',
            ville: data.ville,
            whatsapp: data.whatsapp || '',
            email: data.email,
            siteWeb: data.siteWeb || '',
            secteurActivite: data.secteurActivite
          });
          setError(null);
        } else {
          setError('Fiche entreprise non trouvée');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erreur lors du chargement');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEntreprise();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateEntreprise(formData);
      alert('Fiche entreprise mise à jour avec succès');
      navigate('/profil');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête avec bouton retour */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
          >
            <FiArrowLeft />
            Retour
          </button>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FiEdit2 className="text-amber-500" />
            Modifier votre entreprise
          </h2>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Champ Nom */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-slate-700 mb-1">
                Nom de l'entreprise *
              </label>
              <div className="relative">
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  placeholder="Ex: Ma Société SARL"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Champ Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Décrivez votre entreprise en quelques mots..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition min-h-[120px]"
              />
            </div>

            {/* Champ Ville */}
            <div>
              <label htmlFor="ville" className="block text-sm font-medium text-slate-700 mb-1">
                Ville *
              </label>
              <div className="relative">
                <input
                  id="ville"
                  name="ville"
                  type="text"
                  placeholder="Ex: Abidjan"
                  value={formData.ville}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Champ WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700 mb-1">
                WhatsApp
              </label>
              <div className="relative">
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  placeholder="Ex: +225 07 00 00 00 00"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ex: contact@entreprise.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Champ Site Web */}
            <div>
              <label htmlFor="siteWeb" className="block text-sm font-medium text-slate-700 mb-1">
                Site Web
              </label>
              <div className="relative">
                <input
                  id="siteWeb"
                  name="siteWeb"
                  type="url"
                  placeholder="Ex: https://www.entreprise.com"
                  value={formData.siteWeb}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiGlobe className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Champ Secteur d'activité */}
            <div>
              <label htmlFor="secteurActivite" className="block text-sm font-medium text-slate-700 mb-1">
                Secteur d'activité *
              </label>
              <div className="relative">
                <input
                  id="secteurActivite"
                  name="secteurActivite"
                  type="text"
                  placeholder="Ex: Informatique, Restauration, etc."
                  value={formData.secteurActivite}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageModificationEntreprise;
