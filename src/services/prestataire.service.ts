import type { IPrestataire } from '../types/prestataire.types';
import API from '../utils/axios';

// Récupérer tous les prestataires
export const getPrestataires = async (): Promise<IPrestataire[]> => {
  const response = await API.get<IPrestataire[]>('/prestataires');
  return response.data;
};

// Récupérer un prestataire par son ID
export const getPrestataireById = async (id: string): Promise<IPrestataire | null> => {
  try {
    const response = await API.get<IPrestataire>(`/prestataires/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      // @ts-expect-error TS-ignore needed because error type is unknown and response property is not typed
      if (error.response?.status === 404) {
        return null;
      }
    }
    throw error;
  }
};

// Créer un profil prestataire
export const createPrestataire = async (data: FormData): Promise<IPrestataire> => {
  const response = await API.post<IPrestataire>('/prestataires', data);
  return response.data;
};

// Mettre à jour un profil prestataire existant
export const updatePrestataire = async (data: Partial<IPrestataire>): Promise<IPrestataire> => {
  const response = await API.put<IPrestataire>('/prestataires', data);
  return response.data;
};

// Ajouter un service au profil prestataire
export const addServiceToPrestataire = async (service: Partial<IPrestataire['services'][0]>): Promise<IPrestataire> => {
  const response = await API.post<IPrestataire>('/prestataires/service', service);
  return response.data;
};
