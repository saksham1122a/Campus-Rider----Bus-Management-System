import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import Buses from './Components/Buses'
import BusRoutes from './Components/BusRoutes'
import About from './Components/About'
import ContactUs from './Components/ContactUs'
import Footer from './Components/Footer'
import OpeningAnimation from './Components/openinganimation'
import './App.css'

const App = () => {
  const [showOpening, setShowOpening] = React.useState(true);

  const handleOpeningComplete = () => {
    setShowOpening(false);
  };

  return (
    <BrowserRouter>
      {!showOpening && <Navbar />}
      <Routes>
        <Route path="/" element={
          showOpening ? 
            <OpeningAnimation onComplete={handleOpeningComplete} /> : 
            <>
              <HeroSection />
              <Buses />
              <BusRoutes />
              <About />
              <ContactUs />
              <Footer />
            </>
        } />
        <Route path="/buses" element={<Buses />} />
        <Route path="/busroutes" element={<BusRoutes />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
