import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Quantum Computing Applications',
    description: 'Exploring quantum algorithms for solving complex optimization problems in drug discovery.',
    category: 'Quantum Computing',
    status: 'Active',
    image: '🔬',
  },
  {
    id: 2,
    title: 'Sustainable Energy Solutions',
    description: 'Developing next-generation renewable energy technologies for global sustainability.',
    category: 'Energy',
    status: 'Active',
    image: '⚡',
  },
  {
    id: 3,
    title: 'AI-Driven Medical Diagnostics',
    description: 'Machine learning models for early disease detection and personalized treatment plans.',
    category: 'AI & Healthcare',
    status: 'Active',
    image: '🧬',
  },
];

export default function FeaturedProjects() {
  return (
    <section className="featured-projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Featured Projects</h2>
          <p>Showcasing our most impactful research initiatives</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card"
            >
              <div className="project-image">{project.image}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <span className="badge">{project.category}</span>
                <span className="status-badge active">{project.status}</span>
              </div>
              <button className="project-link">
                View Project <ExternalLink size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
