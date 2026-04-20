import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import Buses from './Components/Buses'
import BusRoutes from './Components/BusRoutes'
import About from './Components/About'
import ContactUs from './Components/ContactUs'
import Footer from './Components/Footer'
import OpeningAnimation from './Components/openinganimation'
import Login from './Components/Login'
import Signup from './Components/Signup'
import ProtectedRoute from './Components/ProtectedRoute'
import UserDashboard from './User/UserDashboard'
import MyProfile from './User/MyProfile'
import MyBus from './User/MyBus'
import AdminDashboard from './admin/AdminDashboard'
import LoadingScreen from './Components/LoadingScreen'
import { BusDataProvider } from './contexts/BusDataContext'

import './App.css'

// Create Authentication Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          // Verify token with backend
          const response = await fetch("http://localhost:5000/api/auth/me", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
            
            // Optional: Check if token is close to expiry and refresh if needed
            const tokenExpiry = localStorage.getItem("tokenExpiry");
            if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
              // Token expired, clear it
              handleLogout();
            }
          } else {
            // Token invalid, clear it
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
        }
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (token, userData, expiresIn = 7) => {
    // Store token with expiry
    localStorage.setItem("token", token);
    
    // Set expiry time (default 7 days)
    const expiryTime = Date.now() + (expiresIn * 24 * 60 * 60 * 1000);
    localStorage.setItem("tokenExpiry", expiryTime.toString());
    
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    handleLogin,
    handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

const App = () => {
  const [showOpening, setShowOpening] = React.useState(true);

  const handleOpeningComplete = () => {
    setShowOpening(false);
  };

  return (
    <BrowserRouter>
      <BusDataProvider>
        <AuthProvider>
          {!showOpening && window.location.pathname !== '/dashboard' && <Navbar />}
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            } />
            <Route path="/mybus" element={
              <ProtectedRoute>
                <MyBus />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/buses" element={<Buses />} />
            <Route path="/busroutes" element={<BusRoutes />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </AuthProvider>
      </BusDataProvider>
    </BrowserRouter>
  )
}

export default App
