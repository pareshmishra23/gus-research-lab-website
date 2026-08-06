import { Link } from 'react-router-dom';

export default function Navbar({ isAdmin }) {
  return (
    <nav>
      <div className="logo">🔬 GUS Research Lab{isAdmin ? ' - Admin' : ''}</div>
      <Link to={isAdmin ? "/" : "/admin"}>
        {isAdmin ? 'Back to Home' : 'Admin Panel'}
      </Link>
    </nav>
  );
}
