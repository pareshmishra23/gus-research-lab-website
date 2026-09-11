import { useState, useEffect, useMemo } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Eye, EyeOff, Star, ArrowUp, ArrowDown, 
  ExternalLink, Check, X, AlertCircle, RefreshCw, Layers
} from 'lucide-react';
import { 
  getAdminProjects, createProject, updateProject, togglePublishProject, 
  toggleFeaturedProject, reorderProject, deleteProject 
} from '../../services/projectService';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // All, Published, Draft, Featured, Archived

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'AI / ML',
    liveUrl: '',
    status: 'LIVE DEMO',
    tags: '',
    featured: true,
    published: true,
    displayOrder: 1,
    problemStatement: '',
    solution: '',
    technology: '',
    researchNotes: '',
    futureDirection: '',
    iconName: 'Bot',
    ctaText: 'Launch Demo'
  });

  // Inline URL Edit State
  const [editingUrlId, setEditingUrlId] = useState(null);
  const [inlineUrl, setInlineUrl] = useState('');

  // Delete Confirm State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching admin projects:', err);
      setError(err.response?.data || 'Failed to load projects from server.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    setError(null);
    setSuccess(null);
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        shortDescription: project.shortDescription || '',
        fullDescription: project.fullDescription || '',
        category: project.category || 'AI / ML',
        liveUrl: project.liveUrl || '',
        status: project.status || 'LIVE DEMO',
        tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
        featured: project.featured ?? true,
        published: project.published ?? true,
        displayOrder: project.displayOrder || 1,
        problemStatement: project.problemStatement || '',
        solution: project.solution || '',
        technology: Array.isArray(project.technology) ? project.technology.join(', ') : (project.technology || ''),
        researchNotes: project.researchNotes || '',
        futureDirection: project.futureDirection || '',
        iconName: project.iconName || 'Bot',
        ctaText: project.ctaText || 'Launch Demo'
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        shortDescription: '',
        fullDescription: '',
        category: 'AI / ML',
        liveUrl: '',
        status: 'LIVE DEMO',
        tags: '',
        featured: true,
        published: true,
        displayOrder: projects.length + 1,
        problemStatement: '',
        solution: '',
        technology: '',
        researchNotes: '',
        futureDirection: '',
        iconName: 'Bot',
        ctaText: 'Launch Demo'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateUrl = (url) => {
    if (!url || url.trim() === '') return true;
    try {
      const parsed = new URL(url.trim());
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!formData.shortDescription.trim()) {
      setError('Short description is required.');
      return;
    }

    if (formData.liveUrl && !validateUrl(formData.liveUrl)) {
      setError('Please enter a valid HTTP or HTTPS URL.');
      return;
    }

    // Format tags and technology arrays
    const formattedTags = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];
    
    const formattedTech = formData.technology
      ? formData.technology.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      tags: formattedTags,
      technology: formattedTech,
      displayOrder: Number(formData.displayOrder) || 1
    };

    try {
      setSaving(true);
      if (editingProject) {
        await updateProject(editingProject.id, payload);
        setSuccess(`Project "${formData.title}" updated successfully!`);
      } else {
        await createProject(payload);
        setSuccess(`Project "${formData.title}" created successfully!`);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err.response?.data || 'Failed to save project. Please check fields.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (id, currentTitle) => {
    try {
      setSaving(true);
      await togglePublishProject(id);
      setSuccess(`Updated publication status for "${currentTitle}".`);
      fetchProjects();
    } catch (err) {
      setError('Failed to update publication status.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await toggleFeaturedProject(id);
      fetchProjects();
    } catch (err) {
      setError('Failed to update featured status.');
    }
  };

  const handleReorder = async (id, direction) => {
    try {
      await reorderProject(id, direction);
      fetchProjects();
    } catch (err) {
      setError('Failed to reorder project.');
    }
  };

  const handleStartInlineUrlEdit = (project) => {
    setEditingUrlId(project.id);
    setInlineUrl(project.liveUrl || '');
  };

  const handleSaveInlineUrl = async (project) => {
    if (inlineUrl && !validateUrl(inlineUrl)) {
      setError('Please enter a valid HTTP or HTTPS URL.');
      return;
    }

    try {
      setSaving(true);
      await updateProject(project.id, {
        ...project,
        liveUrl: inlineUrl.trim()
      });
      setEditingUrlId(null);
      setSuccess(`Live URL updated for "${project.title}".`);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data || 'Failed to update URL.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSaving(true);
      await deleteProject(id);
      setSuccess('Project permanently deleted successfully.');
      setDeleteConfirmId(null);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data || 'Unable to delete the project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Filtered List
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()));

      let matchesFilter = true;
      if (activeFilter === 'Published') matchesFilter = Boolean(p.published);
      else if (activeFilter === 'Draft') matchesFilter = !Boolean(p.published);
      else if (activeFilter === 'Featured') matchesFilter = Boolean(p.featured);
      else if (activeFilter === 'Archived') matchesFilter = p.status === 'ARCHIVED';

      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, activeFilter]);

  return (
    <div style={{ color: '#fff' }}>
      {/* Top Banner / Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>Research Projects CMS</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Manage public portfolio, update live demo URLs, reorder and publish research items.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem' }}
        >
          <Plus size={18} /> Add Research Project
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
          <Check size={18} /> {success}
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input 
              type="text" 
              placeholder="Search title, category, description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.875rem'
              }}
            />
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All', 'Published', 'Draft', 'Featured', 'Archived'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: activeFilter === filter ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.08)',
                  background: activeFilter === filter ? 'rgba(59, 130, 246, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                  color: activeFilter === filter ? '#60a5fa' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {filter}
              </button>
            ))}
            <button 
              onClick={fetchProjects}
              style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#cbd5e1', cursor: 'pointer' }}
              title="Refresh projects"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Table / Responsive Grid */}
      <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <RefreshCw size={24} className="animate-spin" style={{ marginBottom: '0.5rem' }} />
            <p>Loading research projects from backend...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <Layers size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
            <p>No projects match your filter or search query.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1rem', width: '50px' }}>Order</th>
                  <th style={{ padding: '1rem' }}>Project</th>
                  <th style={{ padding: '1rem' }}>Live Demo URL</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Published</th>
                  <th style={{ padding: '1rem' }}>Featured</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p, index) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.15s' }}>
                    {/* Order Controls */}
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                        <button 
                          onClick={() => handleReorder(p.id, 'up')}
                          disabled={index === 0}
                          style={{ background: 'none', border: 'none', color: index === 0 ? '#475569' : '#60a5fa', cursor: index === 0 ? 'default' : 'pointer', padding: '2px' }}
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1' }}>{p.displayOrder || index + 1}</span>
                        <button 
                          onClick={() => handleReorder(p.id, 'down')}
                          disabled={index === filteredProjects.length - 1}
                          style={{ background: 'none', border: 'none', color: index === filteredProjects.length - 1 ? '#475569' : '#60a5fa', cursor: index === filteredProjects.length - 1 ? 'default' : 'pointer', padding: '2px' }}
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Project Title & Category */}
                    <td style={{ padding: '1rem', maxWidth: '260px' }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600 }}>
                        {p.category}
                      </div>
                      {p.shortDescription && (
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.shortDescription}
                        </div>
                      )}
                    </td>

                    {/* Live Demo URL with Inline Edit */}
                    <td style={{ padding: '1rem', minWidth: '220px' }}>
                      {editingUrlId === p.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <input 
                            type="text" 
                            value={inlineUrl}
                            onChange={(e) => setInlineUrl(e.target.value)}
                            placeholder="https://..."
                            style={{
                              padding: '0.35rem 0.5rem',
                              borderRadius: '6px',
                              background: 'rgba(30, 41, 59, 0.9)',
                              border: '1px solid #3b82f6',
                              color: '#fff',
                              fontSize: '0.8rem',
                              width: '180px'
                            }}
                          />
                          <button 
                            onClick={() => handleSaveInlineUrl(p)}
                            style={{ background: '#22c55e', border: 'none', color: '#fff', borderRadius: '6px', padding: '0.35rem 0.5rem', cursor: 'pointer' }}
                            title="Save URL"
                          >
                            <Check size={14} />
                          </button>
                          <button 
                            onClick={() => setEditingUrlId(null)}
                            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#cbd5e1', borderRadius: '6px', padding: '0.35rem 0.5rem', cursor: 'pointer' }}
                            title="Cancel"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <a 
                            href={p.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ color: '#60a5fa', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            title={p.liveUrl}
                          >
                            {p.liveUrl || 'No URL'} <ExternalLink size={12} />
                          </a>
                          <button 
                            onClick={() => handleStartInlineUrlEdit(p)}
                            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '2px' }}
                            title="Edit URL"
                          >
                            <Edit2 size={13} />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '1rem' }}>
                      <span className="badge" style={{ 
                        background: p.status === 'LIVE DEMO' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(59, 130, 246, 0.15)', 
                        color: p.status === 'LIVE DEMO' ? '#4ade80' : '#60a5fa', 
                        border: `1px solid ${p.status === 'LIVE DEMO' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.7rem',
                        borderRadius: '6px',
                        fontWeight: 700
                      }}>
                        {p.status || 'ACTIVE'}
                      </span>
                    </td>

                    {/* Published Toggle */}
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={() => handleTogglePublish(p.id, p.title)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          border: p.published ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                          background: p.published ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: p.published ? '#86efac' : '#fca5a5',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {p.published ? <Eye size={12} /> : <EyeOff size={12} />}
                        {p.published ? 'YES' : 'NO'}
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={() => handleToggleFeatured(p.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: p.featured ? '#fcc419' : '#475569',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                        title={p.featured ? 'Featured on Homepage' : 'Not Featured'}
                      >
                        <Star size={18} fill={p.featured ? '#fcc419' : 'none'} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleOpenModal(p)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            background: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            color: '#60a5fa',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
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
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="modal-content" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', maxWidth: '450px', width: '100%', color: '#fff' }}>
            <h3 style={{ marginTop: 0, color: '#f8fafc', fontSize: '1.25rem' }}>Confirm Delete</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Are you sure you want to permanently delete this research project? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button 
                onClick={() => setDeleteConfirmId(null)}
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontWeight: 600 }}
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirmId)}
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
              >
                {saving ? 'Deleting...' : 'Delete Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Comprehensive Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem', overflowY: 'auto' }}>
          <div className="modal-content" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '2rem', maxWidth: '750px', width: '100%', color: '#fff', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.25rem' }}>
                {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Research Project'}
              </h3>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. GUS Document Intelligence & OCR"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Short Description *
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Short summary for research card"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Full Long Description
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    placeholder="Detailed project explanation..."
                    rows={4}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g. AI / Document Intelligence"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  >
                    <option value="LIVE DEMO">LIVE DEMO</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="EXPERIMENTAL">EXPERIMENTAL</option>
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Live Demo URL (HTTP/HTTPS)
                  </label>
                  <input
                    type="text"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://pareshmishra-..."
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="AI, OCR, Machine Learning"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', gridColumn: 'span 2', padding: '0.5rem 0' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleInputChange}
                    />
                    Published (Visible on public site)
                  </label>

                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                    />
                    Featured on Homepage
                  </label>
                </div>

                {/* Optional Project Information */}
                <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#60a5fa', fontSize: '0.95rem' }}>Optional Extended Details</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: '#cbd5e1' }}>Problem Statement</label>
                      <textarea name="problemStatement" value={formData.problemStatement} onChange={handleInputChange} rows={2} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: '#cbd5e1' }}>Solution</label>
                      <textarea name="solution" value={formData.solution} onChange={handleInputChange} rows={2} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: '#cbd5e1' }}>Technology Information</label>
                      <input type="text" name="technology" value={formData.technology} onChange={handleInputChange} placeholder="React, Python, OpenCV" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: '#cbd5e1' }}>Research Notes</label>
                      <input type="text" name="researchNotes" value={formData.researchNotes} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: '#cbd5e1' }}>Future Direction</label>
                      <input type="text" name="futureDirection" value={formData.futureDirection} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '0.625rem 1.25rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ padding: '0.625rem 1.5rem', borderRadius: '8px', background: '#2563eb', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
                >
                  {saving ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
