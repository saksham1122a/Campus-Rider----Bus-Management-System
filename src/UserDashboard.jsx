import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { useBusData } from '../contexts/BusDataContext';
import MyBus from './MyBus';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const { getUserBusInfo, getBusPassengers } = useBusData();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userBusInfo, setUserBusInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Debug: Check if user is authenticated
  console.log('UserDashboard render - authUser:', authUser, 'isAuthenticated:', !!authUser);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    console.log('Profile avatar clicked in UserDashboard');
    setShowProfileMenu(!showProfileMenu);
  };

  const handleProfileUpdate = () => {
    navigate('/profile');
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!authUser?.name) return 'U';
    const names = authUser.name.split(' ');
    if (names.length >= 2) {
      return names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  useEffect(() => {
    if (!authUser || !authUser.busNumber) {
      setUserBusInfo(null);
      setLoading(false);
    } else {
      const busInfo = getUserBusInfo(authUser.busNumber);
      setUserBusInfo(busInfo);
      setLoading(false);
    }
  }, [authUser, getUserBusInfo]);

  
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="simple-loading">
          <div className="loading-icon">🚌</div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="dashboard-container">
        <div className="simple-error">
          <h3>Authentication Required</h3>
          <p>Please log in to continue</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🚌</span>
            <span className="logo-text">Campus Rider</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '×' : '☰'}
          </button>
        </div>

        <div className="sidebar-user" ref={profileMenuRef}>
          <div 
            className="profile-avatar" 
            onClick={handleProfileClick}
            title="Profile"
          >
            <span className="avatar-text">{getUserInitials()}</span>
          </div>
          <div className="user-info">
            <h4>{authUser?.name}</h4>
            <p>{authUser?.email}</p>
          </div>
          
          {showProfileMenu && (
            <div className="profile-menu">
              <div className="profile-info">
                <div className="profile-name">{authUser?.name || 'User'}</div>
                <div className="profile-email">{authUser?.email || 'user@example.com'}</div>
              </div>
              <div className="profile-divider"></div>
              <button className="profile-menu-item" onClick={handleProfileUpdate}>
                <svg viewBox="0 0 24 24" className="menu-icon">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Update Profile
              </button>
              <button className="profile-menu-item logout-item" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" className="menu-icon">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className={activeSection === 'overview' ? 'active' : ''}>
              <Link to="/dashboard">
                <span>📊</span>
                <span>Overview</span>
              </Link>
            </li>
            <li className={activeSection === 'mybus' ? 'active' : ''}>
              <Link to="/mybus">
                <span>🚌</span>
                <span>My Bus</span>
              </Link>
            </li>
            <li className={activeSection === 'profile' ? 'active' : ''}>
              <Link to="/profile">
                <span>👤</span>
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          {/* Footer content can be added here if needed */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Right Profile Avatar */}
        <div 
          className="dashboard-profile-section"
          style={{
            position: 'fixed',
            top: '80px',
            right: '40px',
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '10px',
            borderRadius: '10px',
            border: '2px solid red'
          }}
        >
          <div style={{ color: 'white', fontSize: '12px', marginBottom: '5px' }}>
            DEBUG: authUser = {authUser ? 'EXISTS' : 'NULL'}
          </div>
          {authUser ? (
            <div 
              className="profile-avatar" 
              onClick={handleProfileClick} 
              title="Profile"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4FC3F7, #1F8FA3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '3px solid white',
                boxShadow: '0 4px 20px rgba(79, 195, 247, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              <span 
                className="avatar-text" 
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {getUserInitials()}
              </span>
            </div>
          ) : (
            <div style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>
              NO USER LOGGED IN
            </div>
          )}
          
          {showProfileMenu && authUser && (
            <div 
              className="profile-menu"
              style={{
                position: 'absolute',
                top: '70px',
                right: '0',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                minWidth: '250px',
                zIndex: 1000
              }}
            >
              <div className="profile-info" style={{ padding: '20px', background: 'rgba(79, 195, 247, 0.1)' }}>
                <div className="profile-name" style={{ fontSize: '16px', fontWeight: '600', color: '#0A3A4A', marginBottom: '4px' }}>
                  {authUser?.name || 'User'}
                </div>
                <div className="profile-email" style={{ fontSize: '14px', color: 'rgba(10, 58, 74, 0.7)' }}>
                  {authUser?.email || 'user@example.com'}
                </div>
              </div>
              <div className="profile-divider" style={{ height: '1px', background: 'rgba(79, 195, 247, 0.2)', margin: '0 10px' }}></div>
              <button className="profile-menu-item" onClick={handleProfileUpdate} style={{ width: '100%', padding: '15px 20px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '500', color: '#0A3A4A', transition: 'all 0.3s ease', textAlign: 'left' }}>
                <svg viewBox="0 0 24 24" className="menu-icon" style={{ width: '18px', height: '18px', stroke: 'currentColor', fill: 'none', strokeWidth: '2', flexShrink: 0 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Update Profile
              </button>
              <button className="profile-menu-item logout-item" onClick={handleLogout} style={{ width: '100%', padding: '15px 20px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '500', color: '#0A3A4A', transition: 'all 0.3s ease', textAlign: 'left' }}>
                <svg viewBox="0 0 24 24" className="menu-icon" style={{ width: '18px', height: '18px', stroke: 'currentColor', fill: 'none', strokeWidth: '2', flexShrink: 0 }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
        {activeSection === 'overview' && (
          <div className="simple-section">
            <h2>Dashboard Overview</h2>
            <div className="simple-stats">
              <div className="simple-stat">
                <span className="simple-stat-number">{authUser?.busNumber || 'N/A'}</span>
                <span className="simple-stat-label">Bus Number</span>
              </div>
              <div className="simple-stat">
                <span className="simple-stat-number">{userBusInfo?.passengers?.length || 0}</span>
                <span className="simple-stat-label">Passengers</span>
              </div>
              <div className="simple-stat">
                <span className="simple-stat-number">{userBusInfo?.bus?.status || 'Active'}</span>
                <span className="simple-stat-label">Status</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'mybus' && <MyBus />}

        {activeSection === 'profile' && (
          <div className="simple-section">
            <h2>My Profile</h2>
            <div className="profile-simple">
              <div className="profile-avatar">{authUser?.name?.charAt(0)?.toUpperCase()}</div>
              <h4>{authUser?.name}</h4>
              <p>{authUser?.email}</p>
              <button>Edit Profile</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
