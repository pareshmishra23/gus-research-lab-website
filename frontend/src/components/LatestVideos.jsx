import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Enterprise AI & Cognitive Neural Systems',
    videoUrl: '/videos/enterprise-ai.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    duration: '14:20',
    views: '12.4K',
  },
  {
    id: 2,
    title: 'UAP Sensor Telemetry & Anomaly Analysis',
    videoUrl: '/videos/uap-telemetry.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    duration: '8:45',
    views: '28.1K',
  },
  {
    id: 3,
    title: 'Quantum Advantage & Lattice Cryptography',
    videoUrl: '/videos/enterprise-ai.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    duration: '10:15',
    views: '9.8K',
  },
];

export default function LatestVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="videos-section" style={{ padding: '4rem 2rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
          style={{ marginBottom: '2.5rem' }}
        >
          <h2 style={{ fontSize: '2rem', color: '#fff', fontWeight: 700 }}>Latest Research Videos</h2>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Visual insights, podcast recordings, and laboratory video broadcasts</p>
        </motion.div>

        <div className="videos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="video-card"
              onClick={() => setActiveVideo(video)}
              style={{ cursor: 'pointer' }}
            >
              <div className="video-thumbnail" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' }}>
                    <Play size={24} fill="white" style={{ marginLeft: '3px' }} />
                  </div>
                </div>
                <span className="video-duration" style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#fff' }}>{video.duration}</span>
              </div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{video.title}</h3>
              <p className="video-views" style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{video.views} views</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: '#0f172a',
                borderRadius: '16px',
                overflow: 'hidden',
                maxWidth: '900px',
                width: '100%',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>{activeVideo.title}</h3>
                <button onClick={() => setActiveVideo(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ position: 'relative', width: '100%', height: '500px', background: '#000' }}>
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
