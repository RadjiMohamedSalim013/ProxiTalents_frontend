import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addServiceToPrestataire } from '../../services/prestataire.service';

const FormulaireService: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log('FormulaireService - ID prestataire extrait:', id);

  const [nom, setNom] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tarif, setTarif] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Ajouter un service</h2>

      <input
        className="w-full border p-2"
        placeholder="Nom du service"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Tarif"
        value={tarif}
        onChange={(e) => setTarif(Number(e.target.value))}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Ajouter le service
      </button>
    </form>
  );
};

export default FormulaireService;
