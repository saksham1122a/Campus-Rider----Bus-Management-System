import { Link } from 'react-router-dom';
import '../Stylesheets/Navbar.css';

const Navbar = () => {

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
          <Link to="/login" className="nav-btn login-btn">Login</Link>
          <Link to="/signup" className="nav-btn signup-btn">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;