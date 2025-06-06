import React from 'react';
import FormulaireEntreprise from '../../components/entreprise/FormulaireEntreprise';

const PageCreationEntreprise: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <FormulaireEntreprise />
      </div>
    </div>
  );
};

export default PageCreationEntreprise;
