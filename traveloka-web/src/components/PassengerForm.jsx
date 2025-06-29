import React, { useState } from 'react';

// Komponen ini menerima 'passengerNumber' sebagai prop untuk menampilkan urutan
function PassengerForm({ passengerNumber }) {
  const [title, setTitle] = useState('Mr.');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(''); // dob = date of birth

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Penumpang {passengerNumber}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Input Gelar */}
        <div className="flex flex-col">
          <label htmlFor={`title-${passengerNumber}`} className="text-sm font-semibold text-gray-600 mb-1">
            Gelar
          </label>
          <select
            id={`title-${passengerNumber}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="Mr.">Tuan (Mr.)</option>
            <option value="Mrs.">Nyonya (Mrs.)</option>
            <option value="Ms.">Nona (Ms.)</option>
          </select>
        </div>

        {/* Input Nama Lengkap */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor={`fullName-${passengerNumber}`} className="text-sm font-semibold text-gray-600 mb-1">
            Nama Lengkap (sesuai KTP/Paspor)
          </label>
          <input
            type="text"
            id={`fullName-${passengerNumber}`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Input Tanggal Lahir */}
        <div className="flex flex-col">
          <label htmlFor={`dob-${passengerNumber}`} className="text-sm font-semibold text-gray-600 mb-1">
            Tanggal Lahir
          </label>
          <input
            type="date"
            id={`dob-${passengerNumber}`}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default PassengerForm;