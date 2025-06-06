import React from 'react';
import { FiFilter, FiX, FiMapPin, FiBriefcase, FiDollarSign } from 'react-icons/fi';

interface FilterPrestatairesProps {
  villeFilter: string;
  setVilleFilter: (value: string) => void;
  metierFilter: string;
  setMetierFilter: (value: string) => void;
  prixFilter: number | null;
  setPrixFilter: (value: number | null) => void;
  resetFilters: () => void;
}

const FilterPrestataires: React.FC<FilterPrestatairesProps> = ({
  villeFilter,
  setVilleFilter,
  metierFilter,
  setMetierFilter,
  prixFilter,
  setPrixFilter,
  resetFilters,
}) => {
  const hasFilters = villeFilter || metierFilter || prixFilter !== null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-6">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <FiFilter className="text-amber-500" />
            Filtres de recherche
          </h3>
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="text-sm text-slate-500 hover:text-amber-600 flex items-center gap-1 transition"
            >
              <FiX size={16} />
              Réinitialiser
            </button>
          )}
        </div>

        {/* Champs de filtre */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtre par ville */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Localisation"
              value={villeFilter}
              onChange={(e) => setVilleFilter(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>

          {/* Filtre par métier */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBriefcase className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Métier ou service"
              value={metierFilter}
              onChange={(e) => setMetierFilter(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>

          {/* Filtre par prix */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-slate-400" />
            </div>
            <input
              type="number"
              placeholder="Budget maximum"
              value={prixFilter !== null ? prixFilter : ''}
              onChange={(e) => setPrixFilter(e.target.value ? Number(e.target.value) : null)}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              min={0}
            />
          </div>
        </div>

        {/* Affichage des filtres actifs */}
        {hasFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {villeFilter && (
              <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm flex items-center">
                <FiMapPin className="mr-1 text-slate-500" size={14} />
                {villeFilter}
                <button 
                  onClick={() => setVilleFilter('')}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {metierFilter && (
              <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm flex items-center">
                <FiBriefcase className="mr-1 text-slate-500" size={14} />
                {metierFilter}
                <button 
                  onClick={() => setMetierFilter('')}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {prixFilter !== null && (
              <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm flex items-center">
                <FiDollarSign className="mr-1 text-slate-500" size={14} />
                Jusqu'à {prixFilter} FCFA
                <button 
                  onClick={() => setPrixFilter(null)}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPrestataires;