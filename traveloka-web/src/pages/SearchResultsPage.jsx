// src/pages/SearchResultsPage.jsx

import React, { useState, useEffect } from 'react';
// 1. Impor useNavigate di sini
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FlightCard from '../components/FlightCard';

function SearchResultsPage() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  // 2. Inisialisasi hook useNavigate
  const navigate = useNavigate(); 
  
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  useEffect(() => {
    if (!from || !to || !date) {
      setIsLoading(false);
      setError("Parameter pencarian tidak lengkap.");
      return;
    }

    const fetchFlights = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/flights/search`, {
          params: { from, to, date }
        });
        console.log("DATA MENTAH DARI API:", response.data.data);
        setFlights(response.data.data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data penerbangan.");
        console.error("Error fetching flights:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, date]);

  // 3. Buat fungsi handler untuk menangani klik tombol "Pilih"
  const handleSelectFlight = (flightId) => {
    // Fungsi ini akan mengarahkan pengguna ke halaman booking
    // dengan membawa ID penerbangan yang dipilih di URL.
    navigate(`/booking/${flightId}`);
  };


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
        {/* 4. Oper fungsi `handleSelectFlight` ke setiap FlightCard melalui prop `onSelect` */}
        {flights.map(flight => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            onSelect={handleSelectFlight} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold">Hasil Pencarian</h1>
          {/* <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Data Mentah (State Flights):</strong>
          <pre className="mt-2 text-xs whitespace-pre-wrap break-all">
            {JSON.stringify(flights, null, 2)}
          </pre>
        </div> */}
          <p className="text-gray-600">
            <span className="font-semibold">{from}</span> ➔ <span className="font-semibold">{to}</span>
            <span className="mx-2">|</span>
            {/* Tambahkan pengecekan `date` untuk menghindari error jika URL tidak lengkap */}
            <span>{date ? new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default SearchResultsPage;