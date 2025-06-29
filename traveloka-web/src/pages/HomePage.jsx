import React from 'react';
import SearchForm from '../components/SearchForm'; // Import komponen SearchForm

// Anda bisa download gambar pemandangan (misal: pesawat atau pantai) dari unsplash.com atau pexels.com
// Lalu simpan di folder `src/assets`. Misal: `src/assets/hero-background.jpg`
// import HeroImage from '../assets/hero-background.jpg';

function HomePage() {
  return (
    <div>
      {/* Bagian Hero Section */}
      <div 
        className="relative h-[50vh] flex items-center justify-center text-white"
        // Style di bawah ini untuk menampilkan gambar latar.
        // Ganti '/path/to/your/hero-background.jpg' dengan path gambar Anda, 
        // atau hapus jika hanya ingin warna solid.
        style={{ 
          backgroundImage: `url('/hero-background.jpg')`, // Pastikan gambar ada di folder `public`
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay gelap agar teks lebih mudah dibaca */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Cari & Pesan Tiket Pesawat
          </h1>
          <p className="text-lg md:text-xl">
            Jelajahi dunia dengan penawaran terbaik dari kami.
          </p>
        </div>
      </div>

      {/* Bagian Form Pencarian */}
      {/* Kita buat posisi form ini sedikit naik ke atas menimpa hero section */}
      <div className="relative px-4" style={{ top: '-80px' }}>
        <SearchForm />
      </div>

      {/* Konten lain di Halaman Utama bisa ditambahkan di sini */}
      <div className="container mx-auto px-4 mt-[-40px]">
        <h2 className="text-2xl font-bold text-center mb-6">Mengapa Memilih Kami?</h2>
        {/* Di sini Anda bisa menambahkan kartu-kartu fitur, dll. */}
      </div>
    </div>
  );
}

export default HomePage;