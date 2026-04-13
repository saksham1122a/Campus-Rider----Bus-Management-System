import React from 'react';
import '../Stylesheets/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="logo-icon">??</span>
              <span className="logo-text">Campus Rider</span>
            </div>
            <p className="brand-description">
              Your smart campus transport solution. Real-time tracking, reliable schedules, and comfortable rides.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/buses">Buses</a></li>
              <li><a href="/routes">Routes</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a href="/tracking">Real-time Tracking</a></li>
              <li><a href="/schedule">Schedule</a></li>
              <li><a href="/fares">Fares</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li><a href="mailto:info@campusrider.com">info@campusrider.com</a></li>
              <li><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
              <li><a href="/contact">Campus Office</a></li>
              <li><a href="/emergency">Emergency</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Campus Rider. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;