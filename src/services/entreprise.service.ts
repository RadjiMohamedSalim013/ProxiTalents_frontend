import type { IEntreprise } from '../types/entreprise.types';

const API_URL = 'http://localhost:3000/api/entreprises';

// Créer une fiche entreprise
export const createEntreprise = async (data: any): Promise<IEntreprise> => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la création de la fiche entreprise');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur réseau dans createEntreprise:', error);
    throw error;
  }
};

// Récupérer la fiche entreprise de l'utilisateur connecté
export const getEntrepriseByUser = async (): Promise<IEntreprise | null> => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la récupération de la fiche entreprise');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur réseau dans getEntrepriseByUser:', error);
    throw error;
  }
};

// Mettre à jour la fiche entreprise de l'utilisateur connecté
export const updateEntreprise = async (data: Partial<IEntreprise>): Promise<IEntreprise> => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la mise à jour de la fiche entreprise');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur réseau dans updateEntreprise:', error);
    throw error;
  }
};

// Récupérer toutes les entreprises
export const getAllEntreprises = async (): Promise<IEntreprise[]> => {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la récupération des entreprises');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur réseau dans getAllEntreprises:', error);
    throw error;
  }
};
