import React from 'react';
import { Link } from 'react-router-dom';

const FlightCard = ({ flight }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md mb-4">
      <h2 className="text-lg font-bold">{flight.airline.name}</h2>
      <p>{flight.origin_airport.city} ({flight.origin_airport.code}) → {flight.destination_airport.city} ({flight.destination_airport.code})</p>
      <p>Berangkat: {new Date(flight.departure_time).toLocaleString()}</p>
      <p>Harga: Rp{flight.price.toLocaleString()}</p>
      <Link to={`/booking/${flight.id}`} className="bg-green-600 text-white px-4 py-2 rounded inline-block mt-2">Pesan Sekarang</Link>
    </div>
  );
};

export default FlightCard;