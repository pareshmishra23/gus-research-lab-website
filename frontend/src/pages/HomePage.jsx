import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';

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
      <Navbar />
      <Banner 
        title="GUS Research Lab" 
        subtitle="Advancing scientific research and innovation through collaborative excellence" 
      />

      <div className="container">
        <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Research Projects & Items</h2>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading research items...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#4a7bba' }}>
            <p>No research items yet. Visit the admin panel to add some!</p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="meta">
                  <strong>Category:</strong> {item.category}
                  <br />
                  <strong>Status:</strong> {item.status}
                  <br />
                  <strong>Added:</strong> {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
