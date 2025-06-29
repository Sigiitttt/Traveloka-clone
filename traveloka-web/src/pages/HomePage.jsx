import React from 'react';
import SearchForm from '../components/SearchForm';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center">
      <div className="w-full px-6 md:px-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-800 mb-4">
          Temukan Tiket Penerbangan Terbaikmu
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Cari dan pesan tiket pesawat dengan mudah dan cepat. Nikmati pengalaman
          pemesanan yang nyaman seperti di Traveloka.
        </p>
      </div>

      <div className="w-full max-w-5xl px-6 md:px-10">
        <SearchForm />
      </div>
    </div>
  );
}
