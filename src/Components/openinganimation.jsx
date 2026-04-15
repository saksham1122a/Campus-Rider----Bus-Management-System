import { useEffect, useState } from "react";
import "../Stylesheets/openinganimation.css";

export default function OpeningAnimation({ onComplete }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
      setTimeout(() => {
        onComplete(); // move to main website
      }, 1000);
    }, 3500); // total animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`intro-container ${hide ? "fade-out" : ""}`}>
      
      {/* Headlights Wrapper */}
      <div className="lights-wrapper">
        
        {/* Left Headlight Assembly */}
        <div className="headlight-assembly left">
          <div className="headlight-outer">
            <div className="headlight-inner">
              <div className="light-core"></div>
              <div className="light-reflection"></div>
            </div>
            <div className="light-beam"></div>
          </div>
          <div className="headlight-glow"></div>
        </div>

        {/* Right Headlight Assembly */}
        <div className="headlight-assembly right">
          <div className="headlight-outer">
            <div className="headlight-inner">
              <div className="light-core"></div>
              <div className="light-reflection"></div>
            </div>
            <div className="light-beam"></div>
          </div>
          <div className="headlight-glow"></div>
        </div>

        {/* Ambient Background Glow */}
        <div className="ambient-glow"></div>
        
        {/* Light Particles */}
        <div className="light-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}></div>
          ))}
        </div>

      </div>
    </div>
  );
}