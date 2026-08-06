import { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = 'http://localhost:8080/api';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/items`);
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Banner 
        title="GUS Research Lab" 
        subtitle="Advancing scientific research and innovation through collaborative excellence" 
      />

      <div className="container">
        <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#fff' }}>Research Projects & Items</h2>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#4a7bba' }}>
            <p>No research items yet. Visit the admin panel to add some!</p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.8 }}>{item.description}</p>
                <div className="meta" style={{ fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                  <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#4a7bba' }}>Category:</strong> {item.category}</div>
                  <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#4a7bba' }}>Status:</strong> {item.status}</div>
                  <div><strong style={{ color: '#4a7bba' }}>Added:</strong> {new Date(item.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
