import './App.css';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import FlightCard from './components/FlightCard';

// Kita buat data dummy untuk FlightCard agar bisa ditampilkan
const dummyFlight = {
  id: 1,
  flight_number: 'GA231',
  departure_time: '2025-07-20T08:00:00.000000Z',
  arrival_time: '2025-07-20T10:00:00.000000Z',
  price: 1250000,
  airline: {
    code: 'GA',
    name: 'Garuda Indonesia',
  },
  originAirport: {
    code: 'CGK',
    name: 'Soekarno-Hatta Intl Airport',
    city: 'Jakarta',
  },
  destinationAirport: {
    code: 'DPS',
    name: 'I Gusti Ngurah Rai Intl Airport',
    city: 'Denpasar',
  },
};


function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <main className="container mx-auto p-4 md:p-8">
        {/* Kita letakkan SearchForm di sini */}
        <div className="mb-8">
          <SearchForm />
        </div>
        
        {/* Judul untuk hasil pencarian (contoh) */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contoh Hasil Pencarian</h2>

        {/* Kita tampilkan FlightCard dengan data dummy */}
        <FlightCard flight={dummyFlight} />
        {/* Anda bisa duplikat baris di atas untuk melihat beberapa kartu */}
        
      </main>
    </div>
  )
}

export default App