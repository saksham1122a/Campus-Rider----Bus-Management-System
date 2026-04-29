import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import '../Stylesheets/Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        emergencyContact: user.emergencyContact || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      await updateUser(formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        emergencyContact: user.emergencyContact || ''
      });
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Please login to view your profile</h2>
          <button onClick={() => navigate('/login')} className="login-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="back-btn"
        >
          ← Back to Dashboard
        </button>
        <h1>My Profile</h1>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        <div className="profile-form-section">
          {!isEditing ? (
            <div className="profile-info-display">
              <div className="info-group">
                <label>Full Name</label>
                <p>{formData.name || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Email Address</label>
                <p>{formData.email || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Phone Number</label>
                <p>{formData.phone || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Address</label>
                <p>{formData.address || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Emergency Contact</label>
                <p>{formData.emergencyContact || 'Not provided'}</p>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="edit-profile-btn"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Name and phone number"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
