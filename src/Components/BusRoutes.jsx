import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../Stylesheets/BusRoutes.css';

const BusRoutes = () => {
  const [selectedBus, setSelectedBus] = useState(null);

  const buses = [
    {
      id: 1,
      name: "Express Route 101",
      driver: "Michael Johnson",
      color: "#4FC3F7",
      stops: [
        { name: "North Campus", time: "8:00 AM", type: "start" },
        { name: "Engineering Building", time: "8:05 AM", type: "stop" },
        { name: "Library Plaza", time: "8:12 AM", type: "stop" },
        { name: "Student Center", time: "8:18 AM", type: "stop" },
        { name: "Sports Complex", time: "8:25 AM", type: "stop" },
        { name: "Downtown Station", time: "8:35 AM", type: "end" }
      ]
    },
    {
      id: 2,
      name: "Campus Loop 202",
      driver: "Sarah Williams",
      color: "#1F8FA3",
      stops: [
        { name: "Engineering", time: "9:00 AM", type: "start" },
        { name: "Science Building", time: "9:08 AM", type: "stop" },
        { name: "Arts Building", time: "9:16 AM", type: "stop" },
        { name: "Main Campus", time: "9:24 AM", type: "stop" },
        { name: "Engineering", time: "9:32 AM", type: "end" }
      ]
    },
    {
      id: 3,
      name: "Night Shuttle 303",
      driver: "David Chen",
      color: "#ff6b35",
      stops: [
        { name: "Dorm A", time: "10:00 PM", type: "start" },
        { name: "Dorm B", time: "10:05 PM", type: "stop" },
        { name: "Library", time: "10:12 PM", type: "stop" },
        { name: "Main Campus", time: "10:20 PM", type: "stop" },
        { name: "North Gate", time: "10:28 PM", type: "end" }
      ]
    },
    {
      id: 4,
      name: "Express 404",
      driver: "Emily Rodriguez",
      color: "#87CEEB",
      stops: [
        { name: "Sports Complex", time: "7:30 AM", type: "start" },
        { name: "Gym", time: "7:35 AM", type: "stop" },
        { name: "Parking Area", time: "7:42 AM", type: "stop" },
        { name: "Stadium Entrance", time: "7:50 AM", type: "end" }
      ]
    },
    {
      id: 5,
      name: "Campus Express 505",
      driver: "James Wilson",
      color: "#4FC3F7",
      stops: [
        { name: "Main Gate", time: "8:00 AM", type: "start" },
        { name: "Administration", time: "8:05 AM", type: "stop" },
        { name: "Computer Science", time: "8:10 AM", type: "stop" },
        { name: "Business School", time: "8:15 AM", type: "stop" },
        { name: "Medical Center", time: "8:20 AM", type: "stop" },
        { name: "Library", time: "8:25 AM", type: "stop" },
        { name: "Administration", time: "8:30 AM", type: "end" }
      ]
    },
    {
      id: 6,
      name: "Weekend Special 606",
      driver: "Lisa Anderson",
      color: "#134e4a",
      stops: [
        { name: "Campus Center", time: "2:00 PM", type: "start" },
        { name: "Shopping District", time: "2:15 PM", type: "stop" },
        { name: "Mall Entrance", time: "2:30 PM", type: "stop" },
        { name: "Restaurant Row", time: "2:45 PM", type: "stop" },
        { name: "Entertainment Complex", time: "3:00 PM", type: "end" }
      ]
    }
  ];

  const handleBusClick = (bus) => {
    setSelectedBus(bus.id === selectedBus ? null : bus.id);
  };

  const getStopIcon = (type) => {
    switch (type) {
      case 'start': return '??';
      case 'stop': return '??';
      case 'end': return '??';
      default: return '??';
    }
  };

  return (
    <div className="bus-routes-page">
      {/* Header */}
      <div className="page-header">
        <h1>Bus Routes</h1>
        <p>Click on any bus to see its route details</p>
      </div>

      {/* Bus Cards Grid */}
      <div className="buses-grid">
        {buses.map((bus, index) => (
          <motion.div
            key={bus.id}
            className={`bus-card ${selectedBus === bus.id ? 'selected' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => handleBusClick(bus)}
            style={{ borderTop: `3px solid ${bus.color}` }}
          >
            <div className="bus-header">
              <h3 style={{ color: bus.color }}>{bus.name}</h3>
              <span className="driver-info">Driver: {bus.driver}</span>
            </div>
            
            <div className="bus-info">
              <span className="stops-count">{bus.stops.length} Stops</span>
              <span className="route-time">
                {bus.stops[0].time} - {bus.stops[bus.stops.length - 1].time}
              </span>
            </div>

            <div className="click-hint">
              Click to view route
            </div>
          </motion.div>
        ))}
      </div>

      {/* Route Details */}
      <AnimatePresence>
        {selectedBus && (
          <motion.div
            className="route-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="route-header">
              <h2 style={{ color: buses.find(b => b.id === selectedBus)?.color }}>
                {buses.find(b => b.id === selectedBus)?.name}
              </h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedBus(null)}
              >
                ×
              </button>
            </div>

            <div className="route-stops">
              {buses.find(b => b.id === selectedBus)?.stops.map((stop, index) => (
                <div key={index} className="stop-item">
                  <div className="stop-icon">
                    {getStopIcon(stop.type)}
                  </div>
                  <div className="stop-info">
                    <span className="stop-name">{stop.name}</span>
                    <span className="stop-time">{stop.time}</span>
                  </div>
                  {index < buses.find(b => b.id === selectedBus).stops.length - 1 && (
                    <div className="stop-connector" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusRoutes;
