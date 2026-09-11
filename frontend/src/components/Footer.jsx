import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>🔬 GUS Research Lab</h4>
          <p>Pioneering scientific breakthroughs through innovation and collaboration.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/research">Research</Link></li>
            <li><Link to="/publications">Publications</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>Email: info@guslab.res</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Science Way, Research City</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GUS Research Lab. All rights reserved.</p>
      </div>
    </footer>
  );
}
