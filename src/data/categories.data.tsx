import { 
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
import { MdElectricalServices } from 'react-icons/md';

import type { Categorie } from '../types/categorie.type';

export const categories: Categorie[] = [
  { nom: 'Coiffure', icone: <FaCut className="text-pink-500" /> },
  { nom: 'Couture', icone: <FaPaintRoller className="text-red-500" /> },
  { nom: 'Plomberie', icone: <GiWaterDrop className="text-blue-500" /> },
  { nom: 'Maçonnerie', icone: <GiBrickWall className="text-amber-700" /> },
  { nom: 'Mécanique Auto', icone: <FaCar className="text-gray-600" /> },
  { nom: 'Électricité', icone: <MdElectricalServices className="text-yellow-500" /> },
  { nom: 'Développement Web', icone: <FaLaptopCode className="text-indigo-500" /> },
  { nom: 'Maître de Cérémonie', icone: <FaMicrophone className="text-purple-500" /> },
  { nom: 'Bricolage', icone: <FaTools className="text-orange-500" /> },
  { nom: 'Jardinage', icone: <FaHome className="text-green-500" /> },
  { nom: 'Baby-sitting', icone: <FaChild className="text-amber-400" /> },
  { nom: 'Cuisine', icone: <FaUtensils className="text-red-400" /> }
];