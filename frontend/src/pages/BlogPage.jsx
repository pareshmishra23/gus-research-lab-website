import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, Tag, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Banner from '../components/Banner';

const staticPosts = [
  {
    id: 101,
    title: 'The Future of Quantum Computing in 2026',
    excerpt: 'Exploring the latest breakthroughs in quantum supremacy and their practical applications.',
    content: `# The Future of Quantum Computing in 2026\n\nQuantum computing has reached a pivotal moment.`,
    author: 'Dr. Sarah Johnson',
    date: '2026-08-05',
    category: 'Quantum Computing',
    tags: ['Quantum', 'Technology', 'Future'],
    image: '🌌'
  }
];

const calculateReadingTime = (text) => {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/articles');
      setPosts([...res.data, ...staticPosts]);
      setError('');
    } catch (err) {
      console.error('Error fetching posts:', err);
      setPosts(staticPosts);
      // We don't show error here to keep the fallback clean
    } finally {
      setLoading(false);
    }
  };

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

      <div className="container" style={{ marginTop: '3rem', marginBottom: '5rem' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
            <Loader2 size={40} className="animate-spin text-accent-blue" />
          </div>
        ) : selectedPost ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="blog-content-wrapper"
          >
            <button 
              className="btn btn-secondary" 
              onClick={() => setSelectedPost(null)}
              style={{ marginBottom: '2rem' }}
            >
              ← Back to Blog
            </button>
            
            <div className="card" style={{ padding: '3rem', background: '#162447', border: '1px solid #1a3a70', borderRadius: '16px' }}>
              <div className="blog-meta-detailed" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', color: '#a0aec0', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {selectedPost.author}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {new Date(selectedPost.date).toLocaleDateString()}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {calculateReadingTime(selectedPost.content)} min read</span>
              </div>
              
              <div className="markdown-body" style={{ color: '#e1e8ed', lineHeight: '1.8' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedPost.content}
                </ReactMarkdown>
              </div>

              <div className="blog-tags" style={{ marginTop: '3rem', display: 'flex', gap: '0.75rem' }}>
                {selectedPost.tags && Array.isArray(selectedPost.tags) && selectedPost.tags.map(tag => (
                  <span key={tag} className="tag-pill" style={{ background: 'rgba(74, 123, 186, 0.1)', color: '#4a7bba', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>#{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="blog-card"
                onClick={() => setSelectedPost(post)}
                style={{ cursor: 'pointer', background: '#162447', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1a3a70', transition: 'all 0.3s' }}
              >
                <div className="blog-card-image" style={{ height: '200px', background: 'linear-gradient(45deg, #0a1128, #1a3a70)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  {post.image || '📄'}
                </div>
                <div className="blog-card-body" style={{ padding: '1.5rem' }}>
                  <div className="blog-category" style={{ color: '#4a7bba', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{post.category}</div>
                  <h3 style={{ color: 'white', marginBottom: '1rem' }}>{post.title}</h3>
                  <p style={{ color: '#a0aec0', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{post.excerpt}</p>
                  <div className="blog-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="blog-meta" style={{ color: '#657786', fontSize: '0.85rem' }}>
                      <span><Clock size={14} /> {calculateReadingTime(post.content)} min read</span>
                    </div>
                    <span className="read-more" style={{ color: '#4a7bba', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
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
