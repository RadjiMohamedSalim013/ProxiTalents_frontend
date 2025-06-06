import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEntrepriseByUser, updateEntreprise } from '../../services/entreprise.service';
import type { IEntreprise } from '../../types/entreprise.types';

const PageModificationEntreprise: React.FC = () => {
  const navigate = useNavigate();

  const [entreprise, setEntreprise] = useState<IEntreprise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [ville, setVille] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [siteWeb, setSiteWeb] = useState('');
  const [secteurActivite, setSecteurActivite] = useState('');

  useEffect(() => {
    const fetchEntreprise = async () => {
      try {
        const data = await getEntrepriseByUser();
        if (data) {
          setEntreprise(data);
          setNom(data.nom);
          setDescription(data.description || '');
          setVille(data.ville);
          setWhatsapp(data.whatsapp || '');
          setEmail(data.email);
          setSiteWeb(data.siteWeb || '');
          setSecteurActivite(data.secteurActivite);
          setError(null);
        } else {
          setError('Fiche entreprise non trouvée');
        }
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchEntreprise();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateEntreprise({
        nom,
        description,
        ville,
        whatsapp,
        email,
        siteWeb,
        secteurActivite,
      });
      alert('Fiche entreprise mise à jour avec succès');
      navigate('/profil');
    } catch (err: any) {
      alert(err.message || 'Erreur lors de la mise à jour');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Modifier votre fiche entreprise</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom de l'entreprise"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="w-full border p-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="text"
          placeholder="Ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          required
          className="w-full border p-2"
        />
        <input
          type="tel"
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2"
        />
        <input
          type="url"
          placeholder="Site Web"
          value={siteWeb}
          onChange={(e) => setSiteWeb(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="text"
          placeholder="Secteur d'activité"
          value={secteurActivite}
          onChange={(e) => setSecteurActivite(e.target.value)}
          required
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default PageModificationEntreprise;
