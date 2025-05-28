import axios from 'axios';
import type  { ILoginData, IRegisterData } from '../types/users.types';

// Base URL de votre backend
const API_URL = 'http://localhost:3000/api/auth';


// Fonction pour enregistrer un nouvel utilisateur
export const register = async (data: IRegisterData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  console.log(response.data)
  return response.data;
};


// Fonction pour connecter un utilisateur
export const login = async (data: ILoginData) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};




