import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username.trim(), password);
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        setError('Invalid username or password. Please try again.');
      } else if (err.response?.status === 404) {
        setError('Backend API endpoint not found (404). Check backend URL.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to backend server. Make sure Spring Boot is running on port 8080.');
      } else {
        setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <div className="login-logo">🔬</div>
          <h2>Admin Login</h2>
          <p>Access GUS Research Lab Management</p>
        </div>

        {error && (
          <div className="login-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username / Email</label>
            <div className="input-with-icon">
              <User size={18} />
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter username or email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Forgot password? Contact system administrator.</p>
        </div>
      </motion.div>
    </div>
  );
}
