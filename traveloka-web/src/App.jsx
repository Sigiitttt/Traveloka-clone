import './App.css';
import { Routes, Route } from 'react-router-dom'; // <-- 1. Import Routes dan Route
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; // <-- 2. Import halaman yang sudah dibuat

// Komponen lain seperti FlightCard & PassengerForm tidak perlu di-import di sini lagi

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Konten utama akan dirender oleh Router */}
      <main className="flex-grow">
        <Routes> {/* 3. Gunakan Routes untuk mendefinisikan rute-rute */}
          
          {/* Rute untuk Halaman Utama */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rute untuk halaman lain akan ditambahkan di sini nanti */}
          {/* Contoh: <Route path="/search-results" element={<SearchResultsPage />} /> */}
          {/* Contoh: <Route path="/booking" element={<BookingPage />} /> */}

        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default App