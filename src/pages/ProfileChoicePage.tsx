import { useNavigate } from 'react-router-dom';

const ProfileChoicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Créer votre profil</h1>
      <p className="mb-4 text-center">
        Pour profiter pleinement de notre plateforme, vous pouvez créer un profil Prestataire ou Entreprise.
      </p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Profil Prestataire</h2>
        <p>
          Présentez vos services, gérez vos offres et développez votre réseau professionnel.
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Profil Entreprise</h2>
        <p>
          Gérez votre entreprise, publiez des offres d'emploi et trouvez les meilleurs prestataires.
        </p>
      </div>
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => navigate('/creation-prestataire')}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Créer un profil Prestataire
        </button>
        <button
          onClick={() => navigate('/creation-entreprise')}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Créer un profil Entreprise
        </button>
      </div>
    </div>
  );
};

export default ProfileChoicePage;
