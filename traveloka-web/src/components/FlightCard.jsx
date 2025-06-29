import React from 'react';

// Fungsi bantuan untuk format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

// Komponen ini menerima 'flight' sebagai prop (properti)
function FlightCard({ flight }) {
  // Ekstrak waktu dari string datetime
  const departureTime = new Date(flight.departure_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const arrivalTime = new Date(flight.arrival_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
      {/* Bagian Kiri: Info Maskapai */}
      <div className="flex items-center gap-4">
        {/* Placeholder untuk logo maskapai */}
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
          {flight.airline.code}
        </div>
        <div>
          <p className="font-bold text-lg">{flight.airline.name}</p>
          <p className="text-sm text-gray-500">{flight.flight_number}</p>
        </div>
      </div>

      {/* Bagian Tengah: Info Keberangkatan & Kedatangan */}
      <div className="flex items-center gap-6 font-semibold">
        <div className="text-center">
          <p className="text-xl">{departureTime}</p>
          <p className="text-gray-600">{flight.originAirport.code}</p>
        </div>
        <div className="text-center text-gray-400 text-sm">
          <p>➔</p>
          <p>Direct</p>
        </div>
        <div className="text-center">
          <p className="text-xl">{arrivalTime}</p>
          <p className="text-gray-600">{flight.destinationAirport.code}</p>
        </div>
      </div>

      {/* Bagian Kanan: Harga & Tombol */}
      <div className="flex flex-col items-end">
        <p className="text-xl font-bold text-orange-500">{formatRupiah(flight.price)}</p>
        <p className="text-sm text-gray-500 mb-2">/pax</p>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
          Pilih
        </button>
      </div>
    </div>
  );
}

export default FlightCard;