import React, { useState } from 'react';

const Dropdowns = ({ name, onSelect }) => {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    onSelect(option.label); // Pass the label to the parent
  };

  const options = [
    { value: '1', label: 'Male' },
    { value: '0', label: 'Female' },
  ];

  return (
    <div className="relative w-64">
      {/* Dropdown Header */}
      <div
        className="bg-gray-800 text-white p-2 rounded cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || name}</span>
        <i className={`ml-2 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▼
        </i>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-gray-900 text-white rounded shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-3 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdowns;
