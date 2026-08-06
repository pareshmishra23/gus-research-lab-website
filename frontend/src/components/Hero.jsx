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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-image"
        >
          {/* Optional: Add a stylized element or leave empty to let background shine */}
          <div style={{ 
            width: '100%', 
            aspectRatio: '16/9', 
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(4px)',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: 'rgba(255,255,255,0.5)'
          }}>
            GUS Research Lab
          </div>
        </motion.div>
      </div>
    </section>
  );
}
