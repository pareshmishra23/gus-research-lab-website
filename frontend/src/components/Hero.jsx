import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-text"
        >
          <h1>Pioneering Scientific Discovery</h1>
          <p>Advancing knowledge through innovative research, collaborative excellence, and cutting-edge technology.</p>
          <div className="hero-buttons">
            <Link to="/research" className="btn btn-primary">
              Explore Research <ArrowRight size={20} />
            </Link>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-image"
        >
          <div className="hero-placeholder">
            <span>Research Lab</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
