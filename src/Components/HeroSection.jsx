import '../Stylesheets/HeroSection.css';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const HeroSection = () => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / 5;
    const y = (centerY - e.clientY) / 5;
    
    rotateX.set(y);
    rotateY.set(x);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="hero-wrapper">
      {/* HERO SECTION */}
      <section className="hero">
        {/* LEFT CONTENT */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Smart Bus <span>Management System</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Track buses in real-time, manage routes efficiently, and never miss your ride again.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.button
              className="primary-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>

            <motion.button
              className="secondary-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Routes
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE ANIMATED BUS */}
        <motion.div
          className="hero-bus"
          initial={{ opacity: 0, x: 100, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1.5 }}
          transition={{ duration: 1, delay: 0.4 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.img
            src="/src/assets/bus.png"
            alt="Campus Bus"
            className="hero-bus-image"
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            style={{
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
              transformStyle: 'preserve-3d',
              cursor: 'grab'
            }}
          />
        </motion.div>
      </section>

    </div>
  );
};

export default HeroSection;