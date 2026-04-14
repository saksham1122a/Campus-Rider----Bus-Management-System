import React, { useEffect, useState } from 'react';
import '../Stylesheets/About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      id: 1,
      icon: '🚌',
      title: 'Real-Time Tracking',
      description: 'Track your campus bus in real-time with our advanced GPS technology. Never wait in the dark again!'
    },
    {
      id: 2,
      icon: '⏰',
      title: 'Smart Scheduling',
      description: 'Get accurate arrival times and notifications. Plan your journey with confidence.'
    },
    {
      id: 3,
      icon: '🎯',
      title: 'Route Optimization',
      description: 'Intelligent route planning ensures the fastest and most efficient campus transportation.'
    },
    {
      id: 4,
      icon: '📱',
      title: 'Mobile First',
      description: 'Seamless experience across all devices. Access Campus Rider from anywhere, anytime.'
    },
    {
      id: 5,
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security ensures your data is always protected and service is always available.'
    },
    {
      id: 6,
      icon: '🌟',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you with any queries or issues.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '100+', label: 'Campus Routes' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.8★', label: 'User Rating' }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      image: '👨‍💼',
      description: 'Visionary leader with 10+ years in transport tech'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      image: '👩‍💻',
      description: 'Tech expert specializing in real-time systems'
    },
    {
      name: 'Mike Williams',
      role: 'Head of Operations',
      image: '👨‍✈️',
      description: 'Ensuring smooth operations across all campuses'
    },
    {
      name: 'Emily Davis',
      role: 'Customer Success Lead',
      image: '👩‍🏫',
      description: 'Dedicated to exceptional user experience'
    }
  ];

  return (
    <div className={`about-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-gradient">About Campus Rider</span>
          </h1>
          <p className="hero-subtitle">
            Revolutionizing campus transportation with smart technology and user-centric design
          </p>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-description">
                At Campus Rider, we're on a mission to transform campus transportation through innovation and technology. 
                We believe that every student and faculty member deserves a seamless, reliable, and efficient way to navigate 
                their campus environment.
              </p>
              <p className="mission-description">
                Founded in 2020, we've grown from a simple idea to serving over 50,000 students across multiple campuses, 
                continuously improving our services based on user feedback and emerging technologies.
              </p>
            </div>
            <div className="mission-visual">
              <div className="floating-card">
                <div className="card-icon">🎯</div>
                <h3>Our Vision</h3>
                <p>To become the global leader in smart campus transportation solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Campus Rider?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div 
                key={index}
                className="team-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="team-avatar">{member.image}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Campus Journey?</h2>
            <p className="cta-subtitle">Join thousands of students who have already made the switch</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Get Started</button>
              <button className="cta-btn secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;