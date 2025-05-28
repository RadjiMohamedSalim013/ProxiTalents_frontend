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
