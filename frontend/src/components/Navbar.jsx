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
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: scrolled ? 'rgba(9, 13, 22, 0.98)' : 'rgba(10, 17, 40, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', transition: 'all 0.3s ease' }}>
      <div className="nav-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#ffffff' }}>
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
          <span style={{ fontWeight: 700, letterSpacing: '0.03em', fontSize: '1.2rem', color: '#ffffff' }}>GUS LAB</span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              style={{
                color: location.pathname === link.path ? '#60a5fa' : '#cbd5e1',
                textDecoration: 'none',
                fontWeight: location.pathname === link.path ? 700 : 500,
                fontSize: '0.925rem',
                transition: 'color 0.2s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sub-Nav Ribbon: AI • ML • Scientific Computing • Experimental Systems */}
      <div style={{
        textAlign: 'center',
        padding: '0.35rem 1rem',
        background: 'rgba(15, 23, 42, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#60a5fa',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          AI • ML • Scientific Computing • Experimental Systems
        </span>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav"
            style={{ background: '#090d16', padding: '1rem 2rem' }}
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', color: location.pathname === link.path ? '#60a5fa' : '#cbd5e1', textDecoration: 'none' }}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
