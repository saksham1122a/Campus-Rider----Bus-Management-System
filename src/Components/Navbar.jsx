import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { useState, useRef, useEffect } from 'react';
import '../Stylesheets/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

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
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="website-name">Campus Rider</Link>
        </div>

        <div className="nav-center">
          <Link to="/" className="nav-item active">
            <svg viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            <span>Home</span>
          </Link>

          <Link to="/buses" className="nav-item">
            <svg viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
              <path d="M7 12h10M12 7v10"/>
            </svg>
            <span>Buses</span>
          </Link>

          <Link to="/busroutes" className="nav-item">
            <svg viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Routes</span>
          </Link>

          <Link to="/about" className="nav-item">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>About</span>
          </Link>

          <Link to="/contact" className="nav-item contact-us">
            <svg viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>Contact Us</span>
          </Link>
        </div>

        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="profile-section" ref={profileMenuRef}>
              <div 
                className="profile-avatar" 
                onClick={handleProfileClick}
                title="Profile"
              >
                <span className="avatar-text">{getUserInitials()}</span>
              </div>
              
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="profile-info">
                    <div className="profile-name">{user?.name || 'User'}</div>
                    <div className="profile-email">{user?.email || 'user@example.com'}</div>
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
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn">Login</Link>
              <Link to="/signup" className="nav-btn signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;