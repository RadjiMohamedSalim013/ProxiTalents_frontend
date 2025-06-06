import React from 'react';

// Définition des props attendues par le composant Input
interface InputProps {
  label: string; 
  name: string;  
  type?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Fonction appelée à chaque changement du champ
  className?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, name, type = 'text', value, onChange, className, required }) => (
  <div className="mb-4">
    {/* Label lié au champ input pour accessibilité */}
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>

    {/* Champ input contrôlé */}
    <input
      id={name}
      name={name}          
      type={type}          
      value={value}        
      onChange={onChange}  
      className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
      required={required}
      aria-required={required ? 'true' : 'false'}
      aria-label={label}
      placeholder={label}
      title={label}
    />
  </div>
);
