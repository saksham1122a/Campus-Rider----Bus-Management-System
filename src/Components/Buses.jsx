import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../Stylesheets/Buses.css';

const Buses = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const buses = [
    {
      id: 1,
      name: "Bus 8 (1455)",
      route: "Kohade",
      destination: "PCTE Parking",
      driver: "Rajesh Kumar",
      status: "active",
      capacity: 50,
      currentPassengers: 28,
      nextStop: "Kohade Road",
      arrivalTime: "07:30 AM",
      features: ["Camera", "GPS", "Tracking"],
      color: "#4FC3F7"
    },
    {
      id: 2,
      name: "Bus 7 (9755)",
      route: "Veer Palace",
      destination: "PCTE Parking",
      driver: "Amit Sharma",
      status: "active",
      capacity: 45,
      currentPassengers: 32,
      nextStop: "Veer Palace Junction",
      arrivalTime: "07:50 AM",
      features: ["WiFi", "AC", "USB Charging"],
      color: "#1F8FA3"
    },
    {
      id: 3,
      name: "Bus 6 (1855)",
      route: "Police Colony",
      destination: "PCTE Parking",
      driver: "Vikram Singh",
      status: "active",
      capacity: 48,
      currentPassengers: 35,
      nextStop: "Police Colony Gate",
      arrivalTime: "07:55 AM",
      features: ["WiFi", "AC", "Security"],
      color: "#ff6b35"
    },
    {
      id: 4,
      name: "Bus 16 (1155)",
      route: "Samrala Chowk",
      destination: "PCTE Parking",
      driver: "Anil Verma",
      status: "active",
      capacity: 52,
      currentPassengers: 38,
      nextStop: "Samrala Chowk",
      arrivalTime: "08:04 AM",
      features: ["WiFi", "AC", "Live Tracking"],
      color: "#87CEEB"
    },
    {
      id: 5,
      name: "Bus 9 (9055)",
      route: "Sherpur",
      destination: "PCTE Parking",
      driver: "Mohan Das",
      status: "active",
      capacity: 46,
      currentPassengers: 30,
      nextStop: "Sherpur Main",
      arrivalTime: "07:55 AM",
      features: ["WiFi", "AC", "Priority Seating"],
      color: "#4FC3F7"
    },
    {
      id: 6,
      name: "Bus 13 (7889)",
      route: "Vasti",
      destination: "PCTE Parking",
      driver: "Ramesh Patel",
      status: "active",
      capacity: 44,
      currentPassengers: 28,
      nextStop: "Vasti Center",
      arrivalTime: "07:55 AM",
      features: ["WiFi", "AC", "GPS"],
      color: "#134e4a"
    },
    {
      id: 7,
      name: "Bus 12 (1555)",
      route: "Kalash Nagar",
      destination: "PCTE Parking",
      driver: "Suresh Kumar",
      status: "active",
      capacity: 50,
      currentPassengers: 40,
      nextStop: "Kalash Nagar",
      arrivalTime: "08:00 AM",
      features: ["WiFi", "AC", "USB"],
      color: "#4FC3F7"
    },
    {
      id: 8,
      name: "Bus 10 (0489)",
      route: "Kapoor",
      destination: "PCTE Parking",
      driver: "Prakash Singh",
      status: "active",
      capacity: 42,
      currentPassengers: 25,
      nextStop: "Kapoor Junction",
      arrivalTime: "07:55 AM",
      features: ["WiFi", "AC", "Tracking"],
      color: "#1F8FA3"
    },
    {
      id: 9,
      name: "Bus 18",
      route: "Dugri",
      destination: "PCTE Parking",
      driver: "Deepak Kumar",
      status: "active",
      capacity: 48,
      currentPassengers: 35,
      nextStop: "Dugri Road",
      arrivalTime: "08:05 AM",
      features: ["WiFi", "AC", "GPS"],
      color: "#ff6b35"
    },
    {
      id: 10,
      name: "Bus 15 & 14 (5679, 3445)",
      route: "Jugraon",
      destination: "PCTE Parking",
      driver: "Ravi Kumar & Arun Singh",
      status: "active",
      capacity: 90,
      currentPassengers: 65,
      nextStop: "Jugraon Junction",
      arrivalTime: "08:00 AM",
      features: ["WiFi", "AC", "Security", "Live Tracking"],
      color: "#87CEEB"
    },
    {
      id: 11,
      name: "Bus 11 (2350)",
      route: "Gardroo",
      destination: "PCTE Parking",
      driver: "Manoj Kumar",
      status: "active",
      capacity: 45,
      currentPassengers: 30,
      nextStop: "Gardroo Main",
      arrivalTime: "08:05 AM",
      features: ["WiFi", "AC", "GPS"],
      color: "#4FC3F7"
    },
    {
      id: 12,
      name: "Bus 17 (8112)",
      route: "Tajpur Road / Raikot",
      destination: "PCTE Parking",
      driver: "Sanjay Kumar",
      status: "active",
      capacity: 50,
      currentPassengers: 38,
      nextStop: "Tajpur Road",
      arrivalTime: "07:40 AM",
      features: ["WiFi", "AC", "Live Tracking"],
      color: "#134e4a"
    },
    {
      id: 13,
      name: "Private - Habowal",
      route: "Habowal",
      destination: "PCTE Parking",
      driver: "Private Operator",
      status: "active",
      capacity: 80,
      currentPassengers: 55,
      nextStop: "Habowal Road",
      arrivalTime: "08:15 AM",
      features: ["WiFi", "AC", "Premium Service"],
      color: "#ff6b35"
    },
    {
      id: 14,
      name: "Private - Gill Nehar",
      route: "Gill Nehar",
      destination: "PCTE Parking",
      driver: "Private Operator",
      status: "active",
      capacity: 75,
      currentPassengers: 48,
      nextStop: "Gill Nehar Road",
      arrivalTime: "08:10 AM",
      features: ["WiFi", "AC", "Premium"],
      color: "#87CEEB"
    }
  ];

  const handleBusClick = (bus) => {
    setSelectedBus(selectedBus === bus.id ? null : bus.id);
    console.log('Bus clicked:', bus.name, 'ID:', bus.id);
  };

  const handleBusHover = (busId) => {
    setSelectedBus(busId);
  };

  const handleBusLeave = () => {
    setSelectedBus(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'delayed': return '#f59e0b';
      case 'inactive': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '';
      case 'delayed': return '';
      case 'inactive': return '';
      default: return '';
    }
  };

  return (
    <div className="buses-page">
      {/* Animated Background */}
      <div className="buses-background">
        <div className="floating-bus-1">🚌</div>
        <div className="floating-bus-2">🚐</div>
        <div className="floating-bus-3">📍</div>
      </div>

      {/* Header */}
      <motion.div 
        className="buses-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1>Campus Bus Fleet</h1>
        <p>Real-time tracking and management</p>
      </motion.div>

      {/* Bus Cards Grid */}
      <div className="buses-grid">
        <AnimatePresence>
          {buses.map((bus, index) => (
            <motion.div
              key={bus.id}
              className={`bus-card ${selectedBus === bus.id ? 'selected' : ''}`}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                y: 50
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0
              }}
              transition={{ 
                duration: 0.6,
                delay: isLoaded ? index * 0.1 : 0,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                boxShadow: "0 25px 50px rgba(79, 195, 247, 0.4)",
                cursor: "pointer"
              }}
              whileTap={{ 
                scale: 0.97,
                transition: { duration: 0.1 }
              }}
              onClick={() => handleBusClick(bus)}
              onMouseEnter={() => handleBusHover(bus.id)}
              onMouseLeave={handleBusLeave}
              style={{
                borderTop: `3px solid ${bus.color}`,
                borderLeft: selectedBus === bus.id ? `3px solid ${bus.color}` : 'none',
                cursor: 'pointer'
              }}
            >
              {/* Card Header */}
              <div className="bus-header">
                <div className="bus-name-section">
                  <h3>{bus.name}</h3>
                  <span className="bus-status">
                    {getStatusIcon(bus.status)} {bus.status.toUpperCase()}
                  </span>
                </div>
                <div className="bus-arrival">
                  <span className="arrival-time">{bus.arrivalTime}</span>
                  <span className="arrival-label">Next Arrival</span>
                </div>
              </div>

              {/* Route Information */}
              <div className="bus-route">
                <div className="route-icon">🛤️</div>
                <div className="route-info">
                  <p className="route-start">{bus.route}</p>
                  <div className="route-arrow">➡️</div>
                  <p className="route-destination">{bus.destination}</p>
                </div>
              </div>

              {/* Driver Information */}
              <div className="bus-driver">
                <div className="driver-avatar">
                  <div className="avatar-placeholder">👤</div>
                </div>
                <div className="driver-info">
                  <span className="driver-name">{bus.driver}</span>
                  <span className="driver-title">Driver</span>
                </div>
              </div>

              {/* Capacity Information */}
              <div className="bus-capacity">
                <div className="capacity-bar">
                  <div 
                    className="capacity-fill"
                    style={{
                      width: `${(bus.currentPassengers / bus.capacity) * 100}%`,
                      backgroundColor: bus.color
                    }}
                  />
                </div>
                <div className="capacity-text">
                  <span className="current">{bus.currentPassengers}</span>
                  <span className="total">/ {bus.capacity}</span>
                  <span className="label">Passengers</span>
                </div>
              </div>

              {/* Next Stop */}
              <div className="bus-next-stop">
                <div className="stop-icon">📍</div>
                <div className="stop-info">
                  <span className="stop-name">{bus.nextStop}</span>
                  <span className="stop-label">Next Stop</span>
                </div>
              </div>

              {/* Features */}
              <div className="bus-features">
                {bus.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Selection Indicator */}
              {selectedBus === bus.id && (
                <motion.div 
                  className="selection-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 0.6, 0],
            x: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
};

export default Buses;