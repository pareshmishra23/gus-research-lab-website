import { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = 'http://localhost:8080/api';

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Research',
    status: 'Active',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/items`);
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      await axios.post(`${API_BASE}/items`, formData);
      setSuccess('Item added successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'Research',
        status: 'Active',
      });
      fetchItems();
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${API_BASE}/items/${id}`);
        setSuccess('Item deleted successfully!');
        fetchItems();
      } catch (err) {
        console.error('Error deleting item:', err);
        setError('Failed to delete item. Please try again.');
      }
    }
  };

  return (
    <div>
      <Banner 
        title="Admin Panel" 
        subtitle="Manage research items and laboratory projects" 
      />

      <div className="container">
        <div className="admin-form">
          <h2 style={{ color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>Add New Research Item</h2>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter item title"
                required
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter item description"
                required
                style={{ width: '100%', minHeight: '120px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="custom-select"
                >
                  <option value="Research">Research</option>
                  <option value="Development">Development</option>
                  <option value="Publication">Publication</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="custom-select"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '1rem' }}>Add Item</button>
          </form>
        </div>

        <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#fff' }}>Current Items</h2>

        {loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#4a7bba' }}>
            <p>No items yet. Create one using the form above!</p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', opacity: 0.8 }}>{item.description}</p>
                <div className="meta" style={{ fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#4a7bba' }}>Category:</strong> {item.category}</div>
                  <div style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#4a7bba' }}>Status:</strong> {item.status}</div>
                  <div><strong style={{ color: '#4a7bba' }}>ID:</strong> {item.id}</div>
                </div>
                <button
                  className="danger"
                  onClick={() => handleDelete(item.id)}
                  style={{ width: '100%' }}
                >
                  Delete Item
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
