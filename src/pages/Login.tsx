import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import type { ILoginData, ILoginResponse } from '../types/users.types';

export const Login = () => {
  const [form, setForm] = useState<ILoginData>({ email: '', motDePasse: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: ILoginResponse = await login(form);

      // Stocker le token dans localStorage
      localStorage.setItem('token', res.token);

      // Extraire le rôle
      const role = res.utilisateur.role;

      // Rediriger selon le rôle
      if (role === 'utilisateur') {
        navigate('/dashboard/utilisateur');
      } else if (role === 'prestataire') {
        navigate('/dashboard/prestataire');
      } else if (role === 'entreprise') {
        navigate('/dashboard/entreprise');
      } else {
        navigate('/profil'); // fallback
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Connexion</h1>
      {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input-class"
          required
        />
        <input
          type="password"
          name="motDePasse"
          placeholder="Mot de passe"
          value={form.motDePasse}
          onChange={handleChange}
          className="input-class"
          required
        />
        <button type="submit" className="btn-class">
          Se connecter
        </button>
      </form>
    </div>
  );
};
