import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles.data';
import WhatsAppGroups from '../components/WhatsAppGroups';
import { FaArrowRight, FaCalendarAlt, FaBookOpen } from 'react-icons/fa';

const ArticlesPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center">
          <FaBookOpen className="mr-3 text-blue-600" />
          Articles Inspirants
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez nos ressources pour vous inspirer et développer votre activité
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            {article.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.titre} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FaCalendarAlt className="mr-2" />
                <span>{article.date}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                <Link to={`/articles/${article.id}`} className="hover:text-blue-600 transition-colors">
                  {article.titre}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.resume || article.contenu.substring(0, 150) + '...'}
              </p>
              <Link
                to={`/articles/${article.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Lire l'article <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Vous souhaitez plus de ressources ?</h2>
        <p className="text-gray-600 mb-6">
          Rejoignez nos groupes WhatsApp pour échanger avec d'autres entrepreneurs et recevoir des conseils exclusifs.
        </p>
        <WhatsAppGroups />
      </div>
    </div>
  );
};

export default ArticlesPage;