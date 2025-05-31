import axios from 'axios';
import API from '../utils/axios'
import type  { ILoginData, ILoginResponse, IRegisterData } from '../types/users.types';


// Base URL de votre backend
const API_URL = 'http://localhost:3000/api/auth';


// Fonction pour enregistrer un nouvel utilisateur
export const register = async (data: IRegisterData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  console.log(response.data)
  return response.data;
};


// Fonction pour connecter un utilisateur

export const login = async (data: ILoginData): Promise<ILoginResponse> => {
  const response = await API.post<ILoginResponse>('auth/login', data);
  
  const token = response.data.token;
  if (token) {
    localStorage.setItem('token', token);
  }

  return response.data;
};


//Fonction pour deconnecter un utilisateur

export const logout = () => {
  localStorage.removeItem('token');
  // localStorage.removeItem('utilisateur'); // si tu stockes l’utilisateur aussi
};




