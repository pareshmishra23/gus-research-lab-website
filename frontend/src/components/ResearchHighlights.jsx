import { motion } from 'framer-motion';
import { Beaker, Brain, Zap, Globe } from 'lucide-react';

const highlights = [
  {
    icon: Beaker,
    title: 'Advanced Research',
    description: 'Cutting-edge laboratory facilities and methodologies for groundbreaking discoveries.',
  },
  {
    icon: Brain,
    title: 'Innovation Hub',
    description: 'Collaborative environment fostering creative solutions to complex scientific challenges.',
  },
  {
    icon: Zap,
    title: 'High Impact',
    description: 'Delivering research with real-world applications and significant scientific contributions.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Partnerships with leading institutions worldwide for enhanced research capabilities.',
  },
];

export default function ResearchHighlights() {
  return (
    <section className="highlights-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Why Choose GUS Research Lab</h2>
          <p>Excellence in scientific research and innovation</p>
        </motion.div>

        <div className="highlights-grid">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="highlight-card"
              >
                <div className="highlight-icon">
                  <Icon size={32} />
                </div>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
