import React from 'react';

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
  return (
    <div className="mb-6 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Filtres de recherche</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Ville"
          value={villeFilter}
          onChange={(e) => setVilleFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Métier"
          value={metierFilter}
          onChange={(e) => setMetierFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Prix max"
          value={prixFilter !== null ? prixFilter : ''}
          onChange={(e) => setPrixFilter(e.target.value ? Number(e.target.value) : null)}
          className="border p-2 rounded"
          min={0}
        />
      </div>
      <button
        onClick={resetFilters}
        className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};

export default FilterPrestataires;
