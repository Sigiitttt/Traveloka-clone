import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [airports, setAirports] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/airports')
      .then(res => {
        console.log('Fetched airports:', res.data);
        setAirports(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch airports:', err);
        setAirports([]); // fallback
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to || !date) return alert('Lengkapi semua field');
    navigate(`/search?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="border p-2 rounded"
        required
      >
        <option value="">Dari</option>
        {Array.isArray(airports) && airports.map(airport => (
          <option key={airport.id} value={airport.id}>
            {airport.city} ({airport.code})
          </option>
        ))}
      </select>

      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 rounded"
        required
      >
        <option value="">Ke</option>
        {Array.isArray(airports) && airports.map(airport => (
          <option key={airport.id} value={airport.id}>
            {airport.city} ({airport.code})
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Cari Penerbangan
      </button>
    </form>
  );
};

export default SearchForm;
