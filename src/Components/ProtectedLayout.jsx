import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import './ProtectedLayout.css';

const ProtectedLayout = ({ children }) => {
  const { isAuthenticated, loading, user: authUser, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Handle authentication
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  // Determine active section based on current path
  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') setActiveSection('overview');
    else if (path === '/mybus') setActiveSection('mybus');
    else if (path === '/routes') setActiveSection('routes');
    else if (path === '/schedule') setActiveSection('schedule');
  }, [location.pathname]);

  return (
    <div className="protected-layout-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Logo Section */}
        <div className="sidebar-header">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8C4 6.89543 4.89543 6 6 6H26C27.1046 6 28 6.89543 28 8V24C28 25.1046 27.1046 26 26 26H6C4.89543 26 4 25.1046 4 24V8Z" stroke="url(#bus-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="8" y="10" width="4" height="6" rx="1" fill="url(#bus-gradient)"/>
              <rect x="20" y="10" width="4" height="6" rx="1" fill="url(#bus-gradient)"/>
              <circle cx="10" cy="22" r="2" fill="url(#bus-gradient)"/>
              <circle cx="22" cy="22" r="2" fill="url(#bus-gradient)"/>
              <defs>
                <linearGradient id="bus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1F8FA3"/>
                  <stop offset="100%" stopColor="#4FC3F7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text">Campus Rider</div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item-link">
            <button 
              className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Dashboard</span>
            </button>
          </Link>
          <Link to="/mybus" className="nav-item-link">
            <button 
              className={`nav-item ${activeSection === 'mybus' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="6" y="8" width="3" height="4" rx="0.5" fill="currentColor"/>
                  <rect x="15" y="8" width="3" height="4" rx="0.5" fill="currentColor"/>
                  <circle cx="8" cy="17" r="1.5" fill="currentColor"/>
                  <circle cx="16" cy="17" r="1.5" fill="currentColor"/>
                </svg>
              </span>
              <span>My Bus</span>
            </button>
          </Link>
          <Link to="/routes" className="nav-item-link">
            <button 
              className={`nav-item ${activeSection === 'routes' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6C1 4.89543 1.89543 4 3 4H21C22.1046 4 23 4.89543 23 6V20C23 21.1046 22.1046 22 21 22H3C1.89543 22 1 21.1046 1 20V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="15" r="1" fill="currentColor"/>
                  <circle cx="12" cy="15" r="1" fill="currentColor"/>
                  <circle cx="16" cy="15" r="1" fill="currentColor"/>
                  <path d="M8 10V8C8 7.44772 8.44772 7 9 7H15C15.5523 7 16 7.44772 16 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Route Details</span>
            </button>
          </Link>
          <Link to="/schedule" className="nav-item-link">
            <button 
              className={`nav-item ${activeSection === 'schedule' ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Schedule</span>
            </button>
          </Link>
          <button className="logout-btn" onClick={handleLogoutClick}>
            <span className="logout-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
