import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Lab Tour: State-of-the-Art Facilities',
    thumbnail: '🎥',
    duration: '5:32',
    views: '2.3K',
  },
  {
    id: 2,
    title: 'Research Breakthrough: Quantum Computing',
    thumbnail: '🔬',
    duration: '12:15',
    views: '4.1K',
  },
  {
    id: 3,
    title: 'Team Interview: Meet Our Researchers',
    thumbnail: '👥',
    duration: '8:47',
    views: '1.8K',
  },
];

export default function LatestVideos() {
  return (
    <section className="videos-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Latest Videos</h2>
          <p>Visual insights into our research and laboratory work</p>
        </motion.div>

        <div className="videos-grid">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="video-card"
            >
              <div className="video-thumbnail">
                <span className="thumbnail-emoji">{video.thumbnail}</span>
                <button className="play-button">
                  <Play size={32} fill="white" />
                </button>
                <span className="video-duration">{video.duration}</span>
              </div>
              <h3>{video.title}</h3>
              <p className="video-views">{video.views} views</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
