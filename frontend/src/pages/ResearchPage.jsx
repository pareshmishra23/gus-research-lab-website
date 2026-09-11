import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Tag, ExternalLink, Info, FileText, Compass, Activity, TrendingUp, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { getPublicProjects } from '../services/projectService';

const iconMap = {
  FileText: FileText,
  Compass: Compass,
  Activity: Activity,
  TrendingUp: TrendingUp,
  Bot: Bot
};

export default function ResearchPage() {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getPublicProjects();
      setProjectsList(data);
    } catch (err) {
      console.warn('Failed to load research projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => [...new Set(projectsList.map((p) => p.category).filter(Boolean))], [projectsList]);
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    projectsList.forEach(p => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach(t => tagsSet.add(t));
      }
    });
    return [...tagsSet];
  }, [projectsList]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const title = project.title || project.name || '';
      const shortDesc = project.shortDescription || '';
      const cat = project.category || '';
      const tags = Array.isArray(project.tags) ? project.tags : [];

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || cat === selectedCategory;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [projectsList, searchTerm, selectedCategory, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div style={{ background: '#090d16', minHeight: '100vh', color: '#f8fafc', paddingBottom: '6rem' }}>
      <Banner title="Research Portfolio & Projects" subtitle="Explore our live deployed experimental systems and computational research" />

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem' }}>
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="research-sidebar"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '1.5rem',
              height: 'fit-content'
            }}
          >
            {/* Search */}
            <div className="search-box" style={{ marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                    borderRadius: '10px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-section" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>
                <Filter size={16} style={{ display: 'inline', marginRight: '0.5rem', color: '#60a5fa' }} />
                Categories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ cursor: 'pointer', color: selectedCategory === '' ? '#60a5fa' : '#94a3b8', fontSize: '0.875rem' }}>
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  {' '}All Categories
                </label>
                {categories.map((cat) => (
                  <label key={cat} style={{ cursor: 'pointer', color: selectedCategory === cat ? '#60a5fa' : '#94a3b8', fontSize: '0.875rem' }}>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    {' '}{cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div className="filter-section">
              <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>
                <Tag size={16} style={{ display: 'inline', marginRight: '0.5rem', color: '#60a5fa' }} />
                Tags
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      border: selectedTags.includes(tag)
                        ? '1px solid #3b82f6'
                        : '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: selectedTags.includes(tag)
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'rgba(30, 41, 59, 0.4)',
                      color: selectedTags.includes(tag) ? '#60a5fa' : '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Showing {filteredProjects.length} of {projectsList.length} research projects
              </p>
            </div>

            {/* Project List */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                Loading research projects...
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {filteredProjects.map((project, index) => {
                  const IconComponent = iconMap[project.iconName] || FileText;
                  const title = project.title || project.name;
                  const tags = Array.isArray(project.tags) ? project.tags : [];
                  const ctaText = project.ctaText || 'Launch Demo';
                  const id = project.slug || project.id;

                  return (
                    <motion.div
                      key={project.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
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
                              #{tag}
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
                            textDecoration: 'none'
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
                          title="View Details"
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
        </div>
      </div>
    </div>
  );
}
