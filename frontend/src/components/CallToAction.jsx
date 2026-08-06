import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="cta-content"
        >
          <h2>Ready to Collaborate?</h2>
          <p>Join us in advancing scientific knowledge and making a global impact through innovative research.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">
              Get In Touch <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary">
              <Mail size={20} /> Email Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
