import { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, UserPlus, Shield, ShieldAlert, CheckCircle, XCircle, 
  Trash2, Edit, AlertCircle, Check, RefreshCw 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  getAdminUsers, createAdminUser, toggleUserStatus, updateUserRole, deleteAdminUser 
} from '../../services/projectService';

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isSuperAdmin = user?.roles?.includes('ROLE_SUPER_ADMIN');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'ADMIN',
    enabled: true
  });

  // Edit Role State
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('ADMIN');

  // Delete confirm
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    if (isSuperAdmin) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [isSuperAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching admin users:', err);
      setError(err.response?.data || 'Failed to load administrator accounts.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setError(null);
    setSuccess(null);
    setFormData({
      email: '',
      username: '',
      password: '',
      role: 'ADMIN',
      enabled: true
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and Temporary Password are required.');
      return;
    }

    try {
      setSaving(true);
      await createAdminUser({
        email: formData.email.trim(),
        username: formData.username.trim() || formData.email.trim(),
        password: formData.password,
        role: formData.role,
        enabled: formData.enabled
      });
      setSuccess(`Administrator account "${formData.email}" created successfully.`);
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error('Error creating admin:', err);
      setError(err.response?.data || 'Failed to create administrator account.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (targetUser) => {
    setError(null);
    setSuccess(null);
    try {
      setSaving(true);
      const updatedStatus = !Boolean(targetUser.enabled);
      await toggleUserStatus(targetUser.id, updatedStatus);
      setSuccess(`Status for ${targetUser.email} updated to ${updatedStatus ? 'Active' : 'Disabled'}.`);
      fetchUsers();
    } catch (err) {
      console.error('Status toggle error:', err);
      setError(err.response?.data || 'Operation rejected by server.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveRole = async (targetUser) => {
    setError(null);
    setSuccess(null);
    try {
      setSaving(true);
      await updateUserRole(targetUser.id, selectedRole);
      setSuccess(`Role for ${targetUser.email} updated to ${selectedRole}.`);
      setEditingRoleId(null);
      fetchUsers();
    } catch (err) {
      console.error('Role update error:', err);
      setError(err.response?.data || 'Failed to update user role.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      setSaving(true);
      await deleteAdminUser(id);
      setSuccess('Administrator account removed successfully.');
      setDeleteConfirmId(null);
      fetchUsers();
    } catch (err) {
      console.error('User delete error:', err);
      setError(err.response?.data || 'Failed to delete administrator.');
    } finally {
      setSaving(false);
    }
  };

  if (!isSuperAdmin) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#fff' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#fca5a5' }}>
          <ShieldAlert size={32} />
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#f8fafc' }}>Access Restricted</h3>
        <p style={{ color: '#94a3b8', maxWidth: '450px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
          You are authenticated as <strong>ADMIN</strong>. Only authorized <strong>SUPER_ADMIN</strong> accounts can access and manage administrator accounts.
        </p>
      </div>
    );
  }

  return (
    <div style={{ color: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>Administrator Management</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Manage access control, create administrators, assign roles, and enable/disable accounts.
          </p>
        </div>
        <button 
          onClick={handleOpenModal} 
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem' }}
        >
          <UserPlus size={18} /> Add Administrator
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div style={{ padding: '0.875rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', color: '#fca5a5', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}
      {success && (
        <div style={{ padding: '0.875rem 1rem', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '10px', color: '#86efac', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <CheckCircle size={18} /> {success}
        </div>
      )}

      {/* Admin User Table */}
      <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <RefreshCw size={24} className="animate-spin" style={{ marginBottom: '0.5rem' }} />
            <p>Loading administrator accounts...</p>
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <UsersIcon size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
            <p>No administrator accounts found.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1rem' }}>Username / Email</th>
                  <th style={{ padding: '1rem' }}>Role</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const primaryRole = u.primaryRole || (u.roles?.includes('ROLE_SUPER_ADMIN') ? 'SUPER_ADMIN' : 'ADMIN');
                  const isActive = Boolean(u.enabled);

                  return (
                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{u.username}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{u.email}</div>
                      </td>

                      {/* Role with inline edit option */}
                      <td style={{ padding: '1rem' }}>
                        {editingRoleId === u.id ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <select
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value)}
                              style={{ padding: '0.25rem 0.5rem', borderRadius: '6px', background: 'rgba(30,41,59,0.9)', border: '1px solid #3b82f6', color: '#fff', fontSize: '0.8rem' }}
                            >
                              <option value="ADMIN">ADMIN</option>
                              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                            </select>
                            <button onClick={() => handleSaveRole(u)} style={{ background: '#22c55e', border: 'none', color: '#fff', borderRadius: '6px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>
                              <Check size={12} />
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                              padding: '0.25rem 0.6rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: primaryRole === 'SUPER_ADMIN' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                              color: primaryRole === 'SUPER_ADMIN' ? '#c084fc' : '#60a5fa',
                              border: `1px solid ${primaryRole === 'SUPER_ADMIN' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`
                            }}>
                              {primaryRole}
                            </span>
                            <button onClick={() => { setEditingRoleId(u.id); setSelectedRole(primaryRole); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                              <Edit size={12} />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Status badge & enable/disable button */}
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => handleToggleStatus(u)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '6px',
                            border: isActive ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                            background: isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: isActive ? '#86efac' : '#fca5a5',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {isActive ? 'Active' : 'Disabled'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setDeleteConfirmId(u.id)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#fca5a5',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete User Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="modal-content" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', maxWidth: '450px', width: '100%', color: '#fff' }}>
            <h3 style={{ marginTop: 0, color: '#f8fafc', fontSize: '1.25rem' }}>Remove Administrator</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Are you sure you want to remove this administrator account?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={() => setDeleteConfirmId(null)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={() => handleDeleteUser(deleteConfirmId)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                {saving ? 'Removing...' : 'Remove Admin'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Administrator Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
          <div className="modal-content" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '2rem', maxWidth: '500px', width: '100%', color: '#fff' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#f8fafc', fontSize: '1.25rem' }}>
              Create New Administrator
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin@guslab.org"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Username (optional)</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Defaults to email if blank"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  >
                    <option value="ADMIN">ADMIN (Projects & URLs)</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN (Full System & User Control)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Temporary Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Secure password"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div style={{ paddingTop: '0.5rem' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="enabled"
                      checked={formData.enabled}
                      onChange={handleInputChange}
                    />
                    Account Status: Active
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.625rem 1.25rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontWeight: 600 }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} style={{ padding: '0.625rem 1.5rem', borderRadius: '8px', background: '#2563eb', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                  {saving ? 'Creating...' : 'Create Administrator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
