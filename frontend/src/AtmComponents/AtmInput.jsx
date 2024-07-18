
import React from 'react';

const AtmInput = ({ type = 'text', placeholder = '', value, onChange, className = '', label }) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-2 text-sm font-semibold text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition ease-out duration-300 ${className}`}
      />
    </div>
  );
};

export default AtmInput;
