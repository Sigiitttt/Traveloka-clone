import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchForm() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [flightClass, setFlightClass] = useState('economy'); // ✅ Perbaikan: inisialisasi state
  const [error, setError] = useState('');
  const [airports, setAirports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchAirports = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/airports');
        if (isMounted) {
          const data = response.data.data;
          setAirports(data);

          if (!from && data.length >= 1) {
            setFrom(data[0].code);
          }
          if (!to && data.length >= 2) {
            setTo(data[1].code);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data bandara:", error);
        if (isMounted) {
          setError("Gagal memuat data bandara. Silakan coba lagi nanti.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAirports();

    return () => {
      isMounted = false;
    };
  }, [from, to]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from || !to || !date || !flightClass) {
      alert("Harap isi semua kolom pencarian!");
      return;
    }

    if (from === to) {
      alert("Bandara asal dan tujuan tidak boleh sama!");
      return;
    }

    navigate(`/search-results?from=${from}&to=${to}&date=${date}&class=${flightClass}`);
  };

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center">
        <p className="text-gray-500">Memuat data bandara...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Cari Penerbangan Murah</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col">
          <label htmlFor="from" className="text-sm font-semibold text-gray-600 mb-1">Dari</label>
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="" disabled>Pilih Keberangkatan</option>
            {airports.map(airport => (
              <option key={airport.id} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="to" className="text-sm font-semibold text-gray-600 mb-1">Ke</label>
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="" disabled>Pilih Tujuan</option>
            {airports.map(airport => (
              <option key={airport.id} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-semibold text-gray-600 mb-1">Tanggal Berangkat</label>
          <input
            type="date"
            id="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="flightClass" className="text-sm font-semibold text-gray-600 mb-1">Kelas</label>
          <select
            id="flightClass"
            value={flightClass}
            onChange={(e) => setFlightClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 h-10 text-gray-800"
          >
            <option value="economy">Ekonomi</option>
            <option value="business">Bisnis</option>
          </select>
        </div>

        <div className="md:col-span-4">
          <button
            type="submit"
            className="bg-orange-500 text-white font-bold p-2 rounded-md hover:bg-orange-600 transition-colors w-full h-10"
          >
            Cari Penerbangan
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
