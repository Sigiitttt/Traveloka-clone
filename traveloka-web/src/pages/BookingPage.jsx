import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PassengerForm from '../components/PassengerForm';

const BookingPage = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([{ title: '', full_name: '', date_of_birth: '' }]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/flights/${id}`).then(res => setFlight(res.data)).finally(() => setLoading(false));
  }, [id]);

  const handlePassengerChange = (index, data) => {
    const updated = [...passengers];
    updated[index] = data;
    setPassengers(updated);
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { title: '', full_name: '', date_of_birth: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/bookings', {
        flight_id: flight.id,
        passengers,
      });
      navigate(`/confirmation/${res.data.booking_code}`);
    } catch (err) {
      alert('Gagal membuat pemesanan');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!flight) return <p className="p-4">Penerbangan tidak ditemukan.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Isi Data Penumpang</h1>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p><strong>{flight.airline.name}</strong>: {flight.origin_airport.city} ({flight.origin_airport.code}) → {flight.destination_airport.city} ({flight.destination_airport.code})</p>
        <p>Keberangkatan: {new Date(flight.departure_time).toLocaleString()}</p>
        <p>Harga per orang: Rp{flight.price.toLocaleString()}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {passengers.map((data, idx) => (
          <PassengerForm key={idx} index={idx} data={data} onChange={handlePassengerChange} />
        ))}
        <button type="button" onClick={handleAddPassenger} className="bg-gray-600 text-white px-4 py-2 rounded mb-4">+ Tambah Penumpang</button>
        <br />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Konfirmasi Pemesanan</button>
      </form>
    </div>
  );
};

export default BookingPage;
