
import './App.css'
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage'; // <-- IMPORT HALAMAN BARU

function App() {
  return (
    // Hapus bg-gray-100 dari sini
    <div className="min-h-screen flex flex-col"> 
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
export default App;