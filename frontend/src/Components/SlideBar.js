import React, { useState } from 'react';

const SliderBar = ({onSelect}) => {
  const [value, setValue] = useState(50); // Default value is 50%

  // Handle slider change
  const handleChange = (e) => {
    setValue(e.target.value);
    onSelect(e.target.value);
  };



  return (
    <div className="grid grid-cols-3 gap-3 items-center justify-center bg-black text-white">
      <h2 className="font-sourGummy text-2xl mb-4">Adjust Distance</h2>
      

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-50 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <p className="font-sourGummy text-lg mb-4">{value}%</p>
    </div>
  );
};

export default SliderBar;
