import '../Stylesheets/HeroSection.css';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const features = [
    {
      title: "🚌 Bus Tracking",
      desc: "Track your bus live with real-time GPS updates and status alerts."
    },
    {
      title: "📍 Smart Routes",
      desc: "View optimized routes with all stops and estimated arrival times."
    },
    {
      title: "📅 Schedules",
      desc: "Access complete bus schedules and plan your journey efficiently."
    },
    {
      title: "👨‍🎓 Student Integration",
      desc: "Register your bus and get personalized transport updates."
    }
  ];

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

        {/* RIGHT GLASS CARD */}
        <motion.div
          className="hero-card"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            🚍 Campus Rider
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Route: College → City Center
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Departure: 8:00 AM
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Status: <span className="live">Live Tracking</span>
          </motion.p>
        </motion.div>

        {/* ANIMATED BUS */}
        <motion.div
          className="bus-container"
          initial={{ x: "-100%", rotate: 0 }}
          animate={{ x: "120%", rotate: [0, 2, -2, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.img
            src="/src/assets/bus.png"
            alt="Campus Bus"
            className="bus-image"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        {features.map((item, index) => (
          <motion.div
            className="feature-card"
            key={index}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.15, 
              duration: 0.8 
            }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 15px 40px rgba(79, 195, 247, 0.3)"
            }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.2 }}
            >
              {item.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              {item.desc}
            </motion.p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default HeroSection;