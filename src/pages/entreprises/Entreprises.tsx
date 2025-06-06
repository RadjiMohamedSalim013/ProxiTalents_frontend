import React, { useEffect, useState } from 'react';
import { getAllEntreprises } from '../../services/entreprise.service';
import type { IEntreprise } from '../../types/entreprise.types';

const Entreprises: React.FC = () => {
  const [entreprises, setEntreprises] = useState<IEntreprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const data = await getAllEntreprises();
        setEntreprises(data);
        setError(null);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Erreur lors du chargement des entreprises');
      } finally {
        setLoading(false);
      }
    };

    fetchEntreprises();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des entreprises</h1>
      <ul className="space-y-4">
        {entreprises.map((entreprise) => (
          <li key={entreprise._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{entreprise.nom}</h2>
            <p><strong>Description:</strong> {entreprise.description || 'Pas de description'}</p>
            <p><strong>Adresse:</strong> {entreprise.adresse}</p>
            <p><strong>Ville:</strong> {entreprise.ville}</p>
            <p><strong>Téléphone:</strong> {entreprise.telephone || 'Non spécifié'}</p>
            <p><strong>Email:</strong> {entreprise.email}</p>
            <p><strong>Secteur d'activité:</strong> {entreprise.secteurActivite}</p>
            {/* Ajouter un bouton ou lien pour contacter ou voir plus de détails */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Entreprises;
