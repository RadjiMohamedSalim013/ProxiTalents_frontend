export interface IRegisterData {
    nom: string;
    email: string;
    motDepasse: string;
    role: 'utilisateur' | 'prestataire' | 'entreprise';
}


export interface ILoginData {
  email: string;
  motDePasse: string;
}

// types/utilisateur.type.ts
export interface Utilisateur {
  _id: string;
  nom: string;
  email: string;
  role: 'utilisateur' | 'prestataire' | 'entreprise';
  createdAt: string;
  updatedAt: string;
}


export interface ILoginResponse {
  token: string;
  utilisateur: Utilisateur;
}