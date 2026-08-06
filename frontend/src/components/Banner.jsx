import { motion } from 'framer-motion';

export default function Banner({ title, subtitle }) {
  return (
    <div className="banner">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </motion.div>
    </div>
  );
}
