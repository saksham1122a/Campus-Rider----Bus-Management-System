import React from 'react';
import '../Stylesheets/SuccessPopup.css';

const SuccessPopup = ({ message, onClose, isVisible }) => {
  return (
    <div className={`success-popup-overlay ${isVisible ? 'visible' : ''}`}>
      <div className={`success-popup ${isVisible ? 'show' : ''}`}>
        <div className="success-icon">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
        </div>
        <h3 className="success-title">Success!</h3>
        <p className="success-message">{message}</p>
        <button className="success-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
