import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntreprise } from '../../services/entreprise.service';
import type { IEntreprise } from '../../types/entreprise.types';

const FormulaireEntreprise: React.FC = () => {
  const navigate = useNavigate();

  const [nom, setNom] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [adresse, setAdresse] = useState<string>('');
  const [ville, setVille] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [secteurActivite, setSecteurActivite] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      nom,
      description,
      adresse,
      ville,
      telephone,
      email,
      secteurActivite,
    };

    try {
      const token = localStorage.getItem('token');
      console.log('Token avant création entreprise:', token);
      await createEntreprise(data);
      alert('Profil entreprise créé avec succès !');
      navigate('/dashboard-entreprise');
    } catch (error: unknown) {
      let message = 'Erreur inconnue';
      if (error instanceof Error) {
        message = error.message;
      }
      alert(`Erreur : ${message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Créer un profil entreprise</h2>

      <input
        className="w-full border p-2"
        placeholder="Nom"
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
        className="w-full border p-2"
        placeholder="Adresse"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Ville"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Téléphone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />

      <input
        className="w-full border p-2"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Secteur d'activité"
        value={secteurActivite}
        onChange={(e) => setSecteurActivite(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Créer le profil
      </button>
    </form>
  );
};

export default FormulaireEntreprise;
