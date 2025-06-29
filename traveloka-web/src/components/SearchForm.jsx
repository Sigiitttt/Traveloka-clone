import React, { useState } from 'react';

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
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (from === to) {
      alert('Kota asal dan tujuan tidak boleh sama.');
      return;
    }

    console.log('Mencari penerbangan:', { from, to, date });
    alert(`Mencari penerbangan dari ${from} ke ${to} pada tanggal ${date}`);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Cari Penerbangan Murah</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        {/* Asal */}
        <div className="flex flex-col">
          <label htmlFor="from" className="text-sm font-semibold text-gray-700 mb-1">Dari</label>
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {dummyAirports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Tujuan */}
        <div className="flex flex-col">
          <label htmlFor="to" className="text-sm font-semibold text-gray-700 mb-1">Ke</label>
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {dummyAirports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Tanggal */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-semibold text-gray-700 mb-1">Tanggal Berangkat</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tombol */}
        <button
          type="submit"
          className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-md"
        >
          Cari Penerbangan
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
