import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FlaskConical, BookOpen, FileText, Bot, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPublicSiteSettings } from '../services/projectService';

const defaultNavLinks = [
  { path: '/', label: 'Home', icon: FlaskConical },
  { path: '/research', label: 'Research', icon: FlaskConical },
  { path: '/blog', label: 'Blog', icon: BookOpen },
  { path: '/publications', label: 'Publications', icon: FileText },
  { path: '/videos', label: 'Videos', icon: FlaskConical },
  { path: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { path: '/admin', label: 'Admin Panel', icon: Shield },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [brandName, setBrandName] = useState('GUS LAB');
  const [navItems, setNavItems] = useState(defaultNavLinks);
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

  useEffect(() => {
    fetchNavSettings();
  }, []);

  const fetchNavSettings = async () => {
    try {
      const data = await getPublicSiteSettings();
      if (data) {
        if (data.shortName) setBrandName(data.shortName);
        if (Array.isArray(data.navigationLinks) && data.navigationLinks.length > 0) {
          const enabledLinks = data.navigationLinks
            .filter(n => Boolean(n.enabled ?? true))
            .sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1))
            .map(n => ({
              path: n.url || '/',
              label: n.label || 'Link',
              icon: n.label === 'Admin Panel' ? Shield : (n.label === 'AI Assistant' ? Bot : FlaskConical)
            }));
          setNavItems(enabledLinks);
        }
      }
    } catch (err) {
      console.warn('Error loading dynamic nav settings:', err);
    }
  };

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
          <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>{brandName}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          {navItems.map((link, idx) => (
            <Link 
              key={idx} 
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
            {navItems.map((link, idx) => (
              <Link 
                key={idx} 
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
