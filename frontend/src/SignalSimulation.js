import React, { useState, useEffect } from 'react';
import './SignalSimulation.css';

function SignalSimulation() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev < 100 ? prev + 1 : 0));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="simulation-container">
      <div className="earth">🌍</div>
      <div className="signal" style={{ left: `${position}%` }} />
      <div className="star" style={{ left: '50%' }}>⭐</div>
      <div className="destination">🌌</div>
    </div>
  );
}

export default SignalSimulation;
