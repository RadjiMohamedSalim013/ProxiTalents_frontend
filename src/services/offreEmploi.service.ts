import API from '../utils/axios';
import type { IOffreEmploi } from '../types/offreEmploi.types';

export const creerOffre = async (offreData: { titre: string; description: string }) => {
  const response = await API.post('/offres', offreData);
  return response.data;
};

export const getOffresEntreprise = async (): Promise<IOffreEmploi[]> => {
  const response = await API.get('/offres/entreprise');
  return response.data as IOffreEmploi[];
};

export const getOffreById = async (id: string) => {
  const response = await API.get(`/offres/${id}`);
  return response.data;
};

export const updateOffre = async (id: string, offreData: { titre: string; description: string }) => {
  const response = await API.put(`/offres/${id}`, offreData);
  return response.data;
};

export const deleteOffre = async (id: string) => {
  const response = await API.delete(`/offres/${id}`);
  return response.data;
};

export const getAllOffres = async () => {
  const response = await API.get('/offres/all');
  return response.data;
};
