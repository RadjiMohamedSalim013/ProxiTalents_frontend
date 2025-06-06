import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiBriefcase } from 'react-icons/fi';

const CallToActionSection = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête avec ligne de séparation */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Rejoignez la communauté ProxiTalents</h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Que vous soyez particulier, professionnel ou entreprise, trouvez des opportunités adaptées à vos besoins
          </p>
        </div>

        {/* Cartes CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Carte Utilisateur */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 text-center border border-slate-100">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="text-blue-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Je suis un particulier</h3>
            <p className="text-slate-600 mb-6">Trouvez des professionnels qualifiés près de chez vous</p>
            <Link 
              to="/login" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Trouver un pro
            </Link>
          </div>

          {/* Carte Prestataire */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 text-center border border-slate-100">
            <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUser className="text-green-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Je suis un professionnel</h3>
            <p className="text-slate-600 mb-6">Développez votre activité et trouvez de nouveaux clients</p>
            <Link 
              to="/login" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Proposer mes services
            </Link>
          </div>

          {/* Carte Entreprise */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 text-center border border-slate-100">
            <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBriefcase className="text-amber-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Je suis une entreprise</h3>
            <p className="text-slate-600 mb-6">Accédez à un réseau de professionnels vérifiés</p>
            <Link 
              to="/login" 
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Recruter des talents
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;