import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Compass, Activity, TrendingUp, Bot, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPublicProjects } from '../services/projectService';

const iconMap = {
  FileText: FileText,
  Compass: Compass,
  Activity: Activity,
  TrendingUp: TrendingUp,
  Bot: Bot
};

export default function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      const data = await getPublicProjects();
      // Filter published and featured projects
      const filtered = data.filter(p => Boolean(p.published ?? true) && Boolean(p.featured ?? true));
      setFeaturedProjects(filtered.length > 0 ? filtered : data);
    } catch (err) {
      console.warn('Failed to fetch featured projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="featured-projects-section" style={{ padding: '5rem 2rem', background: '#090d16' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div style={{ display: 'inline-block', padding: '0.25rem 0.875rem', borderRadius: '9999px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', color: '#60a5fa', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Experimental Systems & Deployed Demos
          </div>
          <h2 style={{ fontSize: '2.25rem', color: '#ffffff', fontWeight: 800 }}>Featured Research Projects</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
            Live software applications and research prototypes deployed across agentic AI, document intelligence, computational astrology, seismic telemetry, and financial analytics.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>Loading featured research projects...</div>
        ) : (
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {featuredProjects.map((project, index) => {
              const IconComponent = iconMap[project.iconName] || FileText;
              const title = project.title || project.name;
              const tags = Array.isArray(project.tags) ? project.tags : [];
              const ctaText = project.ctaText || 'Launch Demo';
              const id = project.slug || project.id;

              return (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="project-card"
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
                        <IconComponent size={24} />
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)', padding: '0.25rem 0.625rem', borderRadius: '9999px', border: '1px solid rgba(74, 222, 128, 0.25)' }}>
                        ● {project.status || 'LIVE DEMO'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      {project.category}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                      {title}
                    </h3>

                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                      {project.shortDescription}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {tags.map((tag) => (
                        <span key={tag} style={{ fontSize: '0.75rem', color: '#cbd5e1', background: 'rgba(30, 41, 59, 0.6)', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', pt: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 1rem',
                        borderRadius: '10px',
                        background: '#2563eb',
                        color: '#ffffff',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      {ctaText} <ExternalLink size={14} />
                    </a>

                    <Link
                      to={`/research/${id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.625rem 0.875rem',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#cbd5e1',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }}
                      title="View Project Details"
                    >
                      <Info size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
