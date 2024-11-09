import './App.css';
import DataDisplay from './Components/DataDisplay';
import InterfereSignal from './Components/Graphs/InterfereSignal';
import Error from './Pages/Error';
import InputSection from './Pages/InputSection';
import LandingPage from './Pages/LandingPage';
import PlanetSignalSimulation from './Pages/SignalSimulation';
import SignalSimulation from './Pages/SignalSimulation';
import SpaceBackground from './Pages/Space';

function App() {

  const data = {
    Original: "01011111",
    Corrupted: "11010100",
    Results: {
      Checksum: { Recovered: "01110001", "Recovery Rate (%)": "50.00", "Corrections Made": 12 },
      "Majority Voting": { Recovered: "01110001", "Recovery Rate (%)": "50.00", "Corrections Made": 12 },
      "Iterative Refinement": { Recovered: "01110001", "Recovery Rate (%)": "50.00", "Corrections Made": 12 }
    }
  };


  return (
    // <LandingPage/>
    // <PlanetSignalSimulation/>
    // <InputSection/>
    // <InterfereSignal/>
    // <Error/>
    // <div style={{ backgroundColor: "#000000", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    //   <DataDisplay data={data} />
    // </div>
    <SpaceBackground/>
  );
}

export default App;
