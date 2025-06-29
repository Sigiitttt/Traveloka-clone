import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-8 text-sm text-gray-600">
      &copy; {new Date().getFullYear()} Traveloka Clone. Dibuat dengan ❤️ oleh Mahasiswa Informatika.
    </footer>
  );
};

export default Footer;