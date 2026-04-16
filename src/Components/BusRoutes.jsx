import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/BusRoutes.css';

const BusRoutes = () => {
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState(null);
  const [hoveredBus, setHoveredBus] = useState(null);

  const buses = [
    {
      id: 1,
      name: "Bus 8",
      driver: "Rajesh Kumar",
      color: "#4FC3F7",
      stops: [
        { name: "Kohade", time: "07:30 AM", type: "start" },
        { name: "Kohade Main Stop", time: "07:32 AM", type: "stop" },
        { name: "Kohade Junction", time: "07:35 AM", type: "stop" },
        { name: "College Gate", time: "08:25 AM", type: "stop" },
        { name: "College", time: "08:30 AM", type: "end" }
      ]
    },
    {
      id: 2,
      name: "Bus 7",
      driver: "Amit Sharma",
      color: "#1F8FA3",
      stops: [
        { name: "Veer Palace", time: "07:50 AM", type: "start" },
        { name: "Veer Palace Junction", time: "07:53 AM", type: "stop" },
        { name: "Main Road", time: "07:56 AM", type: "stop" },
        { name: "College Entrance", time: "08:28 AM", type: "stop" },
        { name: "College", time: "08:30 AM", type: "end" }
      ]
    },
    {
      id: 3,
      name: "Bus 6",
      driver: "Vikram Singh",
      color: "#ff6b35",
      stops: [
        { name: "Police Colony", time: "07:55 AM", type: "start" },
        { name: "Police Colony Gate", time: "07:58 AM", type: "stop" },
        { name: "Police Station", time: "08:00 AM", type: "stop" },
        { name: "College Road", time: "08:20 AM", type: "stop" },
        { name: "College", time: "08:25 AM", type: "end" }
      ]
    },
    {
      id: 4,
      name: "Bus 16",
      driver: "Anil Verma",
      color: "#87CEEB",
      stops: [
        { name: "Samrala Chowk", time: "08:04 AM", type: "start" },
        { name: "Samrala Main", time: "08:07 AM", type: "stop" },
        { name: "Samrala Market", time: "08:10 AM", type: "stop" },
        { name: "College Avenue", time: "08:25 AM", type: "stop" },
        { name: "College", time: "08:35 AM", type: "end" }
      ]
    },
    {
      id: 5,
      name: "Bus 9",
      driver: "Mohan Das",
      color: "#4FC3F7",
      stops: [
        { name: "Sherpur", time: "07:55 AM", type: "start" },
        { name: "Sherpur Main", time: "07:58 AM", type: "stop" },
        { name: "Sherpur Center", time: "08:01 AM", type: "stop" },
        { name: "College Road", time: "08:24 AM", type: "stop" },
        { name: "College", time: "08:26 AM", type: "end" }
      ]
    },
    {
      id: 6,
      name: "Bus 13",
      driver: "Ramesh Patel",
      color: "#134e4a",
      stops: [
        { name: "Vasti", time: "07:55 AM", type: "start" },
        { name: "Vasti Center", time: "07:58 AM", type: "stop" },
        { name: "Vasti Market", time: "08:01 AM", type: "stop" },
        { name: "College Gate", time: "08:24 AM", type: "stop" },
        { name: "College", time: "08:26 AM", type: "end" }
      ]
    },
    {
      id: 7,
      name: "Bus 12",
      driver: "Suresh Kumar",
      color: "#4FC3F7",
      stops: [
        { name: "Kalash Nagar", time: "08:00 AM", type: "start" },
        { name: "Kalash Nagar Main", time: "08:03 AM", type: "stop" },
        { name: "Kalash Nagar Center", time: "08:06 AM", type: "stop" },
        { name: "College Entrance", time: "08:09 AM", type: "stop" },
        { name: "College", time: "08:11 AM", type: "end" }
      ]
    },
    {
      id: 8,
      name: "Bus 10",
      driver: "Prakash Singh",
      color: "#1F8FA3",
      stops: [
        { name: "Kapoor", time: "07:55 AM", type: "start" },
        { name: "Kapoor Junction", time: "07:58 AM", type: "stop" },
        { name: "Kapoor Main", time: "08:01 AM", type: "stop" },
        { name: "College Road", time: "08:24 AM", type: "stop" },
        { name: "College", time: "08:26 AM", type: "end" }
      ]
    },
    {
      id: 9,
      name: "Bus 18",
      driver: "Deepak Kumar",
      color: "#ff6b35",
      stops: [
        { name: "Dugri", time: "08:05 AM", type: "start" },
        { name: "Dugri Main", time: "08:08 AM", type: "stop" },
        { name: "Dugri Center", time: "08:11 AM", type: "stop" },
        { name: "College Avenue", time: "08:24 AM", type: "stop" },
        { name: "College", time: "08:26 AM", type: "end" }
      ]
    },
    {
      id: 10,
      name: "Bus 15 & 14",
      driver: "Ravi Kumar & Arun Singh",
      color: "#87CEEB",
      stops: [
        { name: "Jugraon", time: "08:00 AM", type: "start" },
        { name: "Jugraon Junction", time: "08:03 AM", type: "stop" },
        { name: "Jugraon Main", time: "08:06 AM", type: "stop" },
        { name: "College Road", time: "08:24 AM", type: "stop" },
        { name: "College", time: "08:26 AM", type: "end" }
      ]
    },
    {
      id: 11,
      name: "Bus 11",
      driver: "Manoj Kumar",
      color: "#4FC3F7",
      stops: [
        { name: "Gardroo", time: "08:05 AM", type: "start" },
        { name: "Gardroo Main", time: "08:08 AM", type: "stop" },
        { name: "Gardroo Center", time: "08:11 AM", type: "stop" },
        { name: "College Gate", time: "08:24 AM", type: "stop" },
        { name: "College", time: "08:26 AM", type: "end" }
      ]
    },
    {
      id: 12,
      name: "Bus 17",
      driver: "Sanjay Kumar",
      color: "#134e4a",
      stops: [
        { name: "Tajpur Road", time: "07:40 AM", type: "start" },
        { name: "Tajpur Junction", time: "07:43 AM", type: "stop" },
        { name: "Raikot", time: "07:46 AM", type: "stop" },
        { name: "Raikot Main", time: "07:49 AM", type: "stop" },
        { name: "College", time: "08:22 AM", type: "end" }
      ]
    },
    {
      id: 13,
      name: "Private Bus - Habowal",
      driver: "Private Operator",
      color: "#ff6b35",
      stops: [
        { name: "Habowal", time: "08:15 AM", type: "start" },
        { name: "Habowal Center", time: "08:18 AM", type: "stop" },
        { name: "Habowal Main", time: "08:21 AM", type: "stop" },
        { name: "College Gate", time: "08:24 AM", type: "stop" },
        { name: "College", time: "08:26 AM", type: "end" }
      ]
    },
    {
      id: 14,
      name: "Private Bus - Gill Nehar",
      driver: "Private Operator",
      color: "#87CEEB",
      stops: [
        { name: "Gill Nehar", time: "08:10 AM", type: "start" },
        { name: "Gill Nehar Main", time: "08:13 AM", type: "stop" },
        { name: "Gill Nehar Center", time: "08:16 AM", type: "stop" },
        { name: "College Road", time: "08:24 AM", type: "stop" },
        { name: "College", time: "08:26 AM", type: "end" }
      ]
    }
  ];

  const handleBusClick = (bus) => {
    try {
      console.log('Bus clicked:', bus.name, 'ID:', bus.id, 'Driver:', bus.driver);
      navigate(`/bus/${bus.id}`, { state: { bus } });
    } catch (error) {
      console.error('Error handling bus click:', error);
    }
  };

  const handleBusHover = (busId) => {
    setHoveredBus(busId);
  };

  const handleBusLeave = () => {
    setHoveredBus(null);
  };

  const getStopIcon = (type) => {
    switch (type) {
      case 'start': return '📍';
      case 'stop': return '🛑';
      case 'end': return '🎯';
      default: return '📍';
    }
  };

  const getStopTypeLabel = (type) => {
    switch (type) {
      case 'start': return 'Start';
      case 'stop': return 'Stop';
      case 'end': return 'Destination';
      default: return 'Stop';
    }
  };

  return (
    <div className="bus-routes-page">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-route-1">🚌</div>
        <div className="floating-route-2">🛣️</div>
        <div className="floating-route-3">📍</div>
      </div>

      {/* Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="page-title">
          <span className="title-gradient">Campus Bus Routes</span>
        </h1>
        <p className="page-subtitle">
          Click on any bus to see detailed route information and timing
        </p>
      </motion.div>

      {/* Bus Cards Grid */}
      <div className="buses-grid">
        {buses.map((bus, index) => (
          <motion.div
            key={bus.id}
            className={`bus-card ${selectedBus === bus.id ? 'selected' : ''} ${hoveredBus === bus.id ? 'hovered' : ''}`}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              y: 30
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0
            }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              boxShadow: "0 20px 40px rgba(79, 195, 247, 0.3)",
              cursor: "pointer"
            }}
            whileTap={{ 
              scale: 0.98,
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
              <h3 className="bus-name" style={{ color: bus.color }}>{bus.name}</h3>
            </div>
            
            {/* Bus Information */}
            <div className="bus-info">
              <div className="info-row">
                <div className="info-item">
                  <span className="info-label">Route</span>
                  <span className="info-value">
                    {bus.stops[0].name} to {bus.stops[bus.stops.length - 1].name}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration</span>
                  <span className="info-value">
                    {bus.stops[0].time} - {bus.stops[bus.stops.length - 1].time}
                  </span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <span className="info-label">Bus Number</span>
                  <span className="info-value">{bus.id === 1 ? '1455' : 
                    bus.id === 2 ? '9755' :
                    bus.id === 3 ? '1855' :
                    bus.id === 4 ? '1155' :
                    bus.id === 5 ? '9055' :
                    bus.id === 6 ? '7889' :
                    bus.id === 7 ? '1555' :
                    bus.id === 8 ? '0489' :
                    bus.id === 9 ? '18' :
                    bus.id === 10 ? '5679, 3445' :
                    bus.id === 11 ? '2350' :
                    bus.id === 12 ? '8112' :
                    bus.id === 13 ? 'Habowal' :
                    bus.id === 14 ? 'Gill Nehar' : ''}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Stops</span>
                  <span className="info-value">{bus.stops.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Route Preview */}
            <div className="route-preview">
              <div className="preview-line"></div>
              <div className="preview-stops">
                <div className="preview-stop start">
                  <span className="preview-icon">🚏</span>
                  <span>{bus.stops[0].name}</span>
                </div>
                <div className="preview-dots">
                  {bus.stops.slice(1, -1).map((stop, idx) => (
                    <span key={idx} className="preview-dot"></span>
                  ))}
                </div>
                <div className="preview-stop end">
                  <span className="preview-icon">🎓</span>
                  <span>{bus.stops[bus.stops.length - 1].name}</span>
                </div>
              </div>
            </div>

            
            {/* Hover Preview */}
            {hoveredBus === bus.id && (
              <motion.div 
                className="hover-preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="preview-content">
                  <h4>Quick Preview</h4>
                  <div className="preview-details">
                    <p><strong>Driver:</strong> {bus.driver}</p>
                    <p><strong>Route:</strong> {bus.stops[0].name} to {bus.stops[bus.stops.length - 1].name}</p>
                    <p><strong>Time:</strong> {bus.stops[0].time} - {bus.stops[bus.stops.length - 1].time}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Detailed Route Information */}
      <AnimatePresence>
        {selectedBus && (
          <motion.div
            className="route-details-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="route-details"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Route Header */}
              <div className="route-header">
                <div className="route-title-section">
                  <h2 style={{ color: buses.find(b => b.id === selectedBus)?.color }}>
                    {buses.find(b => b.id === selectedBus)?.name}
                  </h2>
                  <div className="route-subtitle">
                    Complete Route Information
                  </div>
                </div>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedBus(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </button>
              </div>

              {/* Bus Details Summary */}
              <div className="bus-details-summary">
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Bus Number</span>
                    <span className="summary-value">{buses.find(b => b.id === selectedBus)?.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Driver</span>
                    <span className="summary-value">{buses.find(b => b.id === selectedBus)?.driver}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Route</span>
                    <span className="summary-value">
                      {buses.find(b => b.id === selectedBus)?.stops[0].name} to {buses.find(b => b.id === selectedBus)?.stops[buses.find(b => b.id === selectedBus).stops.length - 1].name}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Duration</span>
                    <span className="summary-value">
                      {buses.find(b => b.id === selectedBus)?.stops[0].time} - {buses.find(b => b.id === selectedBus)?.stops[buses.find(b => b.id === selectedBus).stops.length - 1].time}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Stops</span>
                    <span className="summary-value">{buses.find(b => b.id === selectedBus)?.stops.length}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Route Stops */}
              <div className="route-stops">
                <h3 className="stops-title">Route Stops</h3>
                <div className="stops-timeline">
                  {buses.find(b => b.id === selectedBus)?.stops.map((stop, index) => (
                    <motion.div
                      key={index}
                      className="stop-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <div className="stop-marker">
                        <div className="stop-icon">
                          {getStopIcon(stop.type)}
                        </div>
                        <div className="stop-type">{getStopTypeLabel(stop.type)}</div>
                      </div>
                      <div className="stop-content">
                        <div className="stop-name">{stop.name}</div>
                        <div className="stop-time">{stop.time}</div>
                      </div>
                      {index < buses.find(b => b.id === selectedBus).stops.length - 1 && (
                        <div className="stop-connector" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="route-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => console.log('Book seat for:', buses.find(b => b.id === selectedBus)?.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Seat
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => console.log('Track bus:', buses.find(b => b => b.id === selectedBus)?.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Track Bus
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => setSelectedBus(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusRoutes;
