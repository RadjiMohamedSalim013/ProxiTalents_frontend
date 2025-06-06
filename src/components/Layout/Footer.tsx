import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl text-white">ProxiTalents</h3>
            </div>
            <p className="text-sm">
              La plateforme qui connecte les talents locaux avec les opportunités professionnelles.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-white font-medium mb-4">Navigation</h4>
            <ul className="space-y-3">
              <FooterLink href="/home" text="Accueil" />
              <FooterLink href="/entreprises" text="Entreprises" />
              <FooterLink href="/offres" text="Offres d'emploi" />
              <FooterLink href="/articles" text="Articles" />
            </ul>
          </div>

          {/* Légales */}
          <div>
            <h4 className="text-white font-medium mb-4">Légal</h4>
            <ul className="space-y-3">
              <FooterLink href="/cgu" text="CGU" />
              <FooterLink href="/confidentialite" text="Confidentialité" />
              <FooterLink href="/cookies" text="Cookies" />
              <FooterLink href="/mentions" text="Mentions légales" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-500" />
                <span>contact@proxitalents.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-500" />
                <span>+33 1 23 45 67 89</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-12 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ProxiTalents - Tous droits réservés</p>
          <p className="mt-2">Made with  in CIV</p>
        </div>
      </div>
    </footer>
  );
};

// Composants réutilisables
const FooterLink = ({ href, text }) => (
  <li>
    <a 
      href={href} 
      className="hover:text-cyan-400 transition-colors"
    >
      {text}
    </a>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a 
    href="#" 
    className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors"
  >
    {icon}
  </a>
);

export default Footer;