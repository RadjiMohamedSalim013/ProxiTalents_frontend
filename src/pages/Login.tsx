import { useState } from 'react';
import { Input } from '../components/Input';           
import { login } from '../services/auth.service';      
import type { ILoginData } from '../types/users.types';

export const Login = () => {
  // État local pour stocker les données du formulaire de connexion avec typage
  const [form, setForm] = useState<ILoginData>({
    email: '',          
    motDePasse: '',     
  });

  // État local pour afficher un message (succès ou erreur)
  const [message, setMessage] = useState('');

  // Fonction qui met à jour l'état du formulaire à chaque changement dans un input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value }); 
  };

  // Gestionnaire de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      // Appelle la fonction login avec les données du formulaire
      const res = await login(form);

      // Affiche un message de succès retourné par l'API ou un message par défaut
      setMessage(res.message || 'Connexion réussie');

    } catch (error: any) {
      // En cas d'erreur, affiche le message d'erreur renvoyé par l'API ou un message générique
      setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    // Conteneur principal du formulaire avec styles Tailwind CSS
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Connexion</h1>

      {/* Affiche un message d'erreur ou de succès si présent */}
      {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}

      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit}>
        {/* Champ Email */}
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        
        {/* Champ Mot de passe (type password) */}
        <Input label="Mot de passe" name="motDePasse" type="password" value={form.motDePasse} onChange={handleChange} />
        
        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};
