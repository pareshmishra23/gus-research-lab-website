import { useState, useEffect } from 'react';
import { 
  Save, RefreshCw, AlertCircle, Check, Plus, Trash2, Globe, Mail, Phone, 
  MapPin, Share2, Compass, Home, Layers, ArrowUp, ArrowDown, Eye, EyeOff
} from 'lucide-react';
import { getPublicSiteSettings, updateSiteSettings } from '../../services/projectService';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('brand'); // brand, footerLinks, socialLinks, navigation, homepage
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [settings, setSettings] = useState({
    siteName: 'GUS Research Lab',
    shortName: 'GUS LAB',
    footerDescription: 'Pioneering scientific breakthroughs through innovation and collaboration.',
    contactEmail: 'info@guslab.res',
    contactPhone: '+1 (555) 123-4567',
    contactAddress: '123 Science Way, Research City',
    heroTitle: 'Pioneering Scientific Discovery',
    heroSubtitle: 'Advancing knowledge through innovative research, collaborative excellence, and cutting-edge technology.',
    primaryCtaLabel: 'Explore Research',
    primaryCtaUrl: '/research',
    secondaryCtaLabel: 'View Projects',
    secondaryCtaUrl: '/research',
    footerLinks: [],
    socialLinks: [],
    navigationLinks: []
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublicSiteSettings();
      if (data) {
        setSettings({
          siteName: data.siteName || 'GUS Research Lab',
          shortName: data.shortName || 'GUS LAB',
          footerDescription: data.footerDescription || 'Pioneering scientific breakthroughs through innovation and collaboration.',
          contactEmail: data.contactEmail || 'info@guslab.res',
          contactPhone: data.contactPhone || '+1 (555) 123-4567',
          contactAddress: data.contactAddress || '123 Science Way, Research City',
          heroTitle: data.heroTitle || 'Pioneering Scientific Discovery',
          heroSubtitle: data.heroSubtitle || 'Advancing knowledge through innovative research, collaborative excellence, and cutting-edge technology.',
          primaryCtaLabel: data.primaryCtaLabel || 'Explore Research',
          primaryCtaUrl: data.primaryCtaUrl || '/research',
          secondaryCtaLabel: data.secondaryCtaLabel || 'View Projects',
          secondaryCtaUrl: data.secondaryCtaUrl || '/research',
          footerLinks: data.footerLinks || [],
          socialLinks: data.socialLinks || [],
          navigationLinks: data.navigationLinks || []
        });
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setError('Failed to load site settings from server.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAll = async (e) => {
    e?.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setSaving(true);
      await updateSiteSettings(settings);
      setSuccess('Site settings and content saved successfully! Public site is updated.');
      fetchSettings();
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(err.response?.data || 'Failed to save site settings.');
    } finally {
      setSaving(false);
    }
  };

  // Footer Link Handlers
  const handleAddFooterLink = () => {
    setSettings(prev => ({
      ...prev,
      footerLinks: [
        ...prev.footerLinks,
        { label: 'New Link', url: '/', enabled: true, displayOrder: prev.footerLinks.length + 1 }
      ]
    }));
  };

  const handleUpdateFooterLink = (index, field, value) => {
    const updated = [...settings.footerLinks];
    updated[index][field] = value;
    setSettings(prev => ({ ...prev, footerLinks: updated }));
  };

  const handleRemoveFooterLink = (index) => {
    setSettings(prev => ({
      ...prev,
      footerLinks: prev.footerLinks.filter((_, i) => i !== index)
    }));
  };

  // Social Link Handlers
  const handleAddSocialLink = () => {
    setSettings(prev => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        { platform: 'GitHub', url: 'https://github.com', enabled: true, displayOrder: prev.socialLinks.length + 1 }
      ]
    }));
  };

  const handleUpdateSocialLink = (index, field, value) => {
    const updated = [...settings.socialLinks];
    updated[index][field] = value;
    setSettings(prev => ({ ...prev, socialLinks: updated }));
  };

  const handleRemoveSocialLink = (index) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  // Navigation Link Handlers
  const handleAddNavLink = () => {
    setSettings(prev => ({
      ...prev,
      navigationLinks: [
        ...prev.navigationLinks,
        { label: 'New Page', url: '/new', enabled: true, displayOrder: prev.navigationLinks.length + 1 }
      ]
    }));
  };

  const handleUpdateNavLink = (index, field, value) => {
    const updated = [...settings.navigationLinks];
    updated[index][field] = value;
    setSettings(prev => ({ ...prev, navigationLinks: updated }));
  };

  const handleRemoveNavLink = (index) => {
    setSettings(prev => ({
      ...prev,
      navigationLinks: prev.navigationLinks.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
        <RefreshCw size={24} className="animate-spin" style={{ marginBottom: '0.5rem' }} />
        <p>Loading site settings...</p>
      </div>
    );
  }

  return (
    <div style={{ color: '#fff' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>Site Settings & CMS Configuration</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Manage brand names, contact info, footer content, social channels, navigation, and homepage hero text.
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.5rem' }}
        >
          <Save size={18} /> {saving ? 'Saving Changes...' : 'Save All Settings'}
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

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'brand', label: 'Brand & Contact', icon: Globe },
          { id: 'footerLinks', label: 'Footer Links', icon: Compass },
          { id: 'socialLinks', label: 'Social Links', icon: Share2 },
          { id: 'navigation', label: 'Navigation Menu', icon: Layers },
          { id: 'homepage', label: 'Homepage Hero', icon: Home }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                border: isActive ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.08)',
                background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                color: isActive ? '#60a5fa' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Brand & Contact Settings */}
      {activeTab === 'brand' && (
        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '2rem', borderRadius: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#f8fafc', fontSize: '1.2rem' }}>Brand & Contact Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Site Full Name *</label>
              <input type="text" name="siteName" value={settings.siteName} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Short Brand Name *</label>
              <input type="text" name="shortName" value={settings.shortName} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Footer Description *</label>
              <textarea name="footerDescription" value={settings.footerDescription} onChange={handleTextChange} rows={3} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Contact Email</label>
              <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Contact Phone</label>
              <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Contact Address</label>
              <input type="text" name="contactAddress" value={settings.contactAddress} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Footer Quick Links */}
      {activeTab === 'footerLinks' && (
        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '2rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem' }}>Manage Footer Quick Links</h3>
            <button onClick={handleAddFooterLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              <Plus size={16} /> Add Footer Link
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {settings.footerLinks.map((link, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 80px 100px 50px', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <input type="text" value={link.label} onChange={(e) => handleUpdateFooterLink(idx, 'label', e.target.value)} placeholder="Link Label" style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                <input type="text" value={link.url} onChange={(e) => handleUpdateFooterLink(idx, 'url', e.target.value)} placeholder="URL e.g. /research or https://..." style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                <input type="number" value={link.displayOrder || idx + 1} onChange={(e) => handleUpdateFooterLink(idx, 'displayOrder', Number(e.target.value))} style={{ padding: '0.4rem 0.4rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', textAlign: 'center' }} />
                <button onClick={() => handleUpdateFooterLink(idx, 'enabled', !Boolean(link.enabled))} style={{ padding: '0.35rem 0.5rem', borderRadius: '6px', background: link.enabled ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${link.enabled ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, color: link.enabled ? '#86efac' : '#fca5a5', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                  {link.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <button onClick={() => handleRemoveFooterLink(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', textAlign: 'center' }} title="Remove Link">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Social Links */}
      {activeTab === 'socialLinks' && (
        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '2rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem' }}>Manage Social Media Channels</h3>
            <button onClick={handleAddSocialLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              <Plus size={16} /> Add Social Link
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {settings.socialLinks.map((social, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 80px 100px 50px', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <select value={social.platform} onChange={(e) => handleUpdateSocialLink(idx, 'platform', e.target.value)} style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }}>
                  <option value="GitHub">GitHub</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="YouTube">YouTube</option>
                  <option value="X / Twitter">X / Twitter</option>
                  <option value="Other">Other</option>
                </select>
                <input type="text" value={social.url} onChange={(e) => handleUpdateSocialLink(idx, 'url', e.target.value)} placeholder="https://..." style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                <input type="number" value={social.displayOrder || idx + 1} onChange={(e) => handleUpdateSocialLink(idx, 'displayOrder', Number(e.target.value))} style={{ padding: '0.4rem 0.4rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', textAlign: 'center' }} />
                <button onClick={() => handleUpdateSocialLink(idx, 'enabled', !Boolean(social.enabled))} style={{ padding: '0.35rem 0.5rem', borderRadius: '6px', background: social.enabled ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${social.enabled ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, color: social.enabled ? '#86efac' : '#fca5a5', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                  {social.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <button onClick={() => handleRemoveSocialLink(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', textAlign: 'center' }} title="Remove Channel">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Navigation Links */}
      {activeTab === 'navigation' && (
        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '2rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem' }}>Public Navigation Menu Management</h3>
            <button onClick={handleAddNavLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              <Plus size={16} /> Add Nav Link
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {settings.navigationLinks.map((nav, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 80px 100px 50px', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <input type="text" value={nav.label} onChange={(e) => handleUpdateNavLink(idx, 'label', e.target.value)} placeholder="Nav Label" style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                <input type="text" value={nav.url} onChange={(e) => handleUpdateNavLink(idx, 'url', e.target.value)} placeholder="URL e.g. /research" style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }} />
                <input type="number" value={nav.displayOrder || idx + 1} onChange={(e) => handleUpdateNavLink(idx, 'displayOrder', Number(e.target.value))} style={{ padding: '0.4rem 0.4rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', textAlign: 'center' }} />
                <button onClick={() => handleUpdateNavLink(idx, 'enabled', !Boolean(nav.enabled))} style={{ padding: '0.35rem 0.5rem', borderRadius: '6px', background: nav.enabled ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${nav.enabled ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, color: nav.enabled ? '#86efac' : '#fca5a5', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                  {nav.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <button onClick={() => handleRemoveNavLink(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', textAlign: 'center' }} title="Remove Nav Link">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Homepage Hero Configuration */}
      {activeTab === 'homepage' && (
        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '2rem', borderRadius: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#f8fafc', fontSize: '1.2rem' }}>Homepage Hero Section Settings</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Hero Main Title *</label>
              <input type="text" name="heroTitle" value={settings.heroTitle} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Hero Subtitle Description *</label>
              <textarea name="heroSubtitle" value={settings.heroSubtitle} onChange={handleTextChange} rows={3} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Primary CTA Label</label>
              <input type="text" name="primaryCtaLabel" value={settings.primaryCtaLabel} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Primary CTA URL</label>
              <input type="text" name="primaryCtaUrl" value={settings.primaryCtaUrl} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Secondary CTA Label</label>
              <input type="text" name="secondaryCtaLabel" value={settings.secondaryCtaLabel} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Secondary CTA URL</label>
              <input type="text" name="secondaryCtaUrl" value={settings.secondaryCtaUrl} onChange={handleTextChange} style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
