{/*import { 
  FaCut, 
  FaCar, 
  FaLightbulb, 
  FaLaptopCode,
  FaMicrophone,
  FaPaintRoller,
  FaTools,
  FaHome,
  FaChild,
  FaUtensils
} from 'react-icons/fa';
import { GiBrickWall, GiWaterDrop } from 'react-icons/gi';
import { MdElectricalServices } from 'react-icons/md';*/}

import type { Categorie } from '../types/categorie.type';

export const categories: Categorie[] = [
  { nom: 'Coiffure', icone: 'FaCut' },
  { nom: 'Couture', icone: 'FaPaintRoller' },
  { nom: 'Plomberie', icone: 'GiWaterDrop' },
  { nom: 'Maçonnerie', icone: 'GiBrickWall' },
  { nom: 'Mécanique Auto', icone: 'FaCar' },
  { nom: 'Électricité', icone: 'MdElectricalServices' },
  { nom: 'Développement Web', icone: 'FaLaptopCode' },
  { nom: 'Maître de Cérémonie', icone: 'FaMicrophone' },
  { nom: 'Bricolage', icone: 'FaTools' },
  { nom: 'Jardinage', icone: 'FaHome' },
  { nom: 'Baby-sitting', icone: 'FaChild' },
  { nom: 'Cuisine', icone: 'FaUtensils' }
];
