// src/pages/ConfirmationPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmationPage = () => {
  const { code } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/bookings/${code}`).then(res => setBooking(res.data)).finally(() => setLoading(false));
  }, [code]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!booking) return <p className="p-4">Pemesanan tidak ditemukan.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Pemesanan Berhasil!</h1>
      <p className="text-lg">Kode Booking: <strong>{booking.booking_code}</strong></p>
      <div className="bg-gray-100 p-4 mt-4 rounded text-left">
        <p><strong>Penerbangan:</strong> {booking.flight.airline.name}</p>
        <p><strong>Dari:</strong> {booking.flight.origin_airport.city} ({booking.flight.origin_airport.code})</p>
        <p><strong>Ke:</strong> {booking.flight.destination_airport.city} ({booking.flight.destination_airport.code})</p>
        <p><strong>Berangkat:</strong> {new Date(booking.flight.departure_time).toLocaleString()}</p>
        <p><strong>Total Penumpang:</strong> {booking.total_passengers}</p>
        <p><strong>Total Harga:</strong> Rp{booking.total_price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
