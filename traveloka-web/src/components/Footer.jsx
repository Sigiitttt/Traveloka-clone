// Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Kolom 1 */}
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Mini<span className="font-light">loka</span></h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pesan tiket pesawat dengan mudah dan cepat. Nikmati perjalanan tanpa ribet!
            </p>
          </div>

          {/* Kolom 2 */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Jelajahi</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Promo</a></li>
              <li><a href="#" className="hover:text-white transition">Hotel</a></li>
              <li><a href="#" className="hover:text-white transition">Kereta Api</a></li>
            </ul>
          </div>

          {/* Kolom 3 */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Perusahaan</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-white transition">Karir</a></li>
            </ul>
          </div>

          {/* Kolom 4 */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Ikuti Kami</h4>
            <div className="flex space-x-4 text-lg">
              <a href="#" className="hover:text-white transition" aria-label="Facebook">🌐</a>
              <a href="#" className="hover:text-white transition" aria-label="Instagram">📸</a>
              <a href="#" className="hover:text-white transition" aria-label="Twitter">🐦</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 pb-10 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Mini<span className="font-light">loka</span>. Dibuat dengan <span className="text-red-500">❤</span> di Surabaya.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
