import { motion } from 'framer-motion';

export default function Banner({ title, subtitle }) {
  return (
    <div className="banner" style={{ 
      backgroundImage: 'linear-gradient(rgba(10, 17, 40, 0.7), rgba(10, 17, 40, 0.7)), url("/assets/banner.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>{title}</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.2rem' }}>{subtitle}</p>
      </motion.div>
    </div>
  );
}
