/**
 * Récupère les informations de l'utilisateur actuellement connecté.
 *
 * Effectue une requête GET vers l'endpoint `/utilisateur/me` pour obtenir les
 * données de l'utilisateur authentifié.
 *
 * @returns Une promesse résolue avec l'objet `Utilisateur` représentant l'utilisateur connecté.
 * @throws Une erreur si la requête échoue.
 */
import API from '../utils/axios';
import type { Utilisateur } from '../types/users.types';

export const recupererUtilisateurConnecte = async (): Promise<Utilisateur> => {
  const response = await API.get<{ utilisateur: Utilisateur }>('/utilisateur/me');
  return response.data.utilisateur;
};
