import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Active Projects', value: 45, icon: '📊' },
  { label: 'Publications', value: 320, icon: '📚' },
  { label: 'Team Members', value: 120, icon: '👥' },
  { label: 'Years of Excellence', value: 15, icon: '🏆' },
];

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / 30;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.ceil(prev + increment);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

export default function Statistics() {
  return (
    <section className="statistics-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Our Impact</h2>
          <p>Contributing to global scientific advancement</p>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card"
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">
                <Counter target={stat.value} />
                <span>+</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
