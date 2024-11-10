import React, { useState,useEffect } from 'react'
import axios from 'axios';

export default function ErrorComp(props) {

  const [inputValue, setInputValue] = useState(props.text);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true); // Start loading when the fetch begins
      try {
        if (inputValue) {
          const response = await axios.post('http://localhost:5001/error', {
            inputValue: inputValue,
          });
          
          if (response.data && 'result' in response.data) {
            setResult(response.data.result);
            setError('');
          } else if (response.data && 'error' in response.data) {
            setError(response.data.error);
            setResult('');
          } else {
            setError('Unexpected response format');
            setResult('');
          }
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to connect to the server');
        setResult('');
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (inputValue) {
        fetchResult();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);


  return (
    <div className="w-[80%] mx-auto bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
      {result?<>
        <h2 className="font-sourGummy text-3xl font-bold mb-4 text-center">Error Detection and Correction</h2>

{/* Display Original and Corrupted data */}
<div className="mb-6 text-center">
  <p className="text-lg">
    <strong>Original:</strong> {result['Original']}
  </p>
  <p className="text-lg">
    <strong>Received:</strong> {result['Corrupted']}
  </p>
</div>

{/* Display Results for each method */}
<div className='grid grid-cols-3 gap-4'>
{Object.entries(result['Results']).map(([method, stats]) => (
  <div key={method} className="bg-gray-800 p-4 mb-4 rounded-lg border border-gray-700">
    <h3 className="font-sourGummy text-2xl font-semibold mb-2 text-indigo-400">{method}</h3>
    <div className="space-y-1">
      <p>
        <strong>Recovered:</strong> {stats.Recovered}
      </p>
      <p>
        <strong>Recovery Rate (%):</strong> {stats["Recovery Rate (%)"]}
      </p>
      <p>
        <strong>Corrections Made:</strong> {stats["Corrections Made"]}
      </p>
    </div>
  </div>
))}
</div>
      </>:<></>}
      
      
    </div>
  )
}
