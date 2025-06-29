// HomePage.jsx
import SearchForm from '../components/SearchForm';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-white px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 leading-tight mb-4">
          Temukan Tiket Penerbangan Terbaikmu
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
          Cari dan pesan tiket pesawat dengan mudah dan cepat. Nikmati pengalaman pemesanan yang nyaman seperti di Traveloka.
        </p>
        <div className="w-full max-w-3xl">
          <SearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative -mt-24 z-10 px-4 pb-20">
        <div className="bg-white shadow-xl rounded-2xl py-12 px-6 md:px-16 container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="text-white bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 shadow-md">
                ✓
              </div>
              <h3 className="font-semibold text-lg text-blue-900 mb-2">Pilihan Lengkap</h3>
              <p className="text-gray-600">Terbang ke mana saja dengan ratusan pilihan maskapai.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-white bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 shadow-md">
                ✓
              </div>
              <h3 className="font-semibold text-lg text-blue-900 mb-2">Harga Terbaik</h3>
              <p className="text-gray-600">Jaminan harga termurah untuk semua rute favoritmu.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-white bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 shadow-md">
                ✓
              </div>
              <h3 className="font-semibold text-lg text-blue-900 mb-2">Aman & Mudah</h3>
              <p className="text-gray-600">Transaksi aman dengan proses pemesanan yang cepat.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
