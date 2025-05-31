import API from '../utils/axios';
import type { Utilisateur } from '../types/users.types';

export const recupererUtilisateurConnecte = async (): Promise<Utilisateur> => {
  const response = await API.get<{ utilisateur: Utilisateur }>('/utilisateur/me');
  return response.data.utilisateur;
};
