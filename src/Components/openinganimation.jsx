import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "../Stylesheets/openinganimation.css";

export default function OpeningAnimation({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete && onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="opening-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* SIMPLE LOADING ANIMATION */}
          <div className="loading-container">
            <motion.div
              className="loading-circle"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1, 0.8, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="circle-inner" />
            </motion.div>
          </div>

          {/* SIMPLE TEXT - NO REPEATING */}
          <motion.div
            className="text-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="main-title">CAMPUS RIDER</h1>
            <p className="subtitle">Loading...</p>
          </motion.div>

          {/* SIMPLE LOADING BAR */}
          <motion.div
            className="progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          />

          {/* SIMPLE PARTICLES */}
          <div className="particle-container">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{
                  opacity: 0,
                  y: Math.random() * 100
                }}
                animate={{
                  y: [null, -120],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3
                }}
                style={{
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}