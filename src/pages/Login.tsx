import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';           
import { login } from '../services/auth.service';      
import type { ILoginData } from '../types/users.types';

export const Login = () => {
  const navigate = useNavigate();

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

      // Stocke le token dans localStorage
      localStorage.setItem('token', res.token);

      // Affiche un message de succès
      setMessage('Connexion réussie');

      // Redirection vers la page Profil après 1 seconde (pour voir le message)
      setTimeout(() => {
        navigate('/profil');
      }, 1000);

    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Connexion</h1>

      {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        
        <Input label="Mot de passe" name="motDePasse" type="password" value={form.motDePasse} onChange={handleChange} />
        
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
