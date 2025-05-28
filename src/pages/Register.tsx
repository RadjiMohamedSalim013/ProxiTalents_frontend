// Import des hooks React et des composants/services nécessaires
import { useState } from 'react';
import { Input } from '../components/Input';          
import { register } from '../services/auth.service'; 
import '../App.css' 

export const Register = () => {
  // État local pour stocker les valeurs du formulaire d'inscription
  const [form, setForm] = useState({
    nom: '',            
    email: '',          
    motDePasse: '',    
    role: 'utilisateur' 
  });

  // État local pour afficher un message (succès ou erreur)
  const [message, setMessage] = useState('');

  // Gestionnaire pour mettre à jour les champs du formulaire à chaque saisie
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      // Appelle la fonction d'inscription avec les données du formulaire
      const res = await register(form);
      // Affiche le message de succès retourné par l'API ou un message par défaut
      setMessage(res.message || 'Inscription réussie');
    } catch (error: any) {
      // En cas d'erreur, affiche le message d'erreur retourné ou un message générique
      setMessage(error.response?.data?.message || 'Erreur lors de l’inscription');
    }
  };

  return (
    
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Inscription</h1>
      
      {/* Affichage conditionnel du message (erreur ou succès) */}
      {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}

      {/* Formulaire d'inscription */}
      <form onSubmit={handleSubmit}>
        {/* Champ Nom */}
        <Input label="Nom" name="nom" value={form.nom} onChange={handleChange} />
        
        {/* Champ Email */}
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        
        {/* Champ Mot de passe (type password pour cacher la saisie) */}
        <Input label="Mot de passe" name="motDePasse" type="password" value={form.motDePasse} onChange={handleChange} />
        
        {/* Sélecteur du rôle */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rôle</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
          >
            {/* Options possibles */}
            <option value="utilisateur">Utilisateur</option>
            <option value="prestataire">Prestataire</option>
            <option value="entreprise">Entreprise</option>
          </select>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          S’inscrire
        </button>
      </form>
    </div>
  );
};
