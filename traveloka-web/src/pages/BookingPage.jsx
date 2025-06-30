import React, { useState, useEffect } from 'react';
// 1. Impor digabungkan menjadi satu baris yang rapi
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// PassengerForm tidak digunakan, jadi impornya kita hapus.

// Fungsi helper ini sudah bagus, tidak perlu diubah.
const formatRupiah = (number) => {
  if (isNaN(number)) return "Rp 0";
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

function BookingPage() {
  // --- INISIALISASI HOOKS ---
  const { flightId } = useParams();
  const navigate = useNavigate();
  // 2. Inisialisasi searchParams dengan benar
  const [searchParams] = useSearchParams();
  const flightClass = searchParams.get('class') || 'economy';

  // --- STATE ---
  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([
    { title: 'Mr.', fullName: '', date_of_birth: '' }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk proses submit
  const [error, setError] = useState(null);

  // --- useEffect untuk mengambil data penerbangan ---
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

  // --- FUNGSI-FUNGSI HANDLER ---
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  // 3. Fungsi baru untuk menambah penumpang
  const addPassenger = () => {
    setPassengers([...passengers, { title: 'Mr.', fullName: '', date_of_birth: '' }]);
  };

  // 4. Fungsi baru untuk menghapus penumpang
  const removePassenger = (index) => {
    if (passengers.length <= 1) return; // Minimal 1 penumpang
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Mulai proses submit, nonaktifkan tombol

    for (const passenger of passengers) {
      if (!passenger.fullName.trim() || !passenger.date_of_birth) {
        alert('Harap isi semua data penumpang dengan lengkap.');
        setIsSubmitting(false); // Batalkan submit, aktifkan kembali tombol
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
    } finally {
        setIsSubmitting(false); // Selesai submit, aktifkan kembali tombol
    }
  };

  // --- RENDER LOGIC ---
  if (isLoading) return <div className="text-center py-10">Memuat detail penerbangan...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!flight) return <div className="text-center py-10">Penerbangan tidak ditemukan.</div>;

  const pricePerTicket = flightClass === 'business' ? flight.price_business : flight.price_economy;
  const totalPrice = pricePerTicket * passengers.length;

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Penumpang */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Isi Data Penumpang</h1>
            {/* 5. Tombol untuk menambah penumpang */}
            <button onClick={addPassenger} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 text-sm">
              + Tambah Penumpang
            </button>
          </div>
          <form onSubmit={handleBookingSubmit}>
            {passengers.map((passenger, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 mb-4 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Penumpang {index + 1}</h3>
                  {/* 6. Tombol untuk menghapus penumpang */}
                  {passengers.length > 1 && (
                    <button type="button" onClick={() => removePassenger(index)} className="text-red-500 hover:text-red-700 font-semibold text-sm">
                      Hapus
                    </button>
                  )}
                </div>
                {/* Formnya tidak berubah, hanya memindahkan ke sini */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-600 mb-1 block">Gelar</label>
                        <select value={passenger.title} onChange={(e) => handlePassengerChange(index, 'title', e.target.value)} className="w-full p-2 border text-gray-700 border-gray-300 rounded-md">
                            <option value="Mr.">Tuan</option>
                            <option value="Mrs.">Nyonya</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-600 mb-1 block">Nama Lengkap</label>
                        <input type="text" value={passenger.fullName} onChange={(e) => handlePassengerChange(index, 'fullName', e.target.value)} className="w-full p-2 border text-gray-700 border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-600 mb-1 block">Tanggal Lahir</label>
                        <input type="date" value={passenger.date_of_birth} onChange={(e) => handlePassengerChange(index, 'date_of_birth', e.target.value)} className="w-full p-2 border text-gray-700 border-gray-300 rounded-md" required />
                    </div>
                </div>
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting} // 7. Tombol dinonaktifkan saat proses submit
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-md text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-orange-600"
            >
              {isSubmitting ? 'Memproses...' : 'Lanjutkan ke Pembayaran'}
            </button>
          </form>
        </div>

        {/* Kolom Kanan: Detail Penerbangan & Rincian Harga */}
        <div className="lg:col-span-1">
            {/* ... bagian ini tidak ada perubahan ... */}
        </div>

      </div>
    </div>
  );
}

export default BookingPage;