import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Tag, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import Banner from '../components/Banner';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Quantum Computing in 2026',
    excerpt: 'Exploring the latest breakthroughs in quantum supremacy and their practical applications.',
    content: `
# The Future of Quantum Computing in 2026

Quantum computing has reached a pivotal moment. As we enter the second half of the decade, the transition from theoretical research to practical application is accelerating.

## Key Breakthroughs
- **Error Correction**: Significant progress in logical qubit stability.
- **Algorithm Optimization**: New approaches to Shor's and Grover's algorithms.
- **Hybrid Systems**: Integrating classical and quantum processors.

> "The next five years will define the quantum landscape for the rest of the century." - Dr. Sarah Johnson

Stay tuned for more updates from our Quantum Research Division.
    `,
    author: 'Dr. Sarah Johnson',
    date: '2026-08-05',
    category: 'Quantum Computing',
    tags: ['Quantum', 'Technology', 'Future'],
    image: '🌌'
  },
  {
    id: 2,
    title: 'Sustainable Energy: Beyond Lithium-Ion',
    excerpt: 'New battery technologies that could revolutionize renewable energy storage.',
    content: `
# Sustainable Energy: Beyond Lithium-Ion

The quest for higher energy density and safer storage has led to incredible innovations in solid-state and flow batteries.

## Why it matters
1. **Safety**: Reduced risk of thermal runaway.
2. **Longevity**: More charge cycles without degradation.
3. **Sustainability**: Using more abundant materials.

Our Energy Lab is currently testing several prototypes that show promising results.
    `,
    author: 'Dr. Emma Wilson',
    date: '2026-07-28',
    category: 'Energy',
    tags: ['Energy', 'Sustainability', 'Research'],
    image: '⚡'
  }
];

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog | GUS Research Lab</title>
        <meta name="description" content="Latest insights and research updates from GUS Research Lab." />
      </Helmet>

      <Banner 
        title={selectedPost ? selectedPost.title : "Lab Insights"} 
        subtitle={selectedPost ? `By ${selectedPost.author} • ${new Date(selectedPost.date).toLocaleDateString()}` : "Latest news and thoughts from our researchers"} 
      />

      <div className="container">
        {selectedPost ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="blog-content-wrapper"
          >
            <button 
              className="btn btn-secondary" 
              onClick={() => setSelectedPost(null)}
              style={{ marginBottom: '2rem' }}
            >
              ← Back to Blog
            </button>
            
            <div className="blog-full-content">
              <div className="blog-meta-detailed">
                <span><User size={16} /> {selectedPost.author}</span>
                <span><Calendar size={16} /> {new Date(selectedPost.date).toLocaleDateString()}</span>
                <span><Clock size={16} /> {calculateReadingTime(selectedPost.content)} min read</span>
              </div>
              
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedPost.content}
                </ReactMarkdown>
              </div>

              <div className="blog-tags">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="tag-badge">#{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="blog-card"
                onClick={() => setSelectedPost(post)}
              >
                <div className="blog-card-image">{post.image}</div>
                <div className="blog-card-body">
                  <div className="blog-category">{post.category}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-meta">
                      <span><Clock size={14} /> {calculateReadingTime(post.content)} min read</span>
                    </div>
                    <span className="read-more">
                      Read More <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
