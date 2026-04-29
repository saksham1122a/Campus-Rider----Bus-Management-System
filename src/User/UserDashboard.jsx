import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { useBusData } from '../contexts/BusDataContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, handleLogout } = useAuth();
  const { getUserBusInfo } = useBusData();
  const [userBusInfo, setUserBusInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (!authUser || !authUser.busNumber) {
      setUserBusInfo(null);
      setLoading(false);
      return;
    }
    
    const busInfo = getUserBusInfo(authUser.busNumber);
    setUserBusInfo(busInfo);
    setLoading(false);
  }, [authUser, getUserBusInfo]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const hour = now.getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getNextDepartureTime = () => {
    if (!userBusInfo || !userBusInfo.bus) return 'N/A';
    
    const now = new Date();
    const nextDeparture = new Date(now.getTime() + 15 * 60000); // 15 minutes from now
    return nextDeparture.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getBusStatus = () => {
    if (!userBusInfo || !userBusInfo.bus) return 'on-time';
    
    const random = Math.random();
    if (random > 0.8) return 'delayed';
    return 'on-time';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time': return '#22c55e';
      case 'delayed': return '#ef4444';
      case 'upcoming': return '#facc15';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time': return '🟢';
      case 'delayed': return '🔴';
      default: return '⚪';
    }
  };

  const getUpcomingTrips = () => {
    return [
      { time: '08:30 AM', destination: 'College', status: 'on-time' },
      { time: '02:30 PM', destination: 'College', status: 'on-time' },
      { time: '06:30 PM', destination: 'Home', status: 'delayed' },
    ];
  };

  const getNotifications = () => {
    return [
      { type: 'info', message: 'Bus 8 departing in 15 minutes', time: '2 min ago' },
      { type: 'warning', message: 'Route delay expected due to traffic', time: '10 min ago' },
      { type: 'success', message: 'Bus arrived at Kohade', time: '15 min ago' },
    ];
  };

  
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-screen">
          <div className="loading-spinner">🚌</div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="dashboard-container">
        <div className="error-screen">
          <h3>Please Login</h3>
          <p>Authentication required</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    );
  }

  const busStatus = getBusStatus();
  const nextDeparture = getNextDepartureTime();
  const upcomingTrips = getUpcomingTrips();
  const notifications = getNotifications();

  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="welcome-section">
            <h1 className="welcome-message">{greeting}, {authUser.name}!</h1>
            <p className="dashboard-time">{currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}</p>
          </div>
        </header>

        <main className="dashboard-main">
          {/* Glass Cards Grid */}
          <div className="glass-cards-grid">
            
            {/* Welcome Card */}
            <div className="glass-card welcome-card">
              <div className="card-header">
                <h2>Welcome Back!</h2>
                <div className="card-icon">👋</div>
              </div>
              <div className="card-content">
                <p>Your bus information is ready below. Have a great journey!</p>
                <div className="quick-stats">
                  <div className="stat">
                    <span className="stat-value">{userBusInfo?.bus?.name || 'N/A'}</span>
                    <span className="stat-label">Your Bus</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{userBusInfo?.bus?.busNumber || authUser.busNumber}</span>
                    <span className="stat-label">Bus Number</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Departure Card */}
            <div className="glass-card departure-card">
              <div className="card-header">
                <h2>Next Departure</h2>
                <div className="card-icon">⏰</div>
              </div>
              <div className="card-content">
                <div className="departure-time">
                  <span className="time-value">{nextDeparture}</span>
                  <span className="time-label">in 15 minutes</span>
                </div>
                <div className="departure-info">
                  <p>From: {userBusInfo?.bus?.route || 'Your Stop'}</p>
                  <p>To: College Campus</p>
                </div>
              </div>
            </div>

            {/* Bus Status Card */}
            <div className="glass-card status-card">
              <div className="card-header">
                <h2>Bus Status</h2>
                <div className="card-icon">🚌</div>
              </div>
              <div className="card-content">
                <div className="status-indicator">
                  <span className="status-icon">{getStatusIcon(busStatus)}</span>
                  <span className={`status-text status-${busStatus}`}>
                    {busStatus === 'on-time' ? 'On Time' : 'Delayed'}
                  </span>
                </div>
                <div className="status-details">
                  <p>Current Location: {userBusInfo?.bus?.currentLocation || 'En Route'}</p>
                  <p>Next Stop: {userBusInfo?.bus?.nextStop || 'Your Stop'}</p>
                </div>
              </div>
            </div>

            {/* Route Preview Card */}
            <div className="glass-card route-card">
              <div className="card-header">
                <h2>Quick Route</h2>
                <div className="card-icon">🗺️</div>
              </div>
              <div className="card-content">
                <div className="route-preview">
                  <div className="route-point start">
                    <span className="point-icon">📍</span>
                    <span className="point-name">{userBusInfo?.bus?.route || 'Your Stop'}</span>
                  </div>
                  <div className="route-arrow">→</div>
                  <div className="route-point end">
                    <span className="point-icon">🎯</span>
                    <span className="point-name">College Campus</span>
                  </div>
                </div>
                <div className="route-info">
                  <p>Estimated Time: 25 minutes</p>
                  <p>Total Stops: 5</p>
                </div>
              </div>
            </div>

            {/* Upcoming Trips Card */}
            <div className="glass-card trips-card">
              <div className="card-header">
                <h2>Upcoming Trips</h2>
                <div className="card-icon">📅</div>
              </div>
              <div className="card-content">
                <div className="trips-list">
                  {upcomingTrips.map((trip, index) => (
                    <div key={index} className="trip-item">
                      <div className="trip-time">{trip.time}</div>
                      <div className="trip-destination">{trip.destination}</div>
                      <div className="trip-status">
                        <span className={`status-dot ${trip.status}`}></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
