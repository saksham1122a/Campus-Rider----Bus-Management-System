import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';
import { useBusData } from '../contexts/BusDataContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, handleLogout } = useAuth();
  const { 
    getUserBusInfo, 
    getBusPassengers, 
    getBusLocation, 
    statistics,
    loading: busDataLoading,
    error: busDataError,
    refreshData 
  } = useBusData();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userBusInfo, setUserBusInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Enhanced mock data for better dashboard experience
  const recentActivities = [
    { id: 1, action: 'Boarded bus', time: '8:15 AM', location: 'Main Gate', status: 'completed' },
    { id: 2, action: 'Library stop', time: '8:30 AM', location: 'Library', status: 'completed' },
    { id: 3, action: 'Science Block', time: '9:00 AM', location: 'Science Block', status: 'upcoming' },
    { id: 4, action: 'Engineering Block', time: '9:30 AM', location: 'Engineering Block', status: 'upcoming' }
  ];

  const busSchedule = [
    { stop: 'Main Gate', time: '8:00 AM', distance: '0 km', duration: 'Start' },
    { stop: 'Library', time: '8:15 AM', distance: '2.1 km', duration: '15 min' },
    { stop: 'Science Block', time: '8:30 AM', distance: '3.8 km', duration: '30 min' },
    { stop: 'Engineering Block', time: '8:45 AM', distance: '5.2 km', duration: '45 min' },
    { stop: 'Cafeteria', time: '9:00 AM', distance: '6.7 km', duration: '1 hr' },
    { stop: 'Sports Complex', time: '9:15 AM', distance: '8.1 km', duration: '1 hr 15 min' },
    { stop: 'Hostel A', time: '9:30 AM', distance: '9.5 km', duration: '1 hr 30 min' },
    { stop: 'Hostel B', time: '9:45 AM', distance: '11.2 km', duration: '1 hr 45 min' }
  ];

  const notifications = [
    { id: 1, type: 'info', message: 'Bus arriving in 5 minutes', time: '2 min ago' },
    { id: 2, type: 'success', message: 'Payment successful for this month', time: '1 hour ago' },
    { id: 3, type: 'warning', message: 'Schedule change tomorrow', time: '3 hours ago' }
  ];

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: 'dashboard', path: '/dashboard' },
    { id: 'mybus', label: 'My Bus', icon: 'bus', path: '/mybus' },
    { id: 'profile', label: 'My Profile', icon: 'person', path: '/profile' },
    { id: 'schedule', label: 'Schedule', icon: 'schedule', path: '/dashboard/schedule' },
    { id: 'passengers', label: 'Passengers', icon: 'people', path: '/dashboard/passengers' },
    { id: 'settings', label: 'Settings', icon: 'settings', path: '/dashboard/settings' }
  ];

  useEffect(() => {
    const loadUserBusData = () => {
      if (!authUser || !authUser.busNumber) {
        console.log('User data not available yet, skipping bus data fetch');
        setLoading(false);
        return;
      }
      
      try {
        // Get user's bus information from real-time data service
        const busInfo = getUserBusInfo(authUser.busNumber);
        setUserBusInfo(busInfo);
        
        // Also try to get API data as fallback
        const token = localStorage.getItem("token");
        if (token) {
          axios.get(
            `http://localhost:5000/api/auth/bus/${authUser.busNumber}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          ).then(apiRes => {
            // Merge API data with real-time data
            if (apiRes.data && apiRes.data.length > 0) {
              setUserBusInfo(prev => ({
                ...prev,
                passengers: apiRes.data
              }));
            }
          }).catch(err => {
            console.log('API fetch failed, using real-time data only:', err.message);
          });
        }
        
      } catch (err) {
        console.error('Error loading user bus data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserBusData();
  }, [authUser, getUserBusInfo]);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (authUser && authUser.busNumber) {
        refreshData();
        const busInfo = getUserBusInfo(authUser.busNumber);
        setUserBusInfo(busInfo);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [authUser, refreshData, getUserBusInfo]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-screen">
          <div className="loader"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="dashboard-container">
        <div className="error-screen">
          <h3>Unable to load dashboard</h3>
          <p>Please try logging in again</p>
          <button onClick={() => navigate("/login")} className="btn-primary">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ paddingTop: '6rem' }}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">{'\ud83d\ude8c'}</span>
            <span className="logo-text">Campus Rider</span>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span>{sidebarOpen ? '×' : '|||'}</span>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="sidebar-user">
          <div className="user-avatar">
            <span>{authUser?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
          </div>
          <div className="user-info">
            <h3>{authUser?.name || 'User'}</h3>
            <p>{authUser?.email || 'user@example.com'}</p>
            <span className="user-badge">Student</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="nav-icon">
                    {item.icon === 'dashboard' && 'Dashboard'}
                    {item.icon === 'bus' && 'Directions_bus'}
                    {item.icon === 'person' && 'Person'}
                    {item.icon === 'schedule' && 'Schedule'}
                    {item.icon === 'people' && 'Groups'}
                    {item.icon === 'settings' && 'Settings'}
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {item.id === 'mybus' && (
                    <span className="nav-badge">{userBusInfo?.passengers?.length || 0}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">Logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header */}
        <header className="content-header">
          <div className="header-left">
            <h1 className="page-title">
              {sidebarItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h1>
            <p className="page-subtitle">
              {activeSection === 'overview' && 'Here\'s What\'s Happening With Your Bus Today'}
              {activeSection === 'mybus' && `Manage Your Bus ${authUser?.busNumber || 'N/A'}`}
              {activeSection === 'profile' && 'Manage Your Personal Information'}
              {activeSection === 'schedule' && 'View Your Bus Schedule And Timings'}
              {activeSection === 'passengers' && `See Who\'s On Your Bus Today`}
              {activeSection === 'settings' && 'Customize Your Dashboard Preferences'}
            </p>
          </div>
          
          <div className="header-right">
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-value">{authUser?.busNumber || 'N/A'}</span>
                <span className="stat-label">Bus</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{userBusInfo?.passengers?.length || 0}</span>
                <span className="stat-label">Passengers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">8:00 AM</span>
                <span className="stat-label">Next Pickup</span>
              </div>
            </div>
            
            <button className="notification-btn">
              <span className="notification-icon">{'\ud83d\udd14'}</span>
              <span className="notification-badge">3</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Based on Active Section */}
        <div className="content-body">
          {activeSection === 'overview' && (
            <div className="overview-content">
              {/* Quick Stats */}
              <div className="quick-stats-grid">
                <div className="quick-stat-card">
                  <div className="stat-icon blue">
                    <span>{'\ud83d\ude8c'}</span>
                  </div>
                  <div className="stat-content">
                    <h3>{authUser?.busNumber || 'N/A'}</h3>
                    <p>Your Bus Number</p>
                  </div>
                </div>
                
                <div className="quick-stat-card">
                  <div className="stat-icon cyan">
                    <span>{'\ud83d\udc65'}</span>
                  </div>
                  <div className="stat-content">
                    <h3>{userBusInfo?.passengers?.length || 0}</h3>
                    <p>Total Passengers</p>
                  </div>
                </div>
                
                <div className="quick-stat-card">
                  <div className="stat-icon teal">
                    <span>{'\u23f0'}</span>
                  </div>
                  <div className="stat-content">
                    <h3>8:00 AM</h3>
                    <p>Next Pickup</p>
                  </div>
                </div>
                
                <div className="quick-stat-card">
                  <div className="stat-icon indigo">
                    <span>{'\ud83d\udcc5'}</span>
                  </div>
                  <div className="stat-content">
                    <h3>{new Date().toLocaleDateString()}</h3>
                    <p>Today's Date</p>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="content-grid">
                {/* Recent Activity */}
                <div className="content-card">
                  <div className="card-header">
                    <h3>Recent Activity</h3>
                    <button className="view-all-btn">View All</button>
                  </div>
                  <div className="activity-list">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-dot"></div>
                        <div className="activity-content">
                          <h4>{activity.action}</h4>
                          <p>{activity.location} - {activity.time}</p>
                        </div>
                        <span className={`activity-status ${activity.status}`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="content-card">
                  <div className="card-header">
                    <h3>Today's Schedule</h3>
                    <button className="view-all-btn">Full Schedule</button>
                  </div>
                  <div className="schedule-list">
                    {busSchedule.slice(0, 4).map((stop, index) => (
                      <div key={index} className="schedule-item">
                        <div className="schedule-time">{stop.time}</div>
                        <div className="schedule-details">
                          <h4>{stop.stop}</h4>
                          <p>{stop.distance}</p>
                        </div>
                        <div className="schedule-status">
                          {index === 0 && <span className="status-dot current"></span>}
                          <span className="status-text">
                            {index < 2 ? 'Completed' : index === 2 ? 'Next' : 'Upcoming'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'mybus' && (
            <div className="mybus-content">
              <div className="bus-info-card">
                <h2>{userBusInfo?.bus?.name || `Bus ${authUser?.busNumber || 'N/A'}`}</h2>
                <div className="bus-details">
                  <div className="detail-item">
                    <span className="detail-label">Driver:</span>
                    <span className="detail-value">{userBusInfo?.bus?.driver || 'Not Assigned'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Route:</span>
                    <span className="detail-value">{userBusInfo?.bus?.route || 'Unknown Route'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Capacity:</span>
                    <span className="detail-value">{userBusInfo?.bus?.capacity || 40} seats</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Current Occupancy:</span>
                    <span className="detail-value">{userBusInfo?.passengers?.length || 0}/{userBusInfo?.bus?.capacity || 40}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Next Stop:</span>
                    <span className="detail-value">{userBusInfo?.bus?.nextStop || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value" style={{ color: userBusInfo?.bus?.status === 'active' ? '#4caf50' : '#f59e0b' }}>
                      {userBusInfo?.bus?.status || 'Unknown'}
                    </span>
                  </div>
                </div>
                <div className="occupancy-bar">
                  <div 
                    className="occupancy-fill" 
                    style={{ 
                      width: `${((userBusInfo?.passengers?.length || 0) / (userBusInfo?.bus?.capacity || 40)) * 100}%`,
                      backgroundColor: userBusInfo?.bus?.color || '#0077b6'
                    }}
                  ></div>
                  <span>{Math.round(((userBusInfo?.passengers?.length || 0) / (userBusInfo?.bus?.capacity || 40)) * 100)}%</span>
                </div>
              </div>

              <div className="passengers-card">
                <h3>Passengers on Your Bus</h3>
                <div className="passengers-grid">
                  {userBusInfo?.passengers?.slice(0, 6).map((user, index) => (
                    <div key={index} className="passenger-card">
                      <div className="passenger-avatar">
                        <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                      </div>
                      <div className="passenger-info">
                        <h4>{user?.name || 'Unknown'}</h4>
                        <p>{user?.email || 'No email'}</p>
                        <span className="boarded-time">{user?.boardedTime || 'Unknown time'}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {(userBusInfo?.passengers?.length || 0) > 6 && (
                  <div className="view-more-info">
                    <p>and {(userBusInfo?.passengers?.length || 0) - 6} more passengers</p>
                  </div>
                )}
              </div>

              {/* Real-time Location Information */}
              {userBusInfo?.location && (
                <div className="location-card">
                  <h3>Real-time Location</h3>
                  <div className="location-info">
                    <div className="location-item">
                      <span className="location-label">Current Stop:</span>
                      <span className="location-value">{userBusInfo.location.currentStop?.name || 'Unknown'}</span>
                    </div>
                    <div className="location-item">
                      <span className="location-label">Next Stop:</span>
                      <span className="location-value">{userBusInfo.location.nextStop?.name || 'Unknown'}</span>
                    </div>
                    <div className="location-item">
                      <span className="location-label">Route Progress:</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${userBusInfo.location.progress || 0}%`,
                            backgroundColor: userBusInfo?.bus?.color || '#0077b6'
                          }}
                        ></div>
                        <span>{Math.round(userBusInfo.location.progress || 0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="profile-content">
              <div className="profile-card-large">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <span>{authUser?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  </div>
                  <div className="profile-info">
                    <h2>{authUser?.name || 'User'}</h2>
                    <p>{authUser?.email || 'user@example.com'}</p>
                    <div className="profile-badges">
                      <span className="badge primary">Student</span>
                      <span className="badge secondary">Bus {authUser?.busNumber || 'N/A'}</span>
                    </div>
                  </div>
                  <button className="edit-profile-btn">Edit Profile</button>
                </div>
                
                <div className="profile-stats">
                  <div className="stat-box">
                    <h4>85%</h4>
                    <p>Attendance</p>
                  </div>
                  <div className="stat-box">
                    <h4>12</h4>
                    <p>This Month</p>
                  </div>
                  <div className="stat-box">
                    <h4>A+</h4>
                    <p>Grade</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'schedule' && (
            <div className="schedule-content">
              <div className="schedule-timeline">
                <h3>Complete Schedule</h3>
                {busSchedule.map((stop, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <div className={`timeline-dot ${index < 2 ? 'completed' : index === 2 ? 'current' : 'upcoming'}`}></div>
                      {index < busSchedule.length - 1 && <div className="timeline-line"></div>}
                    </div>
                    <div className="timeline-content">
                      <div className="schedule-time">{stop.time}</div>
                      <h4>{stop.stop}</h4>
                      <p>{stop.distance} - {stop.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'passengers' && (
            <div className="passengers-content">
              <div className="passengers-header">
                <h3>All Passengers on {userBusInfo?.bus?.name || `Bus ${authUser?.busNumber || 'N/A'}`}</h3>
                <span className="total-count">{userBusInfo?.passengers?.length || 0} Total</span>
                <button className="refresh-btn" onClick={refreshData}>
                  <span>Refresh</span>
                </button>
              </div>
              <div className="passengers-list-full">
                {userBusInfo?.passengers?.map((user, index) => (
                  <div key={index} className="passenger-row">
                    <div className="passenger-avatar">
                      <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                    </div>
                    <div className="passenger-details">
                      <h4>{user?.name || 'Unknown'}</h4>
                      <p>{user?.email || 'No email'}</p>
                      <span className="boarded-info">Boarded: {user?.boardedTime || 'Unknown'}</span>
                    </div>
                    <div className="passenger-status">
                      <span className="status-badge active">Active</span>
                    </div>
                  </div>
                ))}
                {(!userBusInfo?.passengers || userBusInfo.passengers.length === 0) && (
                  <div className="no-passengers">
                    <p>No passengers currently on this bus</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="settings-content">
              <div className="settings-card">
                <h3>Dashboard Settings</h3>
                <div className="setting-item">
                  <label>Notifications</label>
                  <div className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Email Updates</label>
                  <div className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Dark Mode</label>
                  <div className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;