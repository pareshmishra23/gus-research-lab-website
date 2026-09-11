import { motion } from 'framer-motion';
import { labMetrics } from '../data/projects';

export default function Statistics() {
  return (
    <section className="statistics-section" style={{ padding: '4rem 2rem', background: '#0b1120' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800 }}>Laboratory Metrics</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>
            Independent research & technology laboratory focused on open deployments
          </p>
        </motion.div>

        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {labMetrics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '2rem 1.5rem',
                textAlign: 'center'
              }}
            >
              <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div className="stat-label" style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
