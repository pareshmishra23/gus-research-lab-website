import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      {/* Navigation */}
      <nav>
        <div className="logo">🔬 GUS Research Lab - Admin</div>
        <Link to="/">Back to Home</Link>
      </nav>

      {/* Banner */}
      <div className="banner">
        <h1>Admin Panel</h1>
        <p>Manage research items and projects</p>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Add Item Form */}
        <div className="admin-form">
          <h2>Add New Research Item</h2>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter item title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter item description"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#0f1b3c',
                  border: '1px solid #3d5a8c',
                  borderRadius: '4px',
                  color: '#e8eef5',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                }}
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
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#0f1b3c',
                  border: '1px solid #3d5a8c',
                  borderRadius: '4px',
                  color: '#e8eef5',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                }}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <button type="submit">Add Item</button>
          </form>
        </div>

        {/* Items List */}
        <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Current Items</h2>

        {loading ? (
          <div className="loading">Loading items...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#4a7bba' }}>
            <p>No items yet. Create one using the form above!</p>
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
                  <strong>ID:</strong> {item.id}
                </div>
                <button
                  className="danger"
                  onClick={() => handleDelete(item.id)}
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
