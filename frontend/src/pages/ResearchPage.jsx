import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import Banner from '../components/Banner';

const researchData = [
  {
    id: 1,
    title: 'Quantum Computing Applications',
    category: 'Quantum Computing',
    tags: ['quantum', 'computing', 'algorithms'],
    description: 'Exploring quantum algorithms for solving complex optimization problems.',
    content: '# Quantum Computing Applications\n\nThis research explores...',
    author: 'Dr. Sarah Johnson',
    date: '2026-08-01',
  },
  {
    id: 2,
    title: 'Sustainable Energy Solutions',
    category: 'Energy',
    tags: ['renewable', 'energy', 'sustainability'],
    description: 'Developing next-generation renewable energy technologies.',
    content: '# Sustainable Energy Solutions\n\nOur team is developing...',
    author: 'Dr. Emma Wilson',
    date: '2026-07-15',
  },
  {
    id: 3,
    title: 'AI-Driven Medical Diagnostics',
    category: 'AI & Healthcare',
    tags: ['ai', 'healthcare', 'machine-learning'],
    description: 'Machine learning models for early disease detection.',
    content: '# AI-Driven Medical Diagnostics\n\nWe present novel approaches...',
    author: 'Dr. Michael Chen',
    date: '2026-07-01',
  },
  {
    id: 4,
    title: 'Climate Change Modeling',
    category: 'Climate Science',
    tags: ['climate', 'modeling', 'data-science'],
    description: 'Advanced climate prediction using deep learning.',
    content: '# Climate Change Modeling\n\nOur research focuses on...',
    author: 'Prof. David Lee',
    date: '2026-06-20',
  },
  {
    id: 5,
    title: 'Protein Folding Techniques',
    category: 'Biochemistry',
    tags: ['proteins', 'biochemistry', 'structure'],
    description: 'Novel approaches to protein structure prediction.',
    content: '# Protein Folding Techniques\n\nThis paper presents...',
    author: 'Dr. Lisa Zhang',
    date: '2026-06-10',
  },
  {
    id: 6,
    title: 'Neural Network Optimization',
    category: 'AI & Machine Learning',
    tags: ['neural-networks', 'optimization', 'deep-learning'],
    description: 'Efficient training methods for large-scale neural networks.',
    content: '# Neural Network Optimization\n\nWe propose new methods...',
    author: 'Dr. Alex Kumar',
    date: '2026-05-28',
  },
];

const ITEMS_PER_PAGE = 3;

export default function ResearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResearch, setSelectedResearch] = useState(null);

  const categories = [...new Set(researchData.map((r) => r.category))];
  const allTags = [...new Set(researchData.flatMap((r) => r.tags))];

  const filteredResearch = useMemo(() => {
    return researchData.filter((research) => {
      const matchesSearch =
        research.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        research.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || research.category === selectedCategory;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => research.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchTerm, selectedCategory, selectedTags]);

  const totalPages = Math.ceil(filteredResearch.length / ITEMS_PER_PAGE);
  const paginatedResearch = filteredResearch.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  return (
    <div>
      <Banner title="Research" subtitle="Explore our latest research and publications" />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem', marginTop: '2rem' }}>
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="research-sidebar"
          >
            {/* Search */}
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search research..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="filter-section">
              <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1rem' }}>
                <Filter size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Categories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ cursor: 'pointer', color: '#a0aec0' }}>
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  {' '}All Categories
                </label>
                {categories.map((cat) => (
                  <label key={cat} style={{ cursor: 'pointer', color: '#a0aec0' }}>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                    {' '}{cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div className="filter-section">
              <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1rem' }}>
                <Tag size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Tags
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      border: selectedTags.includes(tag)
                        ? '1px solid #4a7bba'
                        : '1px solid #3d5a8c',
                      backgroundColor: selectedTags.includes(tag)
                        ? 'rgba(74, 123, 186, 0.2)'
                        : 'transparent',
                      color: selectedTags.includes(tag) ? '#4a7bba' : '#a0aec0',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div>
            {/* Results Count */}
            <p style={{ color: '#a0aec0', marginBottom: '2rem' }}>
              Showing {paginatedResearch.length} of {filteredResearch.length} results
            </p>

            {/* Research Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {paginatedResearch.map((research, index) => (
                <motion.div
                  key={research.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="research-item"
                  onClick={() => setSelectedResearch(research)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{research.title}</h3>
                  <p style={{ color: '#a0aec0', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    {research.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#4a7bba' }}>
                      📁 {research.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#4a7bba' }}>
                      ✍️ {research.author}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#4a7bba' }}>
                      📅 {new Date(research.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {research.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.3rem 0.6rem',
                          backgroundColor: 'rgba(74, 123, 186, 0.1)',
                          color: '#4a7bba',
                          borderRadius: '3px',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: currentPage === 1 ? '#3d5a8c' : '#2d5a9e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: currentPage === page ? '#4a7bba' : '#2d5a9e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: currentPage === page ? 'bold' : 'normal',
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: currentPage === totalPages ? '#3d5a8c' : '#2d5a9e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
