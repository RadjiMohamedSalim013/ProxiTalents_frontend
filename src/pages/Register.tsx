import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth.service';
import type { IRegisterInput } from '../types/users.types';
import { FiUser, FiMail, FiLock, FiLogIn } from 'react-icons/fi';

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<IRegisterInput>({
    nom: '',
    email: '',
    motDePasse: ''
  });
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await register(form);
      setMessage({ text: (res as { message?: string }).message || 'Inscription réussie !', type: 'success' });
      navigate('/login');
    } catch (error: unknown) {
      setMessage({ 
        text: (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erreur lors de l\'inscription', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* En-tête avec dégradé */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 py-6 px-8 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiUser className="text-amber-400" />
            Créer un compte ProxiTalents
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Rejoignez notre communauté de talents
          </p>
        </div>

        {/* Corps du formulaire */}
        <div className="p-8">
          {/* Message d'état */}
          {message && (
            <div className={`mb-6 p-3 rounded-lg text-sm flex items-center ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-600' 
                : 'bg-red-50 text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Nom */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-slate-700 mb-1">
                Nom complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-slate-400" />
                </div>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={form.nom}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label htmlFor="motDePasse" className="block text-sm font-medium text-slate-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-slate-400" />
                </div>
                <input
                  id="motDePasse"
                  name="motDePasse"
                  type="password"
                  value={form.motDePasse}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Minimum 8 caractères avec des chiffres et lettres
              </p>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition flex items-center justify-center ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création du compte...
                </>
              ) : (
                'S\'inscrire maintenant'
              )}
            </button>
          </form>

          {/* Lien vers connexion */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Vous avez déjà un compte ?{' '}
              <a href="/login" className="text-amber-600 font-medium hover:underline">
                <FiLogIn className="inline mr-1" />
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
