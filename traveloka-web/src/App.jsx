
import './App.css'
// src/App.jsx// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import BookingPage from './pages/BookingPage'; // <-- 1. Import halaman baru

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          
          {/* 2. DAFTARKAN RUTE DINAMIS DI SINI */}
          {/* Tanda :flightId berarti bagian ini akan dinamis */}
          <Route path="/booking/:flightId" element={<BookingPage />} />

        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;