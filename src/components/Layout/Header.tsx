import type React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Briefcase, FileText, BookOpen, User, LogIn, LogOut, UserPlus, Menu } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Nom */}
        <Link 
          to="/home" 
          className="flex items-center gap-2 group"
        >
          <div className="bg-amber-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-bold text-xl md:text-2xl">ProxiTalents</h2>
        </Link>

        {/* Navigation principale - Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          <NavItem to="/home" icon={<Home className="w-5 h-5" />} text="Accueil" />
          <NavItem to="/a-propos" icon={<Briefcase className="w-5 h-5" />} text="a propos" />
          <NavItem to="/offres" icon={<FileText className="w-5 h-5" />} text="Offres" />
          <NavItem to="/articles" icon={<BookOpen className="w-5 h-5" />} text="Articles" />

          {token ? (
            <>
              <NavItem to="/profil" icon={<User className="w-5 h-5" />} text="Profil" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </>
          ) : (
            <>
              <NavItem to="/register" icon={<UserPlus className="w-5 h-5" />} text="Inscription" />
              <NavItem to="/login" icon={<LogIn className="w-5 h-5" />} text="Connexion" />
            </>
          )}
        </ul>

        {/* Menu mobile */}
        <div className="md:hidden flex items-center">
          <button className="p-2" aria-label="Open menu" title="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};

// Composant réutilisable pour les items de navigation
type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  text: string;
};

const NavItem = ({ to, icon, text }: NavItemProps) => (
  <li>
    <Link 
      to={to} 
      className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  </li>
);

export default Header