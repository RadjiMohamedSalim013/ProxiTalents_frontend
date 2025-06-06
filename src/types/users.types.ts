
export interface IRegisterData {
  nom: string;
  email: string;
  motDepasse: string;
  role: 'utilisateur' | 'prestataire' | 'entreprise';
}

export interface IRegisterInput {
  nom: string;
  email: string;
  motDePasse: string;
}

export interface ILoginData {
  email: string;
  motDePasse: string;
}

export interface Utilisateur {
  _id: string;
  nom: string;
  email: string;
  telephone?: string;
  role: 'utilisateur' | 'prestataire' | 'entreprise';
  createdAt: string;
  updatedAt: string;
}

export interface ILoginResponse {
  token: string;
  utilisateur: Utilisateur;
}

export interface ForgotPasswordRequest {
  email: string; 
}

export interface ResetPasswordRequest {
  token: string;
  nouveauMotDePasse: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ChangePasswordRequest {
  email: string;
  ancienMotDePasse: string;
  nouveauMotDePasse: string;
}

