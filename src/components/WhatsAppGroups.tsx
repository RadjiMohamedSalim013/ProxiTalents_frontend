import React from 'react';
import { FaWhatsapp, FaUsers, FaHandshake, FaBell } from 'react-icons/fa';

const WhatsAppGroups: React.FC = () => {
  const groups = [
    {
      id: 1,
      title: "Groupe officiel ProxiTalents",
      description: "Le groupe principal pour toutes les discussions et annonces ProxiTalents",
      link: "https://chat.whatsapp.com/examplegroup1",
      icon: <FaUsers className="text-green-500" />,
      members: "500+ membres"
    },
    {
      id: 2,
      title: "Groupe partenaire ProxiTalents",
      description: "Espace réservé à nos partenaires pour collaborations et échanges",
      link: "https://chat.whatsapp.com/examplegroup2",
      icon: <FaHandshake className="text-blue-500" />,
      members: "200+ partenaires"
    },
    {
      id: 3,
      title: "Chaîne d'annonces",
      description: "Recevez les dernières actualités et offres exclusives",
      link: "https://chat.whatsapp.com/examplegroup3",
      icon: <FaBell className="text-yellow-500" />,
      members: "Notifications uniquement"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg border border-green-100">
      <div className="flex items-center mb-6">
        <FaWhatsapp className="text-green-500 text-4xl mr-4" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Communauté WhatsApp ProxiTalents</h2>
          <p className="text-gray-600">
            Rejoignez nos espaces d'échange officiels pour ne rien manquer
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div 
            key={group.id} 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-400"
          >
            <div className="flex items-start mb-4">
              <div className="text-2xl mr-3 mt-1">
                {group.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{group.title}</h3>
                <span className="text-sm text-gray-500">{group.members}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-5">{group.description}</p>
            <a
              href={group.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              <FaWhatsapp className="mr-2" />
              Rejoindre
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>En rejoignant, vous acceptez nos règles de bonne conduite</p>
      </div>
    </section>
  );
};

export default WhatsAppGroups;