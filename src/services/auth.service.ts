import API from '../utils/axios'
import type  { ChangePasswordRequest, ForgotPasswordRequest, ForgotPasswordResponse, ILoginData, ILoginResponse, IRegisterData, ResetPasswordRequest, IRegisterInput } from '../types/users.types';


// Fonction pour enregistrer un nouvel utilisateur
export const register = async (data: IRegisterInput) => {
  const dataWithRole: IRegisterData = { ...data, role: 'utilisateur' };
  const response = await API.post(`/auth/register`, dataWithRole);
  console.log(response.data);
  return response.data;
};


// Fonction pour connecter un utilisateur

export const login = async (data: ILoginData): Promise<ILoginResponse> => {
  const response = await API.post<ILoginResponse>('/auth/login', data);
  
  const token = response.data.token;
  if (token) {
    localStorage.setItem('token', token);
  }

  return response.data;
};


//Fonction pour deconnecter un utilisateur

export const logout = () => {
  localStorage.removeItem('token');
  // localStorage.removeItem('utilisateur'); // si tu stockes l’utilisateu
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
