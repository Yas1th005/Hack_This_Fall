import React from 'react';
import './Space.css';
import InputSection from './InputSection';

const SpaceBackground = () => {
  return (
    <div className="relative w-full h-[3000px] overflow-hidden bg-dark">
      <div className="stars"></div>
      <InputSection/>
    </div>
  );
};

export default SpaceBackground;
