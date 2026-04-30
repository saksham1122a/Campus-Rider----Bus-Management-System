import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { useBusData } from '../contexts/BusDataContext';
import './MyBus.css';

const MyBus = () => {
  const { user: authUser } = useAuth();
  const { busData, loading, error, getUserBusInfo } = useBusData();
  const [userBusData, setUserBusData] = useState(null);

  useEffect(() => {
    console.log('MyBus: authUser:', authUser);
    console.log('MyBus: busData from context:', busData);
    
    if (!authUser) {
      console.log('User data not available yet');
      return;
    }

    // Get user's assigned bus (for demo, assign bus 1 if user has busNumber, otherwise bus 2)
    const userBusNumber = authUser.busNumber || 1;
    const assignedBus = busData.find(bus => bus.id === userBusNumber) || busData[0];
    
    console.log('MyBus: assignedBus:', assignedBus);
    
    if (assignedBus) {
      setUserBusData({
        busNumber: assignedBus.id,
        busName: assignedBus.name,
        driver: assignedBus.driver,
        capacity: assignedBus.capacity,
        passengers: assignedBus.currentPassengers,
        currentLocation: assignedBus.nextStop || 'Campus Route',
        nextStop: assignedBus.nextStop,
        route: `${assignedBus.route} → ${assignedBus.destination}`,
        status: assignedBus.status === 'active' ? 'On Time' : 'Delayed',
        busType: assignedBus.features?.includes('AC') ? 'AC' : 'Non-AC',
        registrationNumber: assignedBus.name?.match(/\(([^)]+)\)/)?.[1] || 'PB10-1455',
        arrivalTime: assignedBus.arrivalTime,
        features: assignedBus.features || []
      });
    }
  }, [authUser, busData]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'on time': return '#22c55e';
      case 'delayed': return '#ef4444';
      case 'arrived': return '#facc15';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'on time': return '🟢';
      case 'delayed': return '🔴';
      case 'arrived': return '🟡';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="my-bus-page">
        <div className="loading-state">
          <div className="loading-spinner">🚌</div>
          <p>Loading bus information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-bus-page">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>Error loading bus information: {error}</p>
        </div>
      </div>
    );
  }

  if (!userBusData) {
    return (
      <div className="my-bus-page">
        <div className="error-state">
          <div className="error-icon">🚌</div>
          <p>No bus data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bus-page">
      <div className="page-header">
        <h1 className="page-title">My Bus</h1>
        <p className="page-subtitle">Bus Details</p>
      </div>

      {/* Bus Overview Card */}
      <div className="bus-overview-card">
        <div className="bus-overview-content">
          <div className="bus-main-info">
            <div className="bus-icon-large">
              🚌
            </div>
            <div className="bus-details">
              <h2 className="bus-name">{userBusData.busName}</h2>
              <div className="bus-number">Bus No: {userBusData.busNumber}</div>
              <div className="bus-route">{userBusData.route}</div>
              <div className="bus-status-indicator">
                <span className="status-icon">{getStatusIcon(userBusData.status)}</span>
                <span className="status-text" style={{ color: getStatusColor(userBusData.status) }}>
                  {userBusData.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bus Details Grid */}
      <div className="bus-details-grid">
        <div className="detail-card">
          <h3>Driver</h3>
          <p>{busData.driver}</p>
        </div>
        
        <div className="detail-card">
          <h3>Capacity</h3>
          <p>{busData.passengers}/{busData.capacity}</p>
        </div>
        
        <div className="detail-card">
          <h3>Current Location</h3>
          <p>{busData.currentLocation}</p>
        </div>
        
        <div className="detail-card">
          <h3>Next Stop</h3>
          <p>{busData.nextStop}</p>
        </div>
        
        <div className="detail-card">
          <h3>Bus Type</h3>
          <p>{busData.busType}</p>
        </div>
        
        <div className="detail-card">
          <h3>Registration</h3>
          <p>{busData.registrationNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default MyBus;