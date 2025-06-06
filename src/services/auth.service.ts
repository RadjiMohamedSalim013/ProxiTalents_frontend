import axios from 'axios';
import API from '../utils/axios'
import type  { ChangePasswordRequest, ForgotPasswordRequest, ForgotPasswordResponse, ILoginData, ILoginResponse, IRegisterData, ResetPasswordRequest, IRegisterInput } from '../types/users.types';


// Base URL de votre backend
const API_URL = 'http://localhost:3000/api/auth';


// Fonction pour enregistrer un nouvel utilisateur
export const register = async (data: IRegisterInput) => {
  // Ajouter le rôle par défaut 'utilisateur' avant d'envoyer les données
  const dataWithRole: IRegisterData = { ...data, role: 'utilisateur' };
  const response = await axios.post(`${API_URL}/register`, dataWithRole);
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



// renitialisation du mot de passe
export const forgotPassword = async (data: ForgotPasswordRequest) => {
  const response = await API.post<ForgotPasswordResponse>('/auth/forgot-password', data);
  return response.data;
};




export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const response = await API.post<ForgotPasswordResponse>('/auth/reset-password', data);
  return response.data;
};


export const changePassword = async (
  data: ChangePasswordRequest
): Promise<{ message: string }> => {
  const res = await API.put('/auth/changer-mot-de-passe', data);
  return res.data as { message: string };
};
