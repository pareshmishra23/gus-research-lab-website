import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FlaskConical, BookOpen, FileText, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home', icon: FlaskConical },
  { path: '/research', label: 'Research', icon: FlaskConical },
  { path: '/blog', label: 'Blog', icon: BookOpen },
  { path: '/publications', label: 'Publications', icon: FileText },
  { path: '/videos', label: 'Videos', icon: FlaskConical },
  { path: '/ai-assistant', label: 'AI Assistant', icon: Bot },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img 
            src="/assets/logo.jpg" 
            alt="GUS Research Lab" 
            style={{ 
              height: '38px', 
              width: '38px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
            }} 
          />
          <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>GUS LAB</span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
