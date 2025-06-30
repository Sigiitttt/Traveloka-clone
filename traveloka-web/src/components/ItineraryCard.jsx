// src/components/ItineraryCard.jsx

function ItineraryCard({ itinerary, selectedClass, onSelect }) {
    const flights = itinerary.flights;
    const firstFlight = flights[0];
    const lastFlight = flights[flights.length - 1];

    // Hitung total harga berdasarkan kelas yang dipilih
    const totalPrice = flights.reduce((total, flight) => {
        const price = selectedClass === 'business' ? flight.price_business : flight.price_economy;
        return total + price;
    }, 0);

    // Fungsi untuk menghitung durasi transit/layover
    const calculateLayover = (prevFlight, currentFlight) => {
        // ... (logika kalkulasi durasi sama seperti sebelumnya) ...
        // Anda akan menghitung selisih antara currentFlight.departure_time dan prevFlight.arrival_time
        return "1j 30m"; // Placeholder
    };
    
    return (
        <div className="bg-white border rounded-lg p-4 shadow-md">
            {/* Loop dan tampilkan setiap segmen penerbangan */}
            {flights.map((flight, index) => (
                <React.Fragment key={flight.id}>
                    {/* Tampilkan info transit JIKA ini bukan segmen pertama */}
                    {index > 0 && (
                        <div className="text-center text-sm text-purple-600 font-semibold my-4 py-2 border-y border-dashed">
                            Transit di {flight.origin_airport.city} ({flight.origin_airport.code})
                            {/* Durasi Transit: {calculateLayover(flights[index-1], flight)} */}
                        </div>
                    )}
                    {/* Tampilkan detail untuk segmen ini (mirip FlightCard lama) */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <div>{flight.airline.name}</div>
                        <div>{flight.origin_airport.code} - {flight.destination_airport.code}</div>
                        <div>...waktu...</div>
                        <div>...</div>
                    </div>
                </React.Fragment>
            ))}
            
            {/* Bagian Total Harga dan Tombol Pilih */}
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div>
                    <p className="font-bold text-xl text-orange-500">{formatRupiah(totalPrice)}</p>
                    <p className="text-sm text-gray-500">{itinerary.flights.length > 1 ? 'Transit' : 'Langsung'}</p>
                </div>
                <button onClick={() => onSelect(itinerary.id)} className="...">
                    Pilih
                </button>
            </div>
        </div>
    );
}