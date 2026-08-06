import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Tag, Calendar, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Banner from '../components/Banner';

const publications = [
  {
    id: 1,
    title: 'Quantum Entanglement in Biological Systems: A Comprehensive Review',
    authors: 'Dr. Sarah Johnson, Dr. Michael Chen, Prof. David Lee',
    journal: 'Nature Quantum Biology',
    year: 2026,
    doi: '10.1038/nqb.2026.001',
    tags: ['Quantum Biology', 'Entanglement', 'Review'],
    abstract: 'This paper reviews recent progress in detecting and characterizing quantum entanglement in biological systems, specifically focusing on avian navigation and photosynthesis.',
    pdfUrl: '#'
  },
  {
    id: 2,
    title: 'Deep Learning Architectures for Climate Prediction',
    authors: 'Dr. Emma Wilson, Alex Kumar',
    journal: 'Journal of Climate Informatics',
    year: 2026,
    doi: '10.1175/jci.2026.042',
    tags: ['AI', 'Climate Science', 'Deep Learning'],
    abstract: 'We propose a novel transformer-based architecture for long-term climate prediction that outperforms existing LSTM and CNN models in both accuracy and computational efficiency.',
    pdfUrl: '#'
  },
  {
    id: 3,
    title: 'Sustainable Energy Storage: Solid-State Battery Innovations',
    authors: 'Dr. Lisa Zhang, Dr. Emma Wilson',
    journal: 'Energy & Environmental Science',
    year: 2025,
    doi: '10.1039/ees.2025.112',
    tags: ['Energy Storage', 'Solid-State', 'Sustainability'],
    abstract: 'A study on the interface stability of solid-state electrolytes and their potential for high-density energy storage in automotive applications.',
    pdfUrl: '#'
  }
];

export default function PublicationsPage() {
  return (
    <div className="publications-page">
      <Helmet>
        <title>Publications | GUS Research Lab</title>
        <meta name="description" content="Academic publications and research papers from GUS Research Lab." />
      </Helmet>

      <Banner 
        title="Scientific Publications" 
        subtitle="Peer-reviewed research contributing to global knowledge" 
      />

      <div className="container">
        <div className="publications-container">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="publication-card-full"
            >
              <div className="pub-icon-wrapper">
                <FileText size={32} />
              </div>
              
              <div className="pub-content">
                <div className="pub-header">
                  <h3>{pub.title}</h3>
                  <div className="pub-actions">
                    <button className="btn-icon" title="Download PDF">
                      <Download size={20} />
                    </button>
                    <button className="btn-icon" title="View Source">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>

                <div className="pub-meta">
                  <span><User size={16} /> {pub.authors}</span>
                  <span><Calendar size={16} /> {pub.year}</span>
                  <span className="pub-journal">{pub.journal}</span>
                </div>

                <p className="pub-abstract">
                  <strong>Abstract:</strong> {pub.abstract}
                </p>

                <div className="pub-footer">
                  <div className="pub-tags">
                    {pub.tags.map(tag => (
                      <span key={tag} className="tag-pill">
                        <Tag size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                  <span className="pub-doi">DOI: {pub.doi}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
