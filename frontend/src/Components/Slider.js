import React, { useState } from 'react';

function Slider() {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-black text-white">
      {/* Slider Input */}
      <input
        type="range"
        min="0"
        max="2"
        step="1"
        value={value}
        onChange={handleChange}
        className="w-full cursor-pointer appearance-none bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
      />
      {/* Slider Labels */}
      <div className="flex justify-between mt-3 text-sm">
        <span className={value === 0 ? 'text-indigo-500' : ''}>Low</span>
        <span className={value === 1 ? 'text-indigo-500' : ''}>Medium</span>
        <span className={value === 2 ? 'text-indigo-500' : ''}>High</span>
      </div>
    </div>
  );
}

export default Slider;
