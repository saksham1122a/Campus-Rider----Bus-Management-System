import React, { useEffect } from 'react';
import '../Stylesheets/LoadingScreen.css';

const LoadingScreen = () => {
  useEffect(() => {
    // Add class to html and body to prevent conflicts
    document.documentElement.classList.add('loading-active');
    document.body.classList.add('loading-active');
    
    return () => {
      // Clean up classes when component unmounts
      document.documentElement.classList.remove('loading-active');
      document.body.classList.remove('loading-active');
    };
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <h2>Campus Rider</h2>
      <p>Checking your session...</p>
    </div>
  );
};

export default LoadingScreen;
