import React, { useState } from 'react';
import axios from 'axios';

const Error = () => {
  const [inputValue, setInputValue] = useState(["01011111",50,2]);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/error', { inputValue });
      setResponse(res.data.result);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to get a response');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter some text" 
        />
        <button type="submit">Submit</button>
      </form>
      <h3>Response: {response}</h3>
    </div>
  );
};

export default Error;
