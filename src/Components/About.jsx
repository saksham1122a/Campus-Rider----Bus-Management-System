import React, { useEffect, useState } from 'react';
import '../Stylesheets/About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`about-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-content">
            {/* Left Side - Text Content */}
            <div className="about-text">
              <h1 className="about-title">
                <span className="title-gradient">About Campus Rider</span>
              </h1>
              <p className="about-description">
                Your smart campus transport solution. We provide real-time tracking, reliable schedules, and comfortable rides for students and faculty.
              </p>
              <p className="about-description">
                Founded in 2026, Campus Rider has transformed how students navigate their campus environment with innovative technology and user-centric design.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-icon">🚌</span>
                  <span>Real-time bus tracking</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⏰</span>
                  <span>Smart scheduling system</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📞</span>
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>

            {/* Right Side - Profile Image */}
            <div className="about-image">
              <div className="image-container">
                <img 
                  src="/src/assets/profile.jpeg" 
                  alt="Campus Rider Developer" 
                  className="profile-image"
                />
                <div className="image-overlay"></div>
                <div className="developer-text">
                  <h3 className="meet-developer">Meet the Developer</h3>
                  <p className="developer-subtitle">Creating innovative campus solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;