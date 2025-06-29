import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold">Traveloka Clone</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Beranda</Link>
        <Link to="/search" className="hover:underline">Cari Tiket</Link>
      </div>
    </nav>
  );
};

export default Navbar;