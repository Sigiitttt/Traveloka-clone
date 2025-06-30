import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FlightCard from '../components/FlightCard';

function SearchResultsPage() {
  // =================================================================
  // BAGIAN YANG DIPERBAIKI: Urutkan deklarasi di sini
  // =================================================================

  // 1. Panggil semua hooks di bagian paling atas
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 2. Inisialisasi semua state
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. SEKARANG baru gunakan variabel dari hooks
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const flightClass = searchParams.get('class') || 'economy'; // <-- Baris ini sekarang aman

  // =================================================================

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
        setFlights(response.data.data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data penerbangan.");
        console.error("Error fetching flights:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, date]); // Dependency array sudah benar

  const handleSelectFlight = (flightId) => {
    // Bawa serta parameter kelas saat pindah ke halaman booking
    navigate(`/booking/${flightId}?class=${flightClass}`);
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
        {flights.map(flight => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            selectedClass={flightClass} 
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
          <p className="text-gray-600">
            <span className="font-semibold">{from}</span> ➔ <span className="font-semibold">{to}</span>
            <span className="mx-2">|</span>
            {date ? new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
            <span className="mx-2">|</span>
            <span className="capitalize font-semibold">{flightClass}</span>
          </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default SearchResultsPage;