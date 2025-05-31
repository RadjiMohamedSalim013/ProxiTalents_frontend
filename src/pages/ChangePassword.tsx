import { useState } from 'react';
import { changePassword } from '../services/auth.service';
import { Input } from '../components/Input';

export const ChangePassword = () => {
  const [form, setForm] = useState({
    email: '',
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await changePassword(form);
      setMessage(res.message || 'Mot de passe modifié avec succès');
      setSuccess(true);
      setForm({ email: '', ancienMotDePasse: '', nouveauMotDePasse: '' });
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Une erreur est survenue');
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Modifier le mot de passe</h1>

      {message && (
        <p className={`mb-4 text-center text-sm ${success ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Ancien mot de passe"
          name="ancienMotDePasse"
          type="password"
          value={form.ancienMotDePasse}
          onChange={handleChange}
        />

        <Input
          label="Nouveau mot de passe"
          name="nouveauMotDePasse"
          type="password"
          value={form.nouveauMotDePasse}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
        >
          Modifier
        </button>
      </form>
    </div>
  );
};
