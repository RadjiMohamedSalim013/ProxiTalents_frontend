import type { Utilisateur } from './users.types';

export interface IReseaux {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  siteWeb?: string;
}

export interface IService {
  nom: string;
  description?: string;
  tarif?: number;
}

export interface IMedia {
  type: 'image' | 'video';
  url: string;
  description?: string;
}

export interface IPrestataire {
  _id: string;
  userId: Utilisateur | string;
  titre?: string;
  bio?: string;
  zoneGeographique?: string;
  ville?: string;
  services: IService[];
  medias?: IMedia[];
  reseaux?: IReseaux;
  disponibilite?: string;
  noteMoyenne?: number;
  nombreAvis?: number;
  verified?: boolean;
  tags?: string[];
}
