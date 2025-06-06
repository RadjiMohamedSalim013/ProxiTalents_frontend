import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import type { ILoginData, ILoginResponse } from '../types/users.types';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

export const Login = () => {
  const [form, setForm] = useState<ILoginData>({ email: '', motDePasse: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res: ILoginResponse = await login(form);
      localStorage.setItem('token', res.token);
      navigate('/profil');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* En-tête avec dégradé */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 py-6 px-8 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiLogIn className="text-amber-400" />
            Connexion à ProxiTalents
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Corps du formulaire */}
        <div className="p-8">
          {message && (
            <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center">
              <FiAlertCircle className="mr-2" />
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  type="email"
                  id="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
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
                  type="password"
                  id="motDePasse"
                  name="motDePasse"
                  placeholder="••••••••"
                  value={form.motDePasse}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  required
                />
              </div>
              <div className="mt-2 text-right">
                <a href="/forgot-password" className="text-sm text-amber-600 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <FiLogIn className="mr-2" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Lien vers inscription */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Pas encore membre ?{' '}
              <a href="/register" className="text-amber-600 font-medium hover:underline">
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};