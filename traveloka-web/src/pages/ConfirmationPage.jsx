import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ConfirmationPage() {
  // Gunakan hook useParams untuk mengambil 'bookingCode' dari URL
  // yang kita definisikan di App.jsx sebagai /booking/success/:bookingCode
  const { bookingCode } = useParams();

  return (
    <div className="bg-gray-100 flex-grow flex items-center justify-center py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-2xl mx-auto transform transition-all hover:scale-105 duration-300">

          {/* Ikon Centang (Inline SVG) */}
          <svg
            className="w-20 h-20 text-green-500 mx-auto mb-5 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Pemesanan Berhasil!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Terima kasih telah melakukan pemesanan melalui Mini-loka. E-tiket Anda akan segera dikirimkan.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-dashed border-blue-200">
            <p className="text-sm text-gray-500">Kode Booking Anda</p>
            <p className="text-3xl font-mono font-bold text-blue-700 tracking-widest my-2">
              {bookingCode}
            </p>
            <p className="text-xs text-gray-500">
              Harap simpan kode ini untuk referensi Anda.
            </p>
          </div>

          {/* Gunakan komponen Link untuk navigasi internal agar tidak me-reload halaman */}
          <Link
            to="/"
            className="inline-block mt-10 bg-blue-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            style={{ color: '#ffffff', opacity: 1 }}
          >
            Pesan Tiket Lagi
          </Link>

        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;