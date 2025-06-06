import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.data';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = articles.find((a) => a.id === id);

  if (!article) {
    return <div className="max-w-4xl mx-auto p-6">Article non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{article.titre}</h1>
      <p className="mb-6 whitespace-pre-line">{article.contenu}</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Retour
      </button>
    </div>
  );
};

export default ArticleDetailPage;
