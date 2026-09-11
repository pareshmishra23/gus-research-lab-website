import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, Video, Search, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../../services/api';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    views: '0'
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/videos`);
      setVideos(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Is the backend running?');
      setVideos([
        { id: 1, title: 'Quantum Lab Tour', category: 'General', views: '1.2k', url: '#' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/videos`, formData);
      setIsAdding(false);
      setFormData({ title: '', url: '', description: '', category: '', views: '0' });
      fetchVideos();
    } catch (err) {
      setError('Failed to save video.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this video?')) {
      try {
        await axios.delete(`${API_BASE}/videos/${id}`);
        fetchVideos();
      } catch (err) {
        setError('Failed to delete video.');
      }
    }
  };

  return (
    <div className="admin-page-content">
      <div className="admin-header-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#0a1128', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #1a3a70' }}>
          <Search size={20} color="#4a7bba" />
          <input type="text" placeholder="Search videos..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
          <Plus size={20} /> Add New Video
        </button>
      </div>

      {error && (
        <div className="login-error" style={{ marginBottom: '2rem', background: 'rgba(255, 107, 107, 0.1)', padding: '1rem', borderRadius: '8px', color: '#ff6b6b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card admin-form-card"
            style={{ marginBottom: '2rem', padding: '2rem', background: '#162447', borderRadius: '12px', border: '1px solid #1a3a70' }}
          >
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3>Add New Lab Video</h3>
              <button className="btn-icon" onClick={() => setIsAdding(false)} style={{ background: 'transparent', border: 'none', color: '#a0aec0', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required 
                    style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Video URL (YouTube/Vimeo)</label>
                  <input 
                    type="text" 
                    value={formData.url} 
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    required 
                    style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Category</label>
                  <input 
                    type="text" 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    required 
                    style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  required
                  style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                ></textarea>
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Save size={18} /> Save Video</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card" style={{ background: '#162447', borderRadius: '12px', border: '1px solid #1a3a70', padding: '1.5rem' }}>
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1a3a70' }}>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Title</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Views</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Loading videos...</td></tr>
            ) : videos.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No videos found.</td></tr>
            ) : (
              videos.map(video => (
                <tr key={video.id} style={{ borderBottom: '1px solid rgba(26, 58, 112, 0.5)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Video size={18} color="#4a7bba" />
                      <strong>{video.title}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>{video.category}</td>
                  <td style={{ padding: '1rem' }}>{video.views}</td>
                  <td style={{ padding: '1rem' }}>
                    <div className="action-buttons-row" style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-icon" style={{ background: 'transparent', border: '1px solid #1a3a70', color: '#a0aec0', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button className="btn-icon text-danger" onClick={() => handleDelete(video.id)} style={{ background: 'transparent', border: '1px solid rgba(255, 107, 107, 0.2)', color: '#ff6b6b', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
