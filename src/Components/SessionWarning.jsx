import React from 'react';
import { useAuth } from '../App';
import '../Stylesheets/SessionWarning.css';

const SessionWarning = () => {
  const { sessionWarning } = useAuth();

  if (!sessionWarning) return null;

  return (
    <div className="session-warning">
      <div className="warning-content">
        <div className="warning-icon">⏰</div>
        <div className="warning-text">
          <h4>Session Expiring Soon</h4>
          <p>Your session will expire soon. Continue using the app to stay logged in.</p>
        </div>
        <div className="warning-close" onClick={() => window.location.reload()}>
          ×
        </div>
      </div>
    </div>
  );
};

export default SessionWarning;
