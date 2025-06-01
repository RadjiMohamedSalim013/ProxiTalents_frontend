// src/components/Header.tsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <h2 className="font-bold text-xl">ProxiTalents</h2>
        {/* Plus tard on ajoutera des liens vers les pages */}
      </nav>
    </header>
  );
};

export default Header;
