
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/offres';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const creerOffre = async (offreData: { titre: string; description: string }) => {
  const response = await axios.post(API_URL, offreData, { headers: getAuthHeaders() });
  return response.data;
};

export const getOffresEntreprise = async () => {
  const response = await axios.get(`${API_URL}/entreprise`, { headers: getAuthHeaders() });
  return response.data;
};

export const getOffreById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  return response.data;
};

export const updateOffre = async (id: string, offreData: { titre: string; description: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, offreData, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteOffre = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  return response.data;
};

export const getAllOffres = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};
