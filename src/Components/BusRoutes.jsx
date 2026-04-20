import React, { useState } from 'react';
import '../Stylesheets/BusRoutes.css';

const BusRoutes = () => {
  console.log('BusRoutes component is mounting!');
  
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
      setSelectedBus(bus.id);
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
      <div className="routes-background">
        <div className="floating-route-1">ð</div>
        <div className="floating-route-2">ð</div>
        <div className="floating-route-3">ð</div>
      </div>

      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          <span className="title-gradient">Campus Bus Routes</span>
        </h1>
        <p className="page-subtitle">
          Click on any bus to see detailed route information and timing
        </p>
      </div>

      {/* Interactive Bus Information Summary */}
      <div className="bus-summary-grid">
        {buses.map((bus, index) => (
          <div 
            key={bus.id}
            className={`bus-summary-card ${selectedBus === bus.id ? 'selected' : ''} ${hoveredBus === bus.id ? 'hovered' : ''}`}
            onClick={() => handleBusClick(bus)}
            onMouseEnter={() => handleBusHover(bus.id)}
            onMouseLeave={handleBusLeave}
            style={{ 
              borderTop: `3px solid ${bus.color}`,
              borderLeft: selectedBus === bus.id ? `3px solid ${bus.color}` : 'none',
              cursor: 'pointer',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="summary-header">
              <h3 className="summary-bus-name" style={{ color: bus.color }}>{bus.name}</h3>
              <span className="summary-bus-number">
                {bus.id === 1 ? '1455' : 
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
                 bus.id === 14 ? 'Gill Nehar' : ''}
              </span>
            </div>
            <div className="summary-info">
              <div className="summary-item">
                <span className="summary-label">Route</span>
                <span className="summary-value">
                  {bus.stops[0].name} to {bus.stops[bus.stops.length - 1].name}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Duration</span>
                <span className="summary-value">
                  {bus.stops[0].time} - {bus.stops[bus.stops.length - 1].time}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Stops</span>
                <span className="summary-value">{bus.stops.length}</span>
              </div>
            </div>
            
            {/* Animated Route Visualization */}
            <div className="route-visualization">
              <div className="route-path">
                <div className="route-point start">
                  <span className="point-icon">📍</span>
                  <span className="point-label">{bus.stops[0].name}</span>
                </div>
                <div className="route-line">
                  <div className="animated-dots">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="dot" style={{ animationDelay: `${i * 0.2}s` }}></span>
                    ))}
                  </div>
                </div>
                <div className="route-point end">
                  <span className="point-icon">🎯</span>
                  <span className="point-label">{bus.stops[bus.stops.length - 1].name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Detailed Route Information */}
      {selectedBus && (
        <div className="route-details-overlay">
          <div className="route-details enhanced" style={{ animationDelay: '0.2s' }}>
              {/* Interactive Route Header */}
              <div className="route-header enhanced">
                <div className="route-title-section">
                  <div className="bus-identity">
                    <div className="bus-icon-large" style={{ backgroundColor: buses.find(b => b.id === selectedBus)?.color }}>
                      <span>🚌</span>
                    </div>
                    <div className="bus-info-text">
                      <h2 style={{ color: buses.find(b => b.id === selectedBus)?.color }}>
                        {buses.find(b => b.id === selectedBus)?.name}
                      </h2>
                      <div className="route-subtitle">
                        Interactive Route Details
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  className="close-btn enhanced"
                  onClick={() => setSelectedBus(null)}
                >
                  <span className="close-icon">×</span>
                </button>
              </div>

              {/* Enhanced Bus Details Summary */}
              <div className="bus-details-summary enhanced">
                <div className="info-cards-grid">
                  <div className="info-card primary">
                    <div className="info-card-header">
                      <span className="info-icon">🚌</span>
                      <span className="info-title">Bus Details</span>
                    </div>
                    <div className="info-card-content">
                      <div className="info-row">
                        <span className="info-label">Number:</span>
                        <span className="info-value">{buses.find(b => b.id === selectedBus)?.name}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Status:</span>
                        <span className="info-value">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-card secondary">
                    <div className="info-card-header">
                      <span className="info-icon">🛣️</span>
                      <span className="info-title">Route Info</span>
                    </div>
                    <div className="info-card-content">
                      <div className="info-row">
                        <span className="info-label">From:</span>
                        <span className="info-value">{buses.find(b => b.id === selectedBus)?.stops[0].name}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">To:</span>
                        <span className="info-value">{buses.find(b => b.id === selectedBus)?.stops[buses.find(b => b.id === selectedBus).stops.length - 1].name}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Stops:</span>
                        <span className="info-value">{buses.find(b => b.id === selectedBus)?.stops.length}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-card accent">
                    <div className="info-card-header">
                      <span className="info-icon">⏰</span>
                      <span className="info-title">Schedule</span>
                    </div>
                    <div className="info-card-content">
                      <div className="info-row">
                        <span className="info-label">Start:</span>
                        <span className="info-value">{buses.find(b => b.id === selectedBus)?.stops[0].time}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">End:</span>
                        <span className="info-value">{buses.find(b => b.id === selectedBus)?.stops[buses.find(b => b.id === selectedBus).stops.length - 1].time}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Duration:</span>
                        <span className="info-value">
                          {(() => {
                            const start = buses.find(b => b.id === selectedBus)?.stops[0].time;
                            const end = buses.find(b => b.id === selectedBus)?.stops[buses.find(b => b.id === selectedBus).stops.length - 1].time;
                            if (start && end) {
                              const [startHour, startMin] = start.split(':').map(t => parseInt(t));
                              const [endHour, endMin] = end.split(':').map(t => parseInt(t));
                              const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
                              const hours = Math.floor(duration / 60);
                              const mins = duration % 60;
                              return `${hours}h ${mins}m`;
                            }
                            return 'N/A';
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creative Journey Visualization */}
              <div className="journey-visualization">
                <h3 className="journey-title">Journey Experience</h3>
                <div className="journey-path">
                  <div className="journey-start">
                    <div className="location-marker start">
                      <span className="location-icon">🏁</span>
                      <div className="location-info">
                        <span className="location-name">{buses.find(b => b.id === selectedBus)?.stops[0].name}</span>
                        <span className="location-time">{buses.find(b => b.id === selectedBus)?.stops[0].time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="journey-progress">
                    <div className="progress-line">
                      <div className="progress-animation">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="progress-node" style={{ animationDelay: `${i * 0.3}s` }}>
                            <div className="node-inner"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="journey-end">
                    <div className="location-marker end">
                      <span className="location-icon">🎓</span>
                      <div className="location-info">
                        <span className="location-name">{buses.find(b => b.id === selectedBus)?.stops[buses.find(b => b.id === selectedBus).stops.length - 1].name}</span>
                        <span className="location-time">{buses.find(b => b.id === selectedBus)?.stops[buses.find(b => b.id === selectedBus).stops.length - 1].time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Journey Stats */}
                <div className="journey-stats">
                  <div className="stat-card">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-content">
                      <span className="stat-value">35m</span>
                      <span className="stat-label">Total Duration</span>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">🛑</div>
                    <div className="stat-content">
                      <span className="stat-value">{buses.find(b => b.id === selectedBus)?.stops.length}</span>
                      <span className="stat-label">Total Stops</span>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">📍</div>
                    <div className="stat-content">
                      <span className="stat-value">
                        {buses.find(b => b.id === selectedBus)?.stops[Math.floor(buses.find(b => b.id === selectedBus).stops.length / 2)]?.name || 'Midpoint'}
                      </span>
                      <span className="stat-label">Midpoint</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="route-actions">
                <button 
                  className="action-btn close-only"
                  onClick={() => setSelectedBus(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default BusRoutes;
