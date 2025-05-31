import { useState } from 'react';
import { forgotPassword } from '../services/auth.service'; // fonction pour envoyer email reset
import type { ForgotPasswordRequest } from '../types/users.types';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email } as ForgotPasswordRequest);
      setMessage(res.message || 'Email envoyé, vérifiez votre boîte mail.');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erreur lors de l’envoi de l’email');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Mot de passe oublié</h1>
      {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Votre email"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Envoyer le lien de réinitialisation
        </button>
      </form>
    </div>
  );
};
