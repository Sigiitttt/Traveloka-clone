import React from 'react';

// Fungsi bantu: format angka jadi Rupiah
const formatRupiah = (value) => {
    return value.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });
};

// Fungsi bantu: format jam ke "HH:mm"
const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

// Fungsi bantu: menghitung durasi transit
const calculateLayover = (prevFlight, currentFlight) => {
    const arrival = new Date(prevFlight.arrival_time);
    const departure = new Date(currentFlight.departure_time);

    const diffMs = departure - arrival;
    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}j ${minutes}m`;
};

function ItineraryCard({ itinerary, selectedClass, onSelect }) {
    const flights = itinerary.flights;

    const totalPrice = flights.reduce((total, flight) => {
        const price = selectedClass === 'business' ? flight.price_business : flight.price_economy;
        return total + price;
    }, 0);

    return (
        <div className="bg-white border rounded-lg p-4 shadow-md">
            {flights.map((flight, index) => (
                <React.Fragment key={flight.id}>
                    {index > 0 && (
                        <div className="text-center text-sm text-purple-600 font-semibold my-4 py-2 border-y border-dashed">
                            Transit di {flight.origin_airport.city} ({flight.origin_airport.code}) – {calculateLayover(flights[index - 1], flight)}
                        </div>
                    )}

                    <div className="grid grid-cols-4 gap-4 items-center py-2">
                        <div className="font-medium">{flight.airline.name}</div>
                        <div>{flight.origin_airport.code} → {flight.destination_airport.code}</div>
                        <div>
                            {formatTime(flight.departure_time)} - {formatTime(flight.arrival_time)}
                        </div>
                        <div className="text-right text-sm text-gray-600">
                            {selectedClass === 'business'
                                ? formatRupiah(flight.price_business)
                                : formatRupiah(flight.price_economy)}
                        </div>
                    </div>
                </React.Fragment>
            ))}

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div>
                    <p className="font-bold text-xl text-orange-500">{formatRupiah(totalPrice)}</p>
                    <p className="text-sm text-gray-500">{flights.length > 1 ? 'Transit' : 'Langsung'}</p>
                </div>
                <button
                    onClick={() => onSelect(itinerary.id)}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                >
                    Pilih
                </button>
            </div>
        </div>
    );
}

export default ItineraryCard;
