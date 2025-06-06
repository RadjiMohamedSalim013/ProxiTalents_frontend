import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addServiceToPrestataire } from '../../services/prestataire.service';
import { FiPlusCircle, FiDollarSign, FiFileText, FiArrowLeft } from 'react-icons/fi';

const FormulaireService: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log('FormulaireService - ID prestataire extrait:', id);

  const [nom, setNom] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tarif, setTarif] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newService = {
      nom,
      description: description || '',
      tarif,
      prestataireId: id,
    };

    console.log('FormulaireService - Données du service à ajouter:', newService);

    try {
      await addServiceToPrestataire(newService);
      alert('Service ajouté avec succès !');
      navigate('/dashboard-prestataire');
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* En-tête avec bouton retour */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 transition"
          >
            <FiArrowLeft />
            Retour
          </button>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FiPlusCircle className="text-amber-500" />
            Nouveau service
          </h2>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-slate-700 mb-1">
              Nom du service
            </label>
            <div className="relative">
              <input
                id="nom"
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                placeholder="Ex: Réparation électrique"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFileText className="text-slate-400" />
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
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition min-h-[100px]"
              placeholder="Décrivez votre service en détail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Champ Tarif */}
          <div>
            <label htmlFor="tarif" className="block text-sm font-medium text-slate-700 mb-1">
              Tarif (FCFA)
            </label>
            <div className="relative">
              <input
                id="tarif"
                type="number"
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                placeholder="0"
                value={tarif}
                onChange={(e) => setTarif(Number(e.target.value))}
                required
                min="0"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
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
                En cours...
              </>
            ) : (
              <>
                <FiPlusCircle />
                Ajouter le service
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormulaireService;