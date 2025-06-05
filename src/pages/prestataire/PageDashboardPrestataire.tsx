import React from 'react';
import { DashboardPrestataire } from '../../components/prestataire/DashboardPrestataire';

/**
 * PageDashboardPrestataire est un composant fonctionnel React qui sert de page principale du tableau de bord
 * pour les prestataires de services. Il applique un style de base pour la mise en page et l'arrière-plan,
 * et centre le composant `DashboardPrestataire` dans un conteneur réactif.
 *
 * @returns {JSX.Element} La page du tableau de bord rendue pour les prestataires.
 */
const PageDashboardPrestataire: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <DashboardPrestataire />
      </div>
    </div>
  );
};

export default PageDashboardPrestataire;
