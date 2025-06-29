// src/components/PassengerForm.jsx
import React from 'react';

const PassengerForm = ({ index, data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, { ...data, [name]: value });
  };

  return (
    <div className="border p-4 rounded mb-2">
      <h4 className="font-bold">Penumpang {index + 1}</h4>
      <input name="title" placeholder="Title (Mr./Mrs.)" value={data.title} onChange={handleChange} className="w-full border p-2 my-1" />
      <input name="full_name" placeholder="Nama Lengkap" value={data.full_name} onChange={handleChange} className="w-full border p-2 my-1" />
      <input name="date_of_birth" type="date" value={data.date_of_birth} onChange={handleChange} className="w-full border p-2 my-1" />
    </div>
  );
};

export default PassengerForm;