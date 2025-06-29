// src/pages/BookingPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams untuk membaca ID dari URL
import axios from 'axios';
import PassengerForm from '../components/PassengerForm'; // Gunakan lagi komponen form kita

// Fungsi bantuan untuk format Rupiah (bisa juga diimpor dari file terpisah)
const formatRupiah = (number) => {
  if (isNaN(number)) return "Rp 0";
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

function BookingPage() {
  const { flightId } = useParams(); // Ambil flightId dari URL, contoh: /booking/5 -> flightId = 5
  const navigate = useNavigate();

  // State untuk data
  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([{ title: 'Mr.', fullName: '', date_of_birth: '' }]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk mengambil detail 1 penerbangan berdasarkan ID dari URL
  useEffect(() => {
    const fetchFlightDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/flights/${flightId}`);
        setFlight(response.data.data);
      } catch (err) {
        setError("Gagal memuat detail penerbangan.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFlightDetail();
  }, [flightId]); // Berjalan lagi jika flightId berubah

  // Fungsi untuk menangani perubahan pada form penumpang
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };
  
  // Fungsi untuk submit booking (untuk sekarang hanya console.log)
  const handleBookingSubmit = async (e) => {
      e.preventDefault();
      // Nantinya, di sini kita akan mengirim data ke API POST /api/bookings
      const bookingData = {
          flight_id: flightId,
          passengers: passengers
      };
      
      console.log("Data siap dikirim ke backend:", bookingData);
      alert("Booking sedang diproses! (Cek console log untuk melihat data)");

      // Contoh pemanggilan API (bisa diaktifkan nanti)
      /*
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/bookings', bookingData);
          console.log('Booking berhasil:', response.data);
          // Arahkan ke halaman konfirmasi
          // navigate(`/booking/confirmation/${response.data.data.booking_code}`);
      } catch (error) {
          console.error('Error saat booking:', error.response.data);
          alert('Terjadi kesalahan saat booking.');
      }
      */
  };

  // --- Render ---
  if (isLoading) return <div className="text-center py-10">Memuat detail penerbangan...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!flight) return <div className="text-center py-10">Penerbangan tidak ditemukan.</div>;
  
  // Hitung total harga
  const totalPrice = flight.price * passengers.length;

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Penumpang */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Isi Data Penumpang</h1>
          <form onSubmit={handleBookingSubmit}>
            {passengers.map((passenger, index) => (
              // Kita modifikasi sedikit PassengerForm agar bisa di-handle di sini
              // Untuk sekarang, kita tampilkan satu saja
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Penumpang {index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Input Gelar */}
                      <div>
                          <label className="text-sm font-semibold text-gray-600 mb-1 block">Gelar</label>
                          <select value={passenger.title} onChange={(e) => handlePassengerChange(index, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                              <option value="Mr.">Tuan</option>
                              <option value="Mrs.">Nyonya</option>
                          </select>
                      </div>
                      {/* Input Nama */}
                      <div className="md:col-span-2">
                          <label className="text-sm font-semibold text-gray-600 mb-1 block">Nama Lengkap</label>
                          <input type="text" value={passenger.fullName} onChange={(e) => handlePassengerChange(index, 'fullName', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
                      </div>
                      {/* Input Tgl Lahir */}
                      <div>
                          <label className="text-sm font-semibold text-gray-600 mb-1 block">Tanggal Lahir</label>
                          <input type="date" value={passenger.date_of_birth} onChange={(e) => handlePassengerChange(index, 'date_of_birth', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
                      </div>
                  </div>
              </div>
            ))}
            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 text-lg">
              Lanjutkan ke Pembayaran
            </button>
          </form>
        </div>

        {/* Kolom Kanan: Detail Penerbangan & Rincian Harga */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
            <h2 className="text-xl font-bold border-b pb-2 mb-4">Detail Penerbangan</h2>
            <p className="font-semibold">{flight.airline.name}</p>
            <p className="text-sm text-gray-600">{new Date(flight.departure_time).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <div className="my-4 space-y-2">
              <p><strong>{flight.originAirport.code}</strong> ➔ <strong>{flight.destinationAirport.code}</strong></p>
              <p className="text-sm text-gray-500">{new Date(flight.departure_time).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})} - {new Date(flight.arrival_time).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}</p>
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