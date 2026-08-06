import { motion } from 'framer-motion';
import { Calendar, User, FileText } from 'lucide-react';

const publications = [
  {
    id: 1,
    title: 'Quantum Entanglement in Biological Systems',
    authors: 'Dr. Sarah Johnson, Dr. Michael Chen',
    date: '2026-08-01',
    journal: 'Nature Quantum',
    category: 'Quantum Biology',
  },
  {
    id: 2,
    title: 'Deep Learning for Climate Prediction',
    authors: 'Dr. Emma Wilson, Prof. David Lee',
    date: '2026-07-15',
    journal: 'Science Climate',
    category: 'AI & Climate',
  },
  {
    id: 3,
    title: 'Novel Protein Folding Techniques',
    authors: 'Dr. Alex Kumar, Dr. Lisa Zhang',
    date: '2026-07-01',
    journal: 'Protein Science',
    category: 'Biochemistry',
  },
];

export default function LatestPublications() {
  return (
    <section className="publications-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Latest Publications</h2>
          <p>Recent research contributions and findings</p>
        </motion.div>

        <div className="publications-list">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="publication-item"
            >
              <div className="publication-icon">
                <FileText size={24} />
              </div>
              <div className="publication-content">
                <h3>{pub.title}</h3>
                <div className="publication-meta">
                  <span><User size={14} /> {pub.authors}</span>
                  <span><Calendar size={14} /> {new Date(pub.date).toLocaleDateString()}</span>
                </div>
                <p className="publication-journal">{pub.journal}</p>
              </div>
              <span className="publication-badge">{pub.category}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="view-all-center"
        >
          <button className="btn btn-secondary">View All Publications</button>
        </motion.div>
      </div>
    </section>
  );
}
