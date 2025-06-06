import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.data';
import { FaArrowLeft, FaCalendarAlt, FaShareAlt } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Article non trouvé</h2>
        <button
          onClick={() => navigate('/articles')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour aux articles
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.titre,
        text: article.resume || article.contenu.substring(0, 100),
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Retour aux articles
      </button>

      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {article.imageUrl && (
          <div className="h-64 w-full overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.titre} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span>{Math.ceil(article.contenu.length / 1000)} min de lecture</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">{article.titre}</h1>
          
          {article.resume && (
            <p className="text-lg text-gray-600 italic mb-6">{article.resume}</p>
          )}

          <div className="prose max-w-none text-gray-700 whitespace-pre-line mb-8">
            {article.contenu}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              onClick={handleShare}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaShareAlt className="mr-2" />
              Partager
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetailPage;