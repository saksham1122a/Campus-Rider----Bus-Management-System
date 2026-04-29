import React from 'react';
import '../Stylesheets/HeroSection.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import image from '../assets/image.png';

const HeroSection = () => {
  const navigate = useNavigate();

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
              onClick={(e) => {
                e.preventDefault();
                console.log('Get Started button clicked');
                navigate('/buses');
              }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              Get Started
            </motion.button>

            <motion.button
              className="secondary-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                console.log('View Routes button clicked');
                navigate('/busroutes');
              }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              View Routes
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE ANIMATED IMAGE */}
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <motion.img
            src={image}
            alt="Smart Bus Management"
            className="hero-main-image"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
          />
          
          {/* Floating elements around the image */}
          <motion.div
            className="floating-element float-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0
            }}
          />
          
          <motion.div
            className="floating-element float-2"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -15, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <motion.div
            className="floating-element float-3"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
      </section>

    </div>
  );
};

export default HeroSection;