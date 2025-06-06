import type { IPrestataire } from '../types/prestataire.types';

const API_URL = 'http://localhost:3000/api/prestataires';

// Récupérer tous les prestataires
export const getPrestataires = async (): Promise<IPrestataire[]> => {
  try {
    const token = localStorage.getItem('token');
    /**
     * Represents the response object returned from the fetch API call to the backend.
     * This object contains the status, headers, and methods to access the response body.
     */
    /**
     * Envoie une requête HTTP à l'URL spécifiée avec un en-tête d'autorisation Bearer si un jeton est fourni.
     * 
     * @param API_URL - L'URL de l'API à laquelle envoyer la requête.
     * @param token - Le jeton d'authentification à inclure dans l'en-tête Authorization. Si aucun jeton n'est fourni, l'en-tête sera vide.
     * @returns Une promesse contenant la réponse de la requête fetch.
     */
    
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



// Récupérer un prestataire par son ID
export const getPrestataireById = async (id: string): Promise<IPrestataire | null> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du prestataire');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur réseau dans getPrestataireById:', error);
    throw error;
  }
};

// Créer un profil prestataire
export const createPrestataire = async (
  data: FormData
): Promise<IPrestataire> => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
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

// Mettre à jour un profil prestataire existant
export const updatePrestataire = async (
  data: Partial<IPrestataire>
): Promise<IPrestataire> => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error('Erreur serveur :', json);
      throw new Error(json.message || 'Erreur lors de la mise à jour');
    }

    return json;
  } catch (error) {
    console.error('Erreur réseau :', error);
    throw error;
  }
};

// Ajouter un service au profil prestataire
export const addServiceToPrestataire = async (
  service: Partial<IPrestataire['services'][0]>
): Promise<IPrestataire> => {
  const token = localStorage.getItem('token');

  try {
    console.log('addServiceToPrestataire - Données envoyées:', service);
    const response = await fetch(`${API_URL}/service`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(service),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error('Erreur serveur :', json);
      throw new Error(json.message || 'Erreur lors de l\'ajout du service');
    }

    return json;
  } catch (error) {
    console.error('Erreur réseau dans addServiceToPrestataire:', error);
    throw error;
  }
};
