import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/Buses.css';

const Buses = () => {
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const buses = [
    {
      id: 1,
      name: "Express Route 101",
      route: "North Campus → Downtown",
      driver: "Michael Johnson",
      status: "active",
      capacity: 45,
      currentPassengers: 32,
      nextStop: "Library Plaza",
      arrivalTime: "5 min",
      features: ["WiFi", "AC", "USB Charging"],
      color: "#4FC3F7"
    },
    {
      id: 2,
      name: "Campus Loop 202",
      route: "Engineering → Science → Arts",
      driver: "Sarah Williams",
      status: "active",
      capacity: 35,
      currentPassengers: 28,
      nextStop: "Student Center",
      arrivalTime: "2 min",
      features: ["WiFi", "Wheelchair Access"],
      color: "#1F8FA3"
    },
    {
      id: 3,
      name: "Night Shuttle 303",
      route: "Dorms → Main Campus",
      driver: "David Chen",
      status: "delayed",
      capacity: 40,
      currentPassengers: 15,
      nextStop: "North Gate",
      arrivalTime: "8 min",
      features: ["WiFi", "AC", "Security"],
      color: "#ff6b35"
    },
    {
      id: 4,
      name: "Express 404",
      route: "Sports Complex → Parking",
      driver: "Emily Rodriguez",
      status: "active",
      capacity: 50,
      currentPassengers: 38,
      nextStop: "Stadium Entrance",
      arrivalTime: "3 min",
      features: ["WiFi", "AC", "Live Tracking"],
      color: "#87CEEB"
    },
    {
      id: 5,
      name: "Campus Express 505",
      route: "Main Gate → All Departments",
      driver: "James Wilson",
      status: "active",
      capacity: 42,
      currentPassengers: 35,
      nextStop: "Administration Building",
      arrivalTime: "1 min",
      features: ["WiFi", "AC", "Priority Seating"],
      color: "#4FC3F7"
    },
    {
      id: 6,
      name: "Weekend Special 606",
      route: "Campus Tour → Shopping District",
      driver: "Lisa Anderson",
      status: "inactive",
      capacity: 38,
      currentPassengers: 0,
      nextStop: "Not Scheduled",
      arrivalTime: "--",
      features: ["WiFi", "AC", "Tour Guide"],
      color: "#134e4a"
    }
  ];

  const handleBusClick = (bus) => {
    setSelectedBus(bus.id);
    setTimeout(() => {
      navigate(`/bus/${bus.id}`);
    }, 300);
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
      case 'active': return '🟢';
      case 'delayed': return '🟡';
      case 'inactive': return '🔴';
      default: return '⚪';
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
                scale: 1.02,
                y: -5,
                boxShadow: "0 20px 40px rgba(79, 195, 247, 0.3)"
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              onClick={() => handleBusClick(bus)}
              style={{
                borderTop: `3px solid ${bus.color}`,
                borderLeft: selectedBus === bus.id ? `3px solid ${bus.color}` : 'none'
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
                <p>{bus.route}</p>
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