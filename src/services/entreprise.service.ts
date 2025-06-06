import API from '../utils/axios';
import type { IEntreprise } from '../types/entreprise.types';

// Créer une fiche entreprise
export const createEntreprise = async (data: unknown): Promise<IEntreprise> => {
  const response = await API.post<IEntreprise>('/entreprises', data);
  return response.data;
};

export const getEntrepriseByUser = async (): Promise<IEntreprise | null> => {
  try {
    const response = await API.get<IEntreprise>('/entreprises');
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

export const updateEntreprise = async (data: Partial<IEntreprise>): Promise<IEntreprise> => {
  const response = await API.put<IEntreprise>('/entreprises', data);
  return response.data;
};

export const getAllEntreprises = async (): Promise<IEntreprise[]> => {
  const response = await API.get<IEntreprise[]>('/entreprises/all');
  return response.data;
};
