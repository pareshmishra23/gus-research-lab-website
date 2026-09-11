import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, Globe, Share2, MessageSquare } from 'lucide-react';
import { getPublicSiteSettings } from '../services/projectService';

const socialIconMap = {
  GitHub: Globe,
  LinkedIn: Share2,
  YouTube: ExternalLink,
  'X / Twitter': MessageSquare,
  Twitter: MessageSquare
};

export default function Footer() {
  const [settings, setSettings] = useState({
    siteName: 'GUS Research Lab',
    shortName: 'GUS LAB',
    footerDescription: 'Pioneering scientific breakthroughs through innovation and collaboration.',
    contactEmail: 'info@guslab.res',
    contactPhone: '+1 (555) 123-4567',
    contactAddress: '123 Science Way, Research City',
    footerLinks: [
      { label: 'Home', url: '/', enabled: true, displayOrder: 1 },
      { label: 'Research', url: '/research', enabled: true, displayOrder: 2 },
      { label: 'Publications', url: '/publications', enabled: true, displayOrder: 3 },
      { label: 'Videos', url: '/videos', enabled: true, displayOrder: 4 },
      { label: 'AI Assistant', url: '/ai-assistant', enabled: true, displayOrder: 5 },
      { label: 'Admin Panel', url: '/admin', enabled: true, displayOrder: 6 }
    ],
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com', enabled: true, displayOrder: 1 },
      { platform: 'LinkedIn', url: 'https://linkedin.com', enabled: true, displayOrder: 2 },
      { platform: 'YouTube', url: 'https://youtube.com', enabled: true, displayOrder: 3 },
      { platform: 'X / Twitter', url: 'https://x.com', enabled: true, displayOrder: 4 }
    ]
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getPublicSiteSettings();
      if (data) {
        setSettings(prev => ({
          ...prev,
          ...data
        }));
      }
    } catch (err) {
      console.warn('Error loading dynamic footer settings:', err);
    }
  };

  const enabledFooterLinks = (settings.footerLinks || [])
    .filter(link => Boolean(link.enabled ?? true))
    .sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));

  const enabledSocialLinks = (settings.socialLinks || [])
    .filter(link => Boolean(link.enabled ?? true))
    .sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));

  return (
    <footer style={{ background: '#070b12', borderTop: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8', padding: '3.5rem 0 1.5rem' }}>
      <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
        
        {/* Brand Section */}
        <div className="footer-section">
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🔬 {settings.siteName || 'GUS Research Lab'}
          </h4>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1.25rem' }}>
            {settings.footerDescription}
          </p>

          {/* Social Links */}
          {enabledSocialLinks.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {enabledSocialLinks.map((social, idx) => {
                const IconComponent = socialIconMap[social.platform] || ExternalLink;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#60a5fa',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    title={social.platform}
                  >
                    <IconComponent size={16} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {enabledFooterLinks.map((link, idx) => (
              <li key={idx}>
                {link.url?.startsWith('http') ? (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    {link.label} <ExternalLink size={12} />
                  </a>
                ) : (
                  <Link to={link.url} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>Contact Information</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
              <Mail size={16} style={{ color: '#60a5fa' }} />
              <a href={`mailto:${settings.contactEmail}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{settings.contactEmail}</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1' }}>
              <Phone size={16} style={{ color: '#60a5fa' }} />
              <span>{settings.contactPhone}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#cbd5e1' }}>
              <MapPin size={16} style={{ color: '#60a5fa', marginTop: '3px' }} />
              <span>{settings.contactAddress}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom" style={{ maxWidth: '1200px', margin: '2.5rem auto 0', padding: '1.25rem 1.5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
        <p>&copy; {new Date().getFullYear()} {settings.siteName || 'GUS Research Lab'}. All rights reserved.</p>
      </div>
    </footer>
  );
}
