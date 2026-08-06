import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="newsletter-content"
        >
          <div className="newsletter-text">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest research updates, publications, and lab news.</p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="form-input-group">
              <Mail size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {subscribed ? (
                <>
                  <Check size={20} /> Subscribed
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
