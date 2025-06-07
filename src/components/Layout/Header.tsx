import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Briefcase, FileText, BookOpen, User, LogIn, LogOut, UserPlus, Menu, X } from 'lucide-react';
import { FiUsers } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg ">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Nom */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={closeMobileMenu}
        >
          <div className="bg-amber-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-bold text-xl md:text-2xl">ProxiTalents</h2>
        </Link>

        {/* Navigation principale - Desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          <NavItem to="/" icon={<Home className="w-5 h-5" />} text="Accueil" />
          <NavItem to="/a-propos" icon={<FiUsers className="w-5 h-5" />} text="À propos" />
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
        <div className="lg:hidden flex items-center">
          <button 
            className="p-2" 
            aria-label="Toggle menu" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu mobile - Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-75 z-40 mt-16" onClick={closeMobileMenu}>
            <div className="bg-slate-800 shadow-lg" onClick={(e) => e.stopPropagation()}>
              <ul className="flex flex-col py-4">
                <MobileNavItem to="/" icon={<Home className="w-5 h-5" />} text="Accueil" onClick={closeMobileMenu} />
                <MobileNavItem to="/a-propos" icon={<FiUsers className="w-5 h-5" />} text="À propos" onClick={closeMobileMenu} />
                <MobileNavItem to="/offres" icon={<FileText className="w-5 h-5" />} text="Offres" onClick={closeMobileMenu} />
                <MobileNavItem to="/articles" icon={<BookOpen className="w-5 h-5" />} text="Articles" onClick={closeMobileMenu} />

                {token ? (
                  <>
                    <MobileNavItem to="/profil" icon={<User className="w-5 h-5" />} text="Profil" onClick={closeMobileMenu} />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-6 py-3 text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Déconnexion</span>
                    </button>
                  </>
                ) : (
                  <>
                    <MobileNavItem to="/register" icon={<UserPlus className="w-5 h-5" />} text="Inscription" onClick={closeMobileMenu} />
                    <MobileNavItem to="/login" icon={<LogIn className="w-5 h-5" />} text="Connexion" onClick={closeMobileMenu} />
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// Composant réutilisable pour les items de navigation desktop
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

// Composant réutilisable pour les items de navigation mobile
type MobileNavItemProps = {
  to: string;
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

const MobileNavItem = ({ to, icon, text, onClick }: MobileNavItemProps) => (
  <li>
    <Link 
      to={to} 
      className="flex items-center gap-3 px-6 py-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  </li>
);

export default Header;