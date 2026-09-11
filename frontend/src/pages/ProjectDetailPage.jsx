import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, CheckCircle2, Cpu, Code2, AlertTriangle, Lightbulb, Compass, FileText, Activity, TrendingUp, Bot } from 'lucide-react';
import { getPublicProjectDetail } from '../services/projectService';
import Banner from '../components/Banner';

const iconMap = {
  FileText: FileText,
  Compass: Compass,
  Activity: Activity,
  TrendingUp: TrendingUp,
  Bot: Bot
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await getPublicProjectDetail(projectId);
      setProject(data);
    } catch (err) {
      console.warn('Failed to fetch project detail:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh', background: '#090d16', color: '#fff' }}>
        <p style={{ color: '#94a3b8' }}>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh', background: '#090d16', color: '#fff' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Project Not Found</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The requested research project does not exist.</p>
        <Link to="/research" style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: '#fff', borderRadius: '10px', textDecoration: 'none' }}>
          Back to Research Portfolio
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[project.iconName] || FileText;
  const title = project.title || project.name;
  const techList = Array.isArray(project.technology) ? project.technology : (project.technology ? [project.technology] : []);

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', minHeight: '100vh', paddingBottom: '6rem' }}>
      <Banner title={title} subtitle={project.category} />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem 0' }}>
        <Link to="/research" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontSize: '0.9rem', textDecoration: 'none', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Research Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
                <IconComponent size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {project.category}
                </span>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
                  {title}
                </h1>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)', padding: '0.35rem 0.875rem', borderRadius: '9999px', border: '1px solid rgba(74, 222, 128, 0.25)' }}>
                ● {project.status || 'LIVE DEMO'}
              </span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  background: '#2563eb',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                {project.ctaText || 'Launch Demo'} <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Overview */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#60a5fa', marginBottom: '0.75rem' }}>Project Overview</h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.7 }}>{project.fullDescription || project.shortDescription}</p>
          </div>

          {/* Problem Statement & Solution */}
          {(project.problemStatement || project.solution) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {project.problemStatement && (
                <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontWeight: 700, marginBottom: '0.75rem' }}>
                    <AlertTriangle size={18} /> Problem Statement
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.problemStatement}</p>
                </div>
              )}

              {project.solution && (
                <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80', fontWeight: 700, marginBottom: '0.75rem' }}>
                    <CheckCircle2 size={18} /> Research Solution
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Technology Stack */}
          {techList.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
                <Code2 size={20} /> Technology & Frameworks
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {techList.map((tech) => (
                  <span key={tech} style={{ fontSize: '0.875rem', color: '#e2e8f0', background: 'rgba(59, 130, 246, 0.12)', padding: '0.4rem 0.875rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Research Notes */}
          {project.researchNotes && (
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Cpu size={18} /> Research & Implementation Notes
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.researchNotes}</p>
            </div>
          )}

          {/* Future Direction */}
          {project.futureDirection && (
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Lightbulb size={18} /> Future Direction
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.futureDirection}</p>
            </div>
          )}

          {/* Bottom Live Demo CTA Box */}
          <div style={{ textAlign: 'center', padding: '2rem', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(15, 23, 42, 0.8))', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <h4 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 700, marginBottom: '0.5rem' }}>Experience the Live Demonstration</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Access the deployed environment for interactive demonstration.</p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              {project.ctaText || 'Launch Demo'} <ExternalLink size={18} />
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
