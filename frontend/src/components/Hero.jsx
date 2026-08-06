import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section" style={{ 
      backgroundImage: 'linear-gradient(rgba(10, 17, 40, 0.6), rgba(10, 17, 40, 0.8)), url("/assets/banner.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '8rem 2rem 6rem'
    }}>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-text"
        >
          <h1 style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Pioneering Scientific Discovery</h1>
          <p style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Advancing knowledge through innovative research, collaborative excellence, and cutting-edge technology.</p>
          <div className="hero-buttons">
            <Link to="/research" className="btn btn-primary">
              Explore Research <ArrowRight size={20} />
            </Link>
            <Link to="/publications" className="btn btn-secondary" style={{ color: 'white', borderColor: 'white' }}>
              Publications
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
