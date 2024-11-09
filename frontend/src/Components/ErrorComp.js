import React from 'react'

export default function ErrorComp({data}) {

    const { Original, Corrupted, Results } = data;

  return (
    <div className="w-[80%] mx-auto bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
      <h2 className="font-sourGummy text-3xl font-bold mb-4 text-center">Error Detection and Correction</h2>

      {/* Display Original and Corrupted data */}
      <div className="mb-6 text-center">
        <p className="text-lg">
          <strong>Original:</strong> {Original}
        </p>
        <p className="text-lg">
          <strong>Received:</strong> {Corrupted}
        </p>
      </div>

      {/* Display Results for each method */}
      <div className='grid grid-cols-3 gap-4'>
      {Object.entries(Results).map(([method, stats]) => (
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
      
    </div>
  )
}
