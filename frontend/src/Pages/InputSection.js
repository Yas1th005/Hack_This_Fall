import React from 'react'
import Card from '../Components/Card'
import Dropdowns from '../Components/Dropdowns'
import SliderBar from '../Components/SlideBar'
import Toggle from '../Components/Toggle'
import NavBar from '../Components/NavBar'
import Slider from '../Components/Slider'
import PlanetSignalSimulation from './SignalSimulation'

export default function InputSection() {
  return (
    <div className="bg-black text-white h-[1000px]">
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
                        <Dropdowns name={"Source"}/>  
                        <Dropdowns name={"Destination"}/>  
                    </div>
                    <br/>
                    <SliderBar/>
                              
                </div>
                <br/><br/>
                <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
                    <h2 className="font-sourGummy text-3xl font-bold mb-4">Interference Zones</h2>
                    <p className="font-sourGummy text-2xl text-sm">
                    This is a sample card with a black background and a 3D border effect using Tailwind CSS.
                    </p>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p>@ Cosmic Interference of Star</p>
                        <Toggle/>
                    </div>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p>@ Interference of Asteroids</p>
                        <Toggle/>
                    </div>
                    <br/>
                    <div className='grid grid-cols-2 gap-4'>
                        <p>@ Cosmic Interference of Star</p>
                        <Toggle/>
                    </div>
                    
                
                </div>
            </div>
            <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 border-t-4 border-t-indigo-600 hover:shadow-xl transition-shadow">
                <h2 className="font-sourGummy text-3xl font-bold mb-4">Transmission Settings</h2>
                <p className="font-sourGummy text-2xl text-sm mb-4">
                    This is a sample card with a black background and a 3D border effect using Tailwind CSS.
                </p>
                
                <NavBar/>
                {/* Multi-line Text Input Box */}
                <textarea
                    rows="4"
                    placeholder="Enter your text here..."
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 transition"
                ></textarea>
                <br/><br/><br/>
                <p className='flex justify-center font-sourGummy text-2xl text-center'>Choose the Error level you want</p>
                <Slider/>   
            </div> 
        </div>
        <br/><br/>
        <PlanetSignalSimulation/>



    </div>
  )
}
