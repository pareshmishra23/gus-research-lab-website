import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Hero() {
  return (
    <section className="hero-section" style={{ 
      backgroundImage: 'linear-gradient(rgba(10, 17, 40, 0.75), rgba(10, 17, 40, 0.9)), url("/assets/banner.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '5rem 2rem 6.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top-Right Floating Portfolio Telemetry Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ 
          position: 'absolute',
          top: '1.5rem',
          right: '2rem',
          width: '240px',
          zIndex: 10
        }}
      >
        <div style={{ 
          borderRadius: '12px', 
          border: '1px solid rgba(59, 130, 246, 0.25)',
          backdropFilter: 'blur(16px)',
          background: 'rgba(10, 17, 40, 0.85)',
          padding: '0.75rem 0.875rem',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Research Portfolio</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6rem', color: '#4ade80', background: 'rgba(74, 222, 128, 0.12)', padding: '0.12rem 0.4rem', borderRadius: '9999px', border: '1px solid rgba(74, 222, 128, 0.25)' }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }}></span> Live System
            </span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '0.35rem 0.45rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>{projects.length}</div>
              <div style={{ fontSize: '0.625rem', color: '#94a3b8', marginTop: '2px' }}>Live Projects</div>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '0.35rem 0.45rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', lineHeight: 1.1 }}>AI / ML</div>
              <div style={{ fontSize: '0.625rem', color: '#94a3b8', marginTop: '2px' }}>Core Tech</div>
            </div>
          </div>

          <div style={{ fontSize: '0.65rem', color: '#cbd5e1', lineHeight: '1.3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.15rem' }}>
              <span style={{ color: '#60a5fa', fontSize: '0.55rem' }}>✦</span> <span>Experimental Systems</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ color: '#a78bfa', fontSize: '0.55rem' }}>✦</span> <span>Open Live Demonstrations</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Centered Hero Main Text & Lower Buttons */}
      <div className="hero-content" style={{ display: 'block', maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-text"
        >
          <div style={{ 
            display: 'inline-block', 
            padding: '0.35rem 1.25rem', 
            borderRadius: '9999px', 
            background: 'rgba(59, 130, 246, 0.12)', 
            border: '1px solid rgba(59, 130, 246, 0.3)', 
            color: '#60a5fa', 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            marginTop: '-1.25rem',
            marginBottom: '1.5rem', 
            letterSpacing: '0.04em' 
          }}>
            AI • ML • Scientific Computing • Experimental Systems
          </div>

          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textShadow: '0 4px 12px rgba(0,0,0,0.6)', lineHeight: 1.15, marginBottom: '1.5rem', color: '#ffffff' }}>
            Pioneering Scientific Discovery
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', textShadow: '0 2px 6px rgba(0,0,0,0.6)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            Advancing knowledge through innovative research, collaborative excellence, and cutting-edge technology.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '3.5rem' }}>
            <Link to="/research" className="btn btn-primary" style={{ padding: '0.875rem 2.25rem', fontSize: '1rem', fontWeight: 600, borderRadius: '12px' }}>
              Explore Research <ArrowRight size={20} />
            </Link>
            <Link to="/research" className="btn btn-secondary" style={{ padding: '0.875rem 2.25rem', fontSize: '1rem', fontWeight: 600, borderRadius: '12px', color: 'white', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)' }}>
              <Layers size={18} style={{ marginRight: '6px' }} /> View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
