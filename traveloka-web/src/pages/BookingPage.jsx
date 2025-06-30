// src/pages/BookingPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PassengerForm from '../components/PassengerForm'; // Jika digunakan, pastikan komponen ini dipakai atau bisa dihapus
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const formatRupiah = (number) => {
  if (isNaN(number)) return "Rp 0";
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

function BookingPage() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const flightClass = searchParams.get('class') || 'economy';

  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([
    { title: 'Mr.', fullName: '', date_of_birth: '' }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/flights/${flightId}`);
        setFlight(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat detail penerbangan.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFlightDetail();
  }, [flightId]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    for (const passenger of passengers) {
      if (!passenger.fullName.trim() || !passenger.date_of_birth) {
        alert('Harap isi semua data penumpang dengan lengkap.');
        return;
      }
    }

    const bookingData = {
      flight_id: flightId,
      flight_class: flightClass,
      passengers: passengers.map(p => ({
        title: p.title,
        full_name: p.fullName.trim(),
        date_of_birth: p.date_of_birth,
      }))
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookings', bookingData);
      const bookingCode = response.data.data.booking_code;
      alert('Pemesanan Anda telah berhasil!');
      navigate(`/booking/success/${bookingCode}`);
    } catch (error) {
      console.error('Terjadi kesalahan saat melakukan booking:', error.response?.data || error.message);
      alert('Maaf, terjadi kesalahan saat memproses pesanan Anda. Silakan coba lagi.');
    }
  };

  if (isLoading) return <div className="text-center py-10">Memuat detail penerbangan...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!flight) return <div className="text-center py-10">Penerbangan tidak ditemukan.</div>;

``const pricePerTicket = flightClass === 'business' ? flight.price_business : flight.price_economy;
  const totalPrice = pricePerTicket * passengers.length;

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Penumpang */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Isi Data Penumpang</h1>
          <form onSubmit={handleBookingSubmit}>
            {passengers.map((passenger, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Penumpang {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Gelar */}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">Gelar</label>
                    <select
                      value={passenger.title}
                      onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                    >
                      <option value="Mr.">Tuan</option>
                      <option value="Mrs.">Nyonya</option>
                    </select>
                  </div>
                  {/* Nama */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">Nama Lengkap</label>
                    <input
                      type="text"
                      value={passenger.fullName}
                      onChange={(e) => handlePassengerChange(index, 'fullName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                      required
                    />
                  </div>
                  {/* Tgl Lahir */}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">Tanggal Lahir</label>
                    <input
                      type="date"
                      value={passenger.date_of_birth}
                      onChange={(e) => handlePassengerChange(index, 'date_of_birth', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 text-lg"
            >
              Lanjutkan ke Pembayaran
            </button>
          </form>
        </div>

        {/* Detail Penerbangan */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-8 text-gray-600">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-600">Detail Penerbangan</h2>
            <p className="font-semibold text-gray-600">{flight.airline?.name}</p>
            <p className="text-sm text-gray-600">
              {new Date(flight.departure_time).toLocaleDateString('id-ID', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
            <div className="my-4 space-y-2 ">
              <p><strong>{flight.originAirport?.code}</strong> ➔ <strong>{flight.destinationAirport?.code}</strong></p>
              <p className="text-sm text-gray-500">
                {new Date(flight.departure_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {new Date(flight.arrival_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <h2 className="text-xl font-bold border-b pb-2 mb-4 mt-6">Rincian Harga</h2>
            <div className="flex justify-between text-gray-700">
              <p>Harga Tiket ({passengers.length} Penumpang)</p>
              <p>{formatRupiah(totalPrice)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <p>Total Bayar</p>
              <p className="text-orange-500">{formatRupiah(totalPrice)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
