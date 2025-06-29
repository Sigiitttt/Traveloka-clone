import React from 'react';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">
            Mini<span className="font-light">loka</span>
          </a>
          
          {/* Menu Navigasi (sederhana) */}
          <div className="flex items-center space-x-4">
            <a href="/promo" className="hover:text-blue-200">Promo</a>
            <a href="/my-bookings" className="hover:text-blue-200">Pesanan Saya</a>
            <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;