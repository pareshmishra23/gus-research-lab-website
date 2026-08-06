import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Microscope } from 'lucide-react';

export default function Navbar({ isAdmin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <nav>
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <Microscope size={28} className="text-accent-blue" />
          <span>GUS LAB</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <a href="#">Publications</a>
          <a href="#">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/admin" onClick={closeMenu}>Admin</Link>
          <a href="#" onClick={closeMenu}>Publications</a>
          <a href="#" onClick={closeMenu}>Contact</a>
        </div>
      </nav>
    </header>
  );
}
