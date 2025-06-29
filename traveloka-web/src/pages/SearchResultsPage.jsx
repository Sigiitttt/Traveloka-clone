// src/pages/SearchResultsPage.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Hook untuk membaca query parameter dari URL
import axios from 'axios';
import FlightCard from '../components/FlightCard'; // Kita akan gunakan lagi komponen kartu kita

function SearchResultsPage() {
  // 1. State untuk menyimpan data, status loading, dan error
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Gunakan useSearchParams untuk mengambil data dari URL
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  // 3. useEffect untuk mengambil data dari API berdasarkan parameter URL
  useEffect(() => {
    // Pastikan semua parameter ada sebelum memanggil API
    if (!from || !to || !date) {
      setIsLoading(false);
      setError("Parameter pencarian tidak lengkap.");
      return;
    }

    const fetchFlights = async () => {
      setIsLoading(true); // Mulai loading
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/flights/search`, {
          params: { from, to, date } // axios akan mengubah ini menjadi ?from=...&to=...
        });
        setFlights(response.data.data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data penerbangan.");
        console.error("Error fetching flights:", err);
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };

    fetchFlights();
  }, [from, to, date]); // Effect ini akan berjalan ulang jika nilai from, to, atau date di URL berubah

  // 4. Tampilkan konten berdasarkan status (loading, error, berhasil, atau data kosong)
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-500 py-10">Mencari penerbangan...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    if (flights.length === 0) {
      return <div className="text-center text-gray-800 py-10">Maaf, penerbangan untuk rute dan tanggal yang Anda pilih tidak ditemukan.</div>;
    }

    return (
      <div className="space-y-4">
        {flights.map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold">Hasil Pencarian</h1>
          <p className="text-gray-600">
            <span className="font-semibold">{from}</span> ➔ <span className="font-semibold">{to}</span>
            <span className="mx-2">|</span>
            <span>{new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default SearchResultsPage;