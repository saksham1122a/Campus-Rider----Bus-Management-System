import React, { useState } from 'react';
import '../Stylesheets/Buses.css';

const Buses = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [hoveredBus, setHoveredBus] = useState(null);

  const buses = [
    {
      id: 1,
      name: "Bus 8 (1455)",
      route: "Kohade",
      destination: "PCTE Parking",
      supervisor: "Campus Operations",
      status: "active",
      capacity: 55,
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
      supervisor: "Transport Manager",
      status: "active",
      capacity: 60,
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
      supervisor: "Fleet Manager",
      status: "active",
      capacity: 60,
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
      supervisor: "Operations Head",
      status: "active",
      capacity: 60,
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
      supervisor: "Route Coordinator",
      status: "active",
      capacity: 60,
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
      supervisor: "Transport Supervisor",
      status: "active",
      capacity: 60,
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
      supervisor: "Logistics Manager",
      status: "active",
      capacity: 60,
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
      supervisor: "Operations Lead",
      status: "active",
      capacity: 60,
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
      supervisor: "Fleet Coordinator",
      status: "active",
      capacity: 60,
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
      supervisor: "Transport Team Lead",
      status: "active",
      capacity: 60,
      currentPassengers: 65,
      nextStop: "Jugraon Junction",
      arrivalTime: "08:00 AM",
      features: ["WiFi", "AC", "Live Tracking"],
      color: "#87CEEB"
    },
    {
      id: 11,
      name: "Bus 11 (2350)",
      route: "Gardroo",
      destination: "PCTE Parking",
      supervisor: "Operations Manager",
      status: "active",
      capacity: 60,
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
      supervisor: "Logistics Coordinator",
      status: "active",
      capacity: 70,
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
      supervisor: "Private Operations",
      status: "active",
      capacity: 45,
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
      supervisor: "Private Operations",
      status: "active",
      capacity: 45,
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
    setHoveredBus(busId);
  };

  const handleBusLeave = () => {
    setHoveredBus(null);
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
        <div className="floating-bus-1">&#128663;</div>
        <div className="floating-bus-2">&#128663;</div>
        <div className="floating-bus-3">&#128663;</div>
      </div>

      {/* Header */}
      <div className="buses-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Campus Bus Fleet</h1>
            <p>Real-time tracking and management</p>
          </div>
          <div className="header-right">
            <div className="emergency-contacts">
              <span className="contact-label">Emergency:</span>
              <a href="tel:9914293555" className="phone-number">
                <span className="phone-icon">&#128222;</span>
                9914293555
              </a>
              <a href="tel:9914534742" className="phone-number">
                <span className="phone-icon">&#128222;</span>
                9914534742
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bus Cards Grid */}
      <div className="buses-grid">
        {buses.map((bus, index) => (
          <div
            key={bus.id}
            className={`bus-card ${selectedBus === bus.id ? 'selected' : ''}`}
            onClick={() => handleBusClick(bus)}
            onMouseEnter={() => handleBusHover(bus.id)}
            onMouseLeave={handleBusLeave}
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
              <div className="route-icon">&#128652;</div>
              <div className="route-info">
                <p className="route-start">{bus.route}</p>
                <div className="route-arrow">&rarr;</div>
                <p className="route-destination">{bus.destination}</p>
              </div>
            </div>

            {/* Bus Service Information */}
            <div className="bus-service">
              <div className="service-info">
                <span className="service-title">Campus Transport Service</span>
                <span className="service-status">Active Route</span>
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
              <div className="stop-icon">&#128205;</div>
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
          </div>
        ))}
      </div>

      {/* Detailed Bus Information Overlay */}
      {selectedBus && (
        <div className="bus-details-overlay">
          <div className="bus-details">
            {/* Bus Details Header */}
            <div className="details-header">
              <div className="details-title-section">
                <h2 style={{ color: buses.find(b => b.id === selectedBus)?.color }}>
                  {buses.find(b => b.id === selectedBus)?.name}
                </h2>
                <div className="details-subtitle">
                  Complete Bus Information
                </div>
              </div>
              <button 
                className="close-btn"
                onClick={() => setSelectedBus(null)}
              >
                &times;
              </button>
            </div>

            {/* Bus Information Summary */}
            <div className="bus-summary">
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Bus Name</span>
                  <span className="summary-value">{buses.find(b => b.id === selectedBus)?.name}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Route</span>
                  <span className="summary-value">
                    {buses.find(b => b.id === selectedBus)?.route} to {buses.find(b => b.id === selectedBus)?.destination}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Supervisor</span>
                  <span className="summary-value">{buses.find(b => b.id === selectedBus)?.supervisor}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Status</span>
                  <span className="summary-value">{buses.find(b => b.id === selectedBus)?.status}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Capacity</span>
                  <span className="summary-value">
                    {buses.find(b => b.id === selectedBus)?.currentPassengers} / {buses.find(b => b.id === selectedBus)?.capacity}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Next Stop</span>
                  <span className="summary-value">{buses.find(b => b.id === selectedBus)?.nextStop}</span>
                </div>
              </div>
            </div>

            {/* Bus Features */}
            <div className="features-section">
              <h3 className="features-title">Bus Features</h3>
              <div className="features-grid">
                {buses.find(b => b.id === selectedBus)?.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="feature-icon">&#9733;</span>
                    <span className="feature-name">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="details-actions">
              <button 
                className="action-btn primary"
                onClick={() => console.log('Track bus:', buses.find(b => b.id === selectedBus)?.name)}
              >
                Track Bus
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => console.log('View schedule:', buses.find(b => b.id === selectedBus)?.name)}
              >
                View Schedule
              </button>
              <button 
                className="action-btn secondary"
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

export default Buses;