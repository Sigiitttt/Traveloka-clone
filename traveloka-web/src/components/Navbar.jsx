// Navbar.jsx
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
            Mini<span className="font-light text-gray-700">loka</span>
          </a>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/promo" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Promo
            </a>
            <a href="/my-bookings" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Pesanan Saya
            </a>
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow">
              Login
            </button>
          </div>

          {/* Mobile Menu Button (optional) */}
          <div className="md:hidden">
            {/* Implement hamburger menu here if needed */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
