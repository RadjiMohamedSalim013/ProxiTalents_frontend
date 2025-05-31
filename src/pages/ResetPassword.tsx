// pages/ResetPassword.tsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/auth.service';
import type { ResetPasswordRequest } from '../types/users.types';

export const ResetPassword = () => {
  const { token } = useParams(); // récupère le token dans l'URL
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("Token invalide.");
      return;
    }

    const data: ResetPasswordRequest = {
      token,
      nouveauMotDePasse: password,
    };

    try {
      const res = await resetPassword(data);
      setMessage(res.message);
      setTimeout(() => navigate('/login'), 3000); // redirige vers login après 3s
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erreur lors de la réinitialisation.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Nouveau mot de passe</h1>
      {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-700">Nouveau mot de passe</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
};
