import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page non trouvée</h2>
      <p className="mb-6 text-center max-w-md">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/home"
        className="px-6 py-3 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
