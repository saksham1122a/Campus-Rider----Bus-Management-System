import React, { useState, useEffect } from 'react';
import '../Stylesheets/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['Campus Rider HQ', '123 University Avenue', 'Tech Campus, Building A'],
      action: 'Get Directions'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['Main: +1 (555) 123-4567', 'Support: +1 (555) 987-6543', 'Emergency: +1 (555) 000-1111'],
      action: 'Call Now'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['info@campusrider.com', 'support@campusrider.com', 'emergency@campusrider.com'],
      action: 'Send Email'
    },
    {
      icon: '⏰',
      title: 'Office Hours',
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Saturday: 9:00 AM - 6:00 PM', 'Sunday: 10:00 AM - 4:00 PM'],
      action: 'Book Appointment'
    }
  ];

  const faqs = [
    {
      question: 'How do I track my campus bus?',
      answer: 'Simply open the Campus Rider app, select your route, and you\'ll see real-time bus locations with estimated arrival times.'
    },
    {
      question: 'What if I miss my bus?',
      answer: 'Our app shows next bus arrival times and suggests alternative routes. You can also enable notifications for alerts.'
    },
    {
      question: 'Is Campus Rider available on all campuses?',
      answer: 'We\'re rapidly expanding! Check our app or contact us to see if your campus is covered.'
    },
    {
      question: 'How do I report an issue or suggestion?',
      answer: 'Use the contact form below or email support@campusrider.com. We typically respond within 24 hours.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes! Campus Rider is available on both iOS and Android platforms with full functionality.'
    },
    {
      question: 'How do I get emergency assistance?',
      answer: 'Call our emergency hotline at +1 (555) 000-1111 or use the emergency button in our app for immediate assistance.'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className={`contact-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-gradient">Get in Touch</span>
          </h1>
          <p className="hero-subtitle">
            We're here to help! Reach out to us for any questions, support, or feedback
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-grid">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="contact-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="contact-icon">{info.icon}</div>
                <h3 className="contact-title">{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="contact-detail">{detail}</p>
                  ))}
                </div>
                <button className="contact-action">{info.action}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="section-title">Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="type">Inquiry Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="form-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  {isSubmitted ? '✓ Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="faq-question">
                      <h4>{faq.question}</h4>
                      <span className="faq-toggle">{expandedFaq === index ? '−' : '+'}</span>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Find Us on Campus</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-icon">🗺️</div>
              <p>Interactive Campus Map</p>
              <p className="map-subtitle">Click to view full map with directions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="emergency-section">
        <div className="container">
          <div className="emergency-content">
            <div className="emergency-icon">🚨</div>
            <h2 className="emergency-title">Emergency Support</h2>
            <p className="emergency-description">
              For urgent matters requiring immediate assistance, please call our emergency hotline
            </p>
            <div className="emergency-number">+1 (555) 000-1111</div>
            <p className="emergency-availability">Available 24/7</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;