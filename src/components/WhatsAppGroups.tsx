import React from 'react';

const WhatsAppGroups: React.FC = () => {
  return (
    <section className="bg-gray-100 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Rejoignez nos groupes et chaînes WhatsApp</h2>
      <p className="mb-4">
        Découvrez nos groupes officiels Wakaka sur WhatsApp pour échanger, partager et rester informé.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <a
            href="https://chat.whatsapp.com/examplegroup1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Groupe officiel Wakaka
          </a>
          <p className="text-sm text-gray-600">Le groupe officiel pour toutes les discussions Wakaka.</p>
        </li>
        <li>
          <a
            href="https://chat.whatsapp.com/examplegroup2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Groupe partenaire Wakaka
          </a>
          <p className="text-sm text-gray-600">Nos partenaires Wakaka pour échanges et collaborations.</p>
        </li>
      </ul>
    </section>
  );
};

export default WhatsAppGroups;
