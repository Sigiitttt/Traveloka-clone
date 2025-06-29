import React from 'react';

// --- FUNGSI BANTUAN (HELPERS) ---

/**
 * Mengubah angka menjadi format mata uang Rupiah.
 * Contoh: 1250000 -> "Rp 1.250.000"
 */
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

/**
 * Menghitung durasi antara dua waktu.
 * @param {string} startTime - Waktu mulai dalam format ISO string
 * @param {string} endTime - Waktu selesai dalam format ISO string
 * @returns {string} - Durasi dalam format "Xj Ym"
 */
const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end - start; // Selisih dalam milidetik

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}j ${minutes}m`;
};


// --- KOMPONEN UTAMA ---

function FlightCard({ flight, onSelect }) {
  // Ekstrak dan format waktu dari string datetime ISO
  const departureTime = new Date(flight.departure_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const arrivalTime = new Date(flight.arrival_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const duration = calculateDuration(flight.departure_time, flight.arrival_time);

  // Fungsi yang akan dipanggil saat tombol "Pilih" diklik
  const handleSelect = () => {
    // Memanggil fungsi onSelect yang dioper dari parent (SearchResultsPage)
    // dan mengirimkan ID penerbangan yang dipilih
    onSelect(flight.id); 
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        
        {/* Kolom 1: Info Maskapai */}
        <div className="flex items-center gap-3">
          {/* Anda bisa mengganti ini dengan tag <img> jika punya logo maskapai */}
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-sm">
            {flight.airline.code}
          </div>
          <span className="font-semibold text-gray-800">{flight.airline.name}</span>
        </div>

        {/* Kolom 2: Waktu & Rute Penerbangan */}
        <div className="flex items-center justify-center gap-4 text-center">
          <div>
            <p className="text-lg font-bold">{departureTime}</p>
            <p className="text-sm text-gray-500">{flight.originAirport.code}</p>
          </div>
          <div className="flex-grow text-center px-2">
            <p className="text-xs text-gray-500">{duration}</p>
            <div className="relative w-full h-px bg-gray-300 my-1">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-gray-400 bg-white"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-gray-400 bg-blue-500"></div>
            </div>
            <p className="text-xs text-gray-500">Langsung</p>
          </div>
          <div>
            <p className="text-lg font-bold">{arrivalTime}</p>
            <p className="text-sm text-gray-500">{flight.destinationAirport.code}</p>
          </div>
        </div>

        {/* Kolom 3: Info Tambahan (jika ada) */}
        <div className="text-center text-sm text-gray-600 hidden md:block">
          {/* Misalnya: Bagasi, Wifi, dll */}
          Kabin 7 kg
        </div>

        {/* Kolom 4: Harga & Tombol Aksi */}
        <div className="flex flex-col items-center md:items-end">
          <p className="text-xl font-bold text-orange-500">{formatRupiah(flight.price)}</p>
          <p className="text-xs text-gray-500 mb-2">/pax</p>
          <button 
            onClick={handleSelect}
            className="bg-blue-600 text-white font-bold py-2 px-8 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            Pilih
          </button>
        </div>

      </div>
    </div>
  );
}

export default FlightCard;