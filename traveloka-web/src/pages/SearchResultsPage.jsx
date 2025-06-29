// src/pages/SearchResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import FlightCard from '../components/FlightCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');

    axios
      .get(`/flights/search`, {
        params: { from, to, date },
      })
      .then((res) => setFlights(res.data))
      .catch(() => setFlights([]))
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Hasil Pencarian Penerbangan</h1>
      {loading ? (
        <p>Loading...</p>
      ) : flights.length > 0 ? (
        flights.map((flight) => <FlightCard key={flight.id} flight={flight} />)
      ) : (
        <p className="text-gray-600">Tidak ada penerbangan ditemukan.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;