import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, FileText, Search, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/articles');
      setArticles(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Is the backend running?');
      // Fallback for demo
      setArticles([
        { id: 1, title: 'Quantum Entanglement Study', author: 'Dr. Sarah', date: new Date().toISOString(), category: 'Quantum' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()),
        date: new Date().toISOString()
      };
      
      await axios.post('http://localhost:8080/api/articles', dataToSend);
      setIsAdding(false);
      setFormData({ title: '', excerpt: '', content: '', author: '', category: '', tags: '' });
      fetchArticles();
    } catch (err) {
      setError('Failed to save article. Check backend connection.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`http://localhost:8080/api/articles/${id}`);
        fetchArticles();
      } catch (err) {
        setError('Failed to delete article.');
      }
    }
  };

  return (
    <div className="admin-page-content">
      <div className="admin-header-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#0a1128', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #1a3a70' }}>
          <Search size={20} color="#4a7bba" />
          <input type="text" placeholder="Search articles..." style={{ background: 'transparent', border: 'none', color: 'white', outline: none }} />
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
          <Plus size={20} /> Add New Article
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
              <h3>Add New Research Article</h3>
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
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Author</label>
                  <input 
                    type="text" 
                    value={formData.author} 
                    onChange={e => setFormData({...formData, author: e.target.value})}
                    required 
                    style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    required
                    style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                  >
                    <option value="">Select Category</option>
                    <option value="Quantum Computing">Quantum Computing</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Energy">Energy</option>
                    <option value="Biotechnology">Biotechnology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.tags} 
                    onChange={e => setFormData({...formData, tags: e.target.value})}
                    placeholder="e.g. quantum, physics, future"
                    style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Excerpt</label>
                <textarea 
                  value={formData.excerpt} 
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  rows="2"
                  required
                  style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                ></textarea>
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0aec0' }}>Content (Markdown supported)</label>
                <textarea 
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  rows="6"
                  required
                  style={{ width: '100%', background: '#0a1128', border: '1px solid #1a3a70', padding: '0.75rem', borderRadius: '6px', color: 'white' }}
                ></textarea>
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Save size={18} /> Save Article</button>
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
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Author</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading articles...</td></tr>
            ) : articles.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No articles found.</td></tr>
            ) : (
              articles.map(article => (
                <tr key={article.id} style={{ borderBottom: '1px solid rgba(26, 58, 112, 0.5)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FileText size={18} color="#4a7bba" />
                      <strong>{article.title}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>{article.author}</td>
                  <td style={{ padding: '1rem' }}><span className="tag-pill" style={{ background: 'rgba(74, 123, 186, 0.1)', color: '#4a7bba', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>{article.category}</span></td>
                  <td style={{ padding: '1rem' }}>{new Date(article.date).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem' }}>
                    <div className="action-buttons-row" style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-icon" style={{ background: 'transparent', border: '1px solid #1a3a70', color: '#a0aec0', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button className="btn-icon text-danger" onClick={() => handleDelete(article.id)} style={{ background: 'transparent', border: '1px solid rgba(255, 107, 107, 0.2)', color: '#ff6b6b', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}>
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
