import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "../Stylesheets/openinganimation.css";

export default function OpeningAnimation({ onComplete }) {
  const [show, setShow] = useState(true);
  const [flickerPhase, setFlickerPhase] = useState(0);
  const [showZoom, setShowZoom] = useState(true);
  const [startFlickering, setStartFlickering] = useState(false);

  useEffect(() => {
    // Show zoom effect first
    const zoomTimer = setTimeout(() => {
      setShowZoom(false);
      setStartFlickering(true);
    }, 1500);

    // Start flickering after zoom
    const flickerTimer = setInterval(() => {
      if (startFlickering) {
        setFlickerPhase(prev => prev + 1);
      }
    }, 60);

    // Complete animation
    const timer = setTimeout(() => {
      setShow(false);
      onComplete && onComplete();
    }, 3500);

    return () => {
      clearTimeout(zoomTimer);
      clearInterval(flickerTimer);
      clearTimeout(timer);
    };
  }, [onComplete, startFlickering]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="opening-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ZOOM IN EFFECT - REFERENCE IMAGE STYLE */}
          <AnimatePresence>
            {showZoom && (
              <div className="zoom-container">
                <motion.div
                  className="zoom-light"
                  initial={{ 
                    scale: 0.1,
                    opacity: 0
                  }}
                  animate={{
                    scale: [0.1, 0.5, 1, 1.2, 1.5],
                    opacity: [0, 0.3, 0.8, 1, 1]
                  }}
                  exit={{ 
                    scale: 2,
                    opacity: 0
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut"
                  }}
                >
                  <div className="zoom-core" />
                  <div className="zoom-rays">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i}
                        className="zoom-ray"
                        style={{
                          transform: `rotate(${i * 30}deg)`
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* LIGHT FLICKERING EFFECTS */}
          {startFlickering && (
            <div className="light-flickers">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="light-beam"
                  initial={{ 
                    opacity: 0,
                    scaleY: 0,
                    rotate: Math.random() * 360
                  }}
                  animate={{
                    opacity: [0, 1, 0.3, 1, 0],
                    scaleY: [0, 1, 0.5, 1, 0],
                    rotate: [null, Math.random() * 360],
                    height: [0, 200, 150, 250, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 1.5,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transformOrigin: "center"
                  }}
                />
              ))}
            </div>
          )}

          {/* CENTRAL LIGHT SOURCE */}
          <motion.div
            className="central-light"
            initial={{ 
              scale: 0,
              opacity: 0,
              rotate: 0
            }}
            animate={{
              scale: [0, 1.5, 1, 1.2, 1],
              opacity: [0, 1, 0.8, 1, 0.9],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="light-core"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(79, 195, 247, 0.8)",
                  "0 0 40px rgba(79, 195, 247, 1)",
                  "0 0 60px rgba(135, 206, 235, 0.9)",
                  "0 0 80px rgba(79, 195, 247, 1)",
                  "0 0 100px rgba(135, 206, 235, 0.8)"
                ]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* RADIATING LIGHT RAYS */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="light-ray"
                style={{
                  transform: `rotate(${i * 45}deg)`
                }}
                initial={{ 
                  scaleY: 0,
                  opacity: 0
                }}
                animate={{
                  scaleY: [0, 1.5, 0.8, 1.2, 0.5],
                  opacity: [0, 1, 0.6, 0.8, 0.3]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </motion.div>

          {/* IMAGE APPEARS WITH LIGHT */}
          <motion.div
            className="image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: flickerPhase > 10 ? 1 : 0,
              scale: flickerPhase > 10 ? 1 : 0.8
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="/src/assets/image.png"
              alt="Campus"
              className="campus-image"
              animate={{
                filter: [
                  "brightness(1) contrast(1)",
                  "brightness(1.2) contrast(1.1)",
                  "brightness(1.4) contrast(1.2)",
                  "brightness(1.2) contrast(1.1)",
                  "brightness(1) contrast(1)"
                ]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>

          {/* PARTICLE LIGHTS */}
          <div className="particle-lights">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="light-particle"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{
                  opacity: [0, 1, 0.5, 1, 0],
                  scale: [0, 1, 0.5, 1, 0],
                  x: [null, Math.random() * 200 - 100],
                  y: [null, -Math.random() * 200 - 50]
                }}
                transition={{
                  duration: 1.5 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transformOrigin: "center"
                }}
              />
            ))}
          </div>

          {/* FLASH EFFECT */}
          <motion.div
            className="flash-overlay"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0.8, 0, 0.3, 0]
            }}
            transition={{
              duration: 3.5,
              times: [0, 0.7, 0.8, 0.85, 0.9, 1]
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}