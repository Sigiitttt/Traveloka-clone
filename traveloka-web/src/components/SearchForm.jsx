import React, { useState } from 'react';
// Impor ikon dari library (opsional, jika Anda install react-icons)
// import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';

// Data bandara dummy, nantinya akan diambil dari API
const dummyAirports = [
  { code: 'CGK', city: 'Jakarta' },
  { code: 'DPS', city: 'Denpasar' },
  { code: 'SUB', city: 'Surabaya' },
  { code: 'KNO', city: 'Medan' },
  { code: 'UPG', city: 'Makassar' },
];

function SearchForm() {
  const [from, setFrom] = useState('CGK');
  const [to, setTo] = useState('DPS');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default tanggal hari ini

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah form refresh halaman
    // Nantinya, logika pencarian akan ada di sini
    console.log('Mencari penerbangan:', { from, to, date });
    alert(`Mencari penerbangan dari ${from} ke ${to} pada tanggal ${date}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Cari Penerbangan Murah</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Input Asal */}
        <div className="flex flex-col">
          <label htmlFor="from" className="text-sm font-semibold text-gray-600 mb-1">Dari</label>
          <select 
            id="from" 
            value={from} 
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {dummyAirports.map(airport => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Input Tujuan */}
        <div className="flex flex-col">
          <label htmlFor="to" className="text-sm font-semibold text-gray-600 mb-1">Ke</label>
          <select 
            id="to" 
            value={to} 
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
             {dummyAirports.map(airport => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Input Tanggal */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-semibold text-gray-600 mb-1">Tanggal Berangkat</label>
          <input 
            type="date" 
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tombol Cari */}
        <button 
          type="submit" 
          className="bg-orange-500 text-white font-bold p-2 rounded-md hover:bg-orange-600 transition-colors w-full"
        >
          Cari Penerbangan
        </button>
      </form>
    </div>
  );
}

export default SearchForm;