import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { useBusData } from '../contexts/BusDataContext';
import './MyBus.css';

const MyBus = () => {
  const { user: authUser } = useAuth();
  const { getUserBusInfo, loading, error } = useBusData();
  const [busData, setBusData] = useState(null);

  useEffect(() => {
    if (!authUser || !authUser.busNumber) {
      console.log('User data not available yet');
      return;
    }

    const userBusInfo = getUserBusInfo(authUser.busNumber);
    
    if (userBusInfo) {
      setBusData({
        busNumber: userBusInfo.bus?.busNumber || authUser.busNumber,
        busName: userBusInfo.bus?.name || `Campus Rider`,
        driver: userBusInfo.bus?.driver || 'Rajesh Kumar',
        capacity: userBusInfo.bus?.capacity || 50,
        passengers: userBusInfo.passengers?.length || 32,
        currentLocation: userBusInfo.bus?.currentLocation || 'Kohade Bus Stand',
        nextStop: userBusInfo.bus?.nextStop || 'Main Gate',
        route: userBusInfo.bus?.route || 'Kohade → College',
        status: userBusInfo.bus?.status || 'On Time',
        busType: userBusInfo.bus?.busType || 'AC',
        registrationNumber: userBusInfo.bus?.registrationNumber || 'PB10-1455'
      });
    }
  }, [authUser, getUserBusInfo]);

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

  if (loading) return <div className="loading-container"><h2>Loading bus information...</h2></div>;
  if (error) return <div className="error-container"><h2>Error loading bus data</h2></div>;
  if (!busData) return <div className="no-data-container"><h2>No bus data available</h2></div>;

  return (
    <div className="my-bus-container">
      {/* Page Title */}
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
              <h2 className="bus-name">{busData.busName}</h2>
              <div className="bus-number">Bus No: {busData.busNumber}</div>
              <div className="bus-route">{busData.route}</div>
              <div className="bus-status-indicator">
                <span className="status-icon">{getStatusIcon(busData.status)}</span>
                <span className="status-text" style={{ color: getStatusColor(busData.status) }}>
                  {busData.status}
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