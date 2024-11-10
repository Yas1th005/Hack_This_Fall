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
import ButtonRes from '../Components/ButtonRes'
import Loading from '../Components/Loading'

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
    const [distance, setDistance] = useState(0);
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    const [toggle4, setToggle4] = useState(false);
    const [error, setError] = useState(0);
    const [data, setData] = useState('');
    const [simulation, setSimulation] = useState(false);
    const [errorLevel, setErrorLevel] = useState(0); // Initialize with default value 0
    const [loading, setLoading] = useState(true); // Initialize with default value ''

    const handleInputChange = (event) => {
        setErrorLevel(Number(event.target.value)); // Store the value as a number
    };

    const handleSelect1 = (label) => {
        setSource(label);
    };

    const handleSelect2 = (value) => {
        setDestination(value);
        setDistance(627.47)
    };

    const handleSelect3 = (value) => {
        setDistance(Number(value));
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

    const handleToggle4 = (value) => {
        setToggle4(!toggle4);
        console.log(toggle3)
    };

    const handleSelect4 = (value) => {
        setError(value);
    };

    const handleSelect5 = (value) => {
        setData(value);
        console.log(value)
    };

    const countdown=() => {
        // Set a timer for 5 seconds (5000 milliseconds) to stop loading
        const timer = setTimeout(() => setLoading(false), 5000);
        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);
      };

    const handleSelect6 = () => {
        setSimulation(true);
        countdown();
        console.log(simulation)
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
                    
                    Signal strength decreases with distance due to free-space path loss, where power reduces proportionally to the square of the distance from the source, affecting clarity and reliability over long-range communications.
                    </p>    
                    <br/>
                    <div className='grid grid-cols-2 gap-2'>
                        <Dropdowns name="Source" onSelect={handleSelect1}/>  
                        <Dropdowns name="Destination" onSelect={handleSelect2}/> 
                    </div>
                    <br/>
                    <SliderBar onSelect={handleSelect3}/>
                    <p className='font-sourGummy text-2xl mb-4'>Distance: {distance} {distance?<>million km</>:<></>}</p>
                              
                </div>
                <br/><br/>
                <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
                    <h2 className="font-sourGummy text-3xl font-bold mb-4">Interference Zones</h2>
                    <p className="font-sourGummy text-2xl text-sm">
                    Interference zones, like regions near the Sun, dense cosmic objects, or Earth's atmosphere, introduce noise and signal distortion due to electromagnetic radiation, charged particles, and atmospheric scattering, impacting clarity and reliability.
                    </p>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p className="font-sourGummy text-base">@ Cosmic Interference of Star</p>
                        <Toggle onToggle={handleToggle1}/>
                    </div>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p className="font-sourGummy text-base">@ Interstellar Medium (ISM)</p>
                        <Toggle onToggle={handleToggle2}/>
                    </div>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p className="font-sourGummy text-base">@ Magnetic fields from planets</p>
                        <Toggle onToggle={handleToggle3}/>
                    </div>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p className="font-sourGummy text-base">@ Quantum Noise at low signal level</p>
                        <Toggle onToggle={handleToggle4}/>
                    </div>
                    
                
                </div>
            </div>
            <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
                <h2 className="font-sourGummy text-3xl font-bold mb-4">Transmission Settings</h2>
                <br/>
                <p className="font-sourGummy text-2xl text-sm mb-4">
                    
                Transmission settings, such as frequency, modulation type, and power level, are carefully selected to optimize signal clarity over distance; higher frequencies allow faster data rates but suffer more from attenuation, especially in space. Lower frequencies travel farther with less loss, though they may carry less data and be more susceptible to interference. Power settings also impact transmission range, with higher power improving reach but consuming more energy, which is critical for long-distance, energy-limited space communications.
                </p>
                <br/><br/>
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
                
                <p className='flex justify-center font-sourGummy text-2xl text-center'>
                    Enter Signal Strength in GHz:
                </p>
                <br/>
                <input
                    type='number'
                    value={errorLevel}
                    onChange={handleInputChange}
                    className='w-full bg-gray-900 text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 transition'
                    placeholder='Enter a number'
                />  
            </div> 
        </div>
        <br/><br/>
        <div className="flex justify-center items-center">
            <ButtonRes onSelect={handleSelect6}/>
        </div>
        {!simulation?
        <></>:<>
        {loading?<>
            <Loading/>
        </>:<>
            <br/><br/>
            <InterfereSignal distance={distance} toggle1={toggle1} toggle2={toggle2} toggle3={toggle3} toggle4={toggle4} errorLevel={errorLevel}/>
            <br/>
            <ErrorComp text={text}/>
            <br/><br/>
        </>}

        <PlanetSignalSimulation/>
        
        </>}
        
        {/* <PlanetSignalSimulation/> */}

        
    </div>
  )
}
