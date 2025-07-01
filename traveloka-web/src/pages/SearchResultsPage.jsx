import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ItineraryCard from '../components/ItineraryCard';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const flightClass = searchParams.get('class') || 'economy';

  useEffect(() => {
    if (!from || !to || !date) {
      setIsLoading(false);
      setError("Parameter pencarian tidak lengkap.");
      return;
    }

    const fetchItineraries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/itineraries/search`, {
          params: { 
            from, 
            to, 
            date, 
            class: flightClass 
          }
        });
        setItineraries(response.data.data);
      } catch (err) {
        if (err.response && err.response.status === 422) {
            console.error("Validation Errors:", err.response.data.errors);
            setError("Data pencarian tidak valid. Pastikan semua terisi.");
        } else {
            setError("Terjadi kesalahan saat mengambil data perjalanan.");
            console.error("Error fetching itineraries:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchItineraries();
  }, [from, to, date, flightClass]);

  const handleSelectItinerary = (itineraryId) => {
    const selectedItinerary = itineraries.find(itn => itn.id === itineraryId);
    if (selectedItinerary && selectedItinerary.flights.length > 0) {
        const firstFlightId = selectedItinerary.flights[0].id;
        navigate(`/booking/${firstFlightId}?class=${flightClass}`);
    } else {
        console.error("Tidak bisa menemukan detail penerbangan untuk booking.");
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-500 py-10">Mencari rute perjalanan...</div>;
    }
    if (error) {
      return <div className="text-center text-red-500 py-10">{error}</div>;
    }
    if (itineraries.length === 0) {
      return <div className="text-center text-gray-800 py-10">Maaf, rute perjalanan untuk tujuan yang Anda pilih tidak ditemukan.</div>;
    }
    return (
      <div className="space-y-4">
        {itineraries.map(itinerary => (
          <ItineraryCard 
            key={itinerary.id} 
            itinerary={itinerary} 
            selectedClass={flightClass} 
            onSelect={() => handleSelectItinerary(itinerary.id)} 
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