import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles.data';
import WhatsAppGroups from '../components/WhatsAppGroups';

const ArticlesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Articles Inspirants</h1>
      <ul className="space-y-4 mb-10">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              to={`/articles/${article.id}`}
              className="text-blue-600 hover:underline text-xl"
            >
              {article.titre}
            </Link>
          </li>
        ))}
      </ul>

      <WhatsAppGroups />
    </div>
  );
};

export default ArticlesPage;
