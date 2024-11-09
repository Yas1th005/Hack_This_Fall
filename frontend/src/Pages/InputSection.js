import React,{useState} from 'react'
import Card from '../Components/Card'
import Dropdowns from '../Components/Dropdowns'
import SliderBar from '../Components/SlideBar'
import Toggle from '../Components/Toggle'
import NavBar from '../Components/NavBar'
import Slider from '../Components/Slider'
import PlanetSignalSimulation from './SignalSimulation'
import InterfereSignal from '../Components/Graphs/InterfereSignal'
import ErrorComp from '../Components/ErrorComp'

export default function InputSection() {

    const dated = {
        Original: "01011111",
        Corrupted: "11010100",
        Results: {
          Checksum: { Recovered: "01110001", "Recovery Rate (%)": "50.00", "Corrections Made": 12 },
          "Majority Voting": { Recovered: "01110001", "Recovery Rate (%)": "50.00", "Corrections Made": 12 },
          "Iterative Refinement": { Recovered: "01110001", "Recovery Rate (%)": "50.00", "Corrections Made": 12 }
        }
      };


    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState('');
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    const [error, setError] = useState(0);
    const [data, setData] = useState('');

    const handleSelect1 = (label) => {
        setSource(label);
    };

    const handleSelect2 = (value) => {
        setDestination(value);
    };

    const handleSelect3 = (value) => {
        setDistance(value);
    };

    const handleToggle1 = (value) => {
        setToggle1(!toggle1);
        console.log(toggle1)
    };

    const handleToggle2 = (value) => {
        setToggle2(!toggle2);
        console.log(toggle2)
    };

    const handleToggle3 = (value) => {
        setToggle3(!toggle3);
        console.log(toggle3)
    };

    const handleSelect4 = (value) => {
        setError(value);
    };

    const handleSelect5 = (value) => {
        setData(value);
        console.log(value)
    };

    const [text, setText] = useState(''); // State variable to store text

    const handleChange = (event) => {
        setText(event.target.value); // Update the state when the textarea changes
    };


  return (
    <div className="bg-black text-white h-full">
        <div className=" pt-[50px]">
            <p className="flex justify-center font-sourGummy  text-4xl text-center">Intergalactic Signal Transmission Simulator</p>
            <br/>
            <p className="flex justify-center font-sourGummy text-2xl text-center">Experiment with how distance, interference, and error correction affect data integrity.</p>
        </div>
        <br/><br/><br/>
        <div className="grid grid-cols-2 gap-8 justify-center w-[80%] mx-auto">
            <div>
                <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
                    <h2 className="font-sourGummy text-3xl font-bold mb-4">Signal Transmission Parameters</h2>
                    <p className="font-sourGummy text-2xl text-sm">
                    This is a sample card with a black background and a 3D border effect using Tailwind CSS.
                    </p>    
                    <br/>
                    <div className='grid grid-cols-2 gap-2'>
                        <Dropdowns name="Source" onSelect={handleSelect1}/>  
                        <Dropdowns name="Destination" onSelect={handleSelect2}/> 
                    </div>
                    <br/>
                    <SliderBar onSelect={handleSelect3}/>
                              
                </div>
                <br/><br/>
                <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
                    <h2 className="font-sourGummy text-3xl font-bold mb-4">Interference Zones</h2>
                    <p className="font-sourGummy text-2xl text-sm">
                    This is a sample card with a black background and a 3D border effect using Tailwind CSS.
                    </p>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p className="font-sourGummy text-base">@ Cosmic Interference of Star</p>
                        <Toggle onToggle={handleToggle1}/>
                    </div>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p className="font-sourGummy text-base">@ Interference of Asteroids</p>
                        <Toggle onToggle={handleToggle2}/>
                    </div>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p className="font-sourGummy text-base">@ Cosmic Interference of Star</p>
                        <Toggle onToggle={handleToggle3}/>
                    </div>
                    
                
                </div>
            </div>
            <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
                <h2 className="font-sourGummy text-3xl font-bold mb-4">Transmission Settings</h2>
                <p className="font-sourGummy text-2xl text-sm mb-4">
                    This is a sample card with a black background and a 3D border effect using Tailwind CSS.
                </p>
                
                <NavBar onSelect={handleSelect5}/>
        
                {/* Multi-line Text Input Box */}
                <textarea
                    rows="4"
                    placeholder="Enter your text here..."
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 transition"
                    value={text} // Bind the textarea value to the state
                    onChange={handleChange} // Update state on change
                ></textarea>
                <br/><br/><br/>
                <p className='flex justify-center font-sourGummy text-2xl text-center'>Choose the Error level you want</p>
                <Slider onSelect={handleSelect4}/>   
            </div> 
        </div>
        <br/><br/>
        <InterfereSignal/>
        <br/>
        <ErrorComp data={dated}/>
        <br/><br/>
        <PlanetSignalSimulation/>

        
    </div>
  )
}
