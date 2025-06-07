import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntreprise } from '../../services/entreprise.service';

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-10 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-gray-800">Créer un profil entreprise</h2>

        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          required
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          required
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Secteur d'activité"
          value={secteurActivite}
          onChange={(e) => setSecteurActivite(e.target.value)}
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold"
        >
          Créer le profil
        </button>
      </form>
    </div>
  );
};

export default FormulaireEntreprise;
