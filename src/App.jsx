import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import OpeningAnimation from './Components/openinganimation'
import Buses from './Components/Buses'
import BusRoutes from './Components/BusRoutes'
import Footer from './Components/Footer'
import './App.css'

const App = () => {
  const [showOpening, setShowOpening] = useState(true);

  const handleOpeningComplete = () => {
    setShowOpening(false);
  };

  return (
    <BrowserRouter>
      <OpeningAnimation onComplete={handleOpeningComplete} /> 
      {!showOpening && (
        <>
          <Navbar />
          <HeroSection />
          <Buses />
          <BusRoutes />
          <Footer />
        </>
      )}
    </BrowserRouter>
  )
}

export default App
