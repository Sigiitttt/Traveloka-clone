import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Kolom 1 */}
          <div>
            <h4 className="font-bold mb-2">Mini<span className="font-light">loka</span></h4>
            <p className="text-gray-400 text-sm">Pesan tiket pesawat dengan mudah dan cepat.</p>
          </div>
          {/* Kolom 2 */}
          <div>
            <h4 className="font-bold mb-2">Jelajahi</h4>
            <ul className="text-gray-400 space-y-1">
              <li><a href="#" className="hover:text-white">Promo</a></li>
              <li><a href="#" className="hover:text-white">Hotel</a></li>
              <li><a href="#" className="hover:text-white">Kereta Api</a></li>
            </ul>
          </div>
          {/* Kolom 3 */}
          <div>
            <h4 className="font-bold mb-2">Perusahaan</h4>
            <ul className="text-gray-400 space-y-1">
              <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-white">Karir</a></li>
            </ul>
          </div>
          {/* Kolom 4 */}
          <div>
            <h4 className="font-bold mb-2">Ikuti Kami</h4>
            <div className="flex space-x-4">
              {/* Ganti dengan ikon jika Anda menggunakan library ikon */}
              <a href="#" className="hover:text-white">FB</a>
              <a href="#" className="hover:text-white">IG</a>
              <a href="#" className="hover:text-white">TW</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Mini-Traveloka. Dibuat dengan ❤ di Surabaya.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;