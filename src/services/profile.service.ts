import axios from '../utils/axios';

export const getPrestataireByUser = async () => {
  const response = await axios.get('/prestataires/user/profile');
  return response.data;
};

export const getEntrepriseByUser = async () => {
  const response = await axios.get('/entreprises/user/profile');
  return response.data;
};
