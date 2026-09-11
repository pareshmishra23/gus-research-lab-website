import { motion } from 'framer-motion';
import { FileText, Compass, Activity, TrendingUp } from 'lucide-react';

const highlights = [
  {
    icon: FileText,
    title: 'Document Intelligence & OCR',
    description: 'AI-driven optical character recognition, text parsing, and structured data extraction pipelines.',
  },
  {
    icon: Compass,
    title: 'Computational Astrology',
    description: 'Algorithmic chart generation engines computing planetary coordinates and astronomical house positions.',
  },
  {
    icon: Activity,
    title: 'Seismic Telemetry & Dashboards',
    description: 'Real-time earthquake activity visualization and sensor data processing research.',
  },
  {
    icon: TrendingUp,
    title: 'Financial Market Analytics',
    description: 'Time-series indicators, momentum analytics, and quantitative signal exploration.',
  },
];

export default function ResearchHighlights() {
  return (
    <section className="highlights-section" style={{ padding: '4rem 2rem', background: '#090d16' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800 }}>Core Research Domains</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>Practical AI research projects and live system deployments</p>
        </motion.div>

        <div className="highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="highlight-card"
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '1.75rem',
                  textAlign: 'left'
                }}
              >
                <div className="highlight-icon" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', marginBottom: '1rem' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>{highlight.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5 }}>{highlight.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
