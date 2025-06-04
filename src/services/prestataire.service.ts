import type { IPrestataire } from '../types/prestataire.types';

const API_URL = 'http://localhost:3000/api/prestataires'; 

//  Récupérer tous les prestataires
export const getPrestataires = async (): Promise<IPrestataire[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(API_URL, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des prestataires');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur réseau dans getPrestataires:', error);
    throw error;
  }
};

//  Créer un profil prestataire
export const createPrestataire = async (
  data: Omit<IPrestataire, 'userId' | '_id'>
): Promise<IPrestataire> => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error('Erreur serveur :', json);
      throw new Error(json.message || 'Erreur lors de la création');
    }

    return json;
  } catch (error) {
    console.error('Erreur réseau :', error);
    throw error;
  }
};

