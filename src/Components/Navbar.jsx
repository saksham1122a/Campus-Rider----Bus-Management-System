import '../Stylesheets/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="website-name">Campus Rider</span>
        </div>

        <div className="nav-center">
          <div className="nav-item active">
            <svg viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            <span>Home</span>
          </div>

          <div className="nav-item">
            <svg viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
              <path d="M7 12h10M12 7v10"/>
            </svg>
            <span>Buses</span>
          </div>

          <div className="nav-item">
            <svg viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Routes</span>
          </div>

          <div className="nav-item">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>Schedule</span>
          </div>

          <div className="nav-item">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
            <span>Track</span>
          </div>

          
        </div>

        <div className="nav-actions">
          <button className="nav-btn login-btn">Login</button>
          <button className="nav-btn signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;