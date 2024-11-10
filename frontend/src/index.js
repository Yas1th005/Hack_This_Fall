import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import SpaceBackground from './Pages/Space';
import PlanetSignalSimulation from './Pages/SignalSimulation';

const root = ReactDOM.createRoot(document.getElementById('root'));

let allRoutes=createBrowserRouter(
  [
    {
      path:"/",
      element:<LandingPage/>
    },
    {
      path:"simulation",
      element:<SpaceBackground/>
    },
    {
      path:"abc",
      element:<PlanetSignalSimulation/>
    }
  ]
)


root.render(
  <React.StrictMode>
    <RouterProvider router={allRoutes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
