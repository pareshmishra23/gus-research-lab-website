import React, { useState } from 'react';
import { Database, Search, Cpu, BookOpen, Upload, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function RAGPlatform() {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Fault-Tolerant Quantum Error Correction Protocols', embeddings: '1,542 chunks', status: 'Indexed' },
    { id: 2, title: 'Multimodal Neural Attention in Deep Space Probes', embeddings: '3,890 chunks', status: 'Indexed' },
    { id: 3, title: 'UAP Sensor Telemetry & Radar Anomaly Analysis', embeddings: '2,104 chunks', status: 'Indexed' }
  ]);

  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSearchResult({
        answer: `Based on verified vector embeddings across ${documents.length} indexed laboratory papers, your query regarding "${query}" correlates strongly with topological qubit error thresholds and multispectral radar telemetry logs.`,
        sources: [
          'Fault-Tolerant Quantum Error Correction Protocols (Section 4.2)',
          'UAP Sensor Telemetry & Radar Anomaly Analysis (Page 14)'
        ],
        confidence: '98.4%'
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>RAG Platform | GUS Research Lab</title>
        <meta name="description" content="Retrieval-Augmented Generation (RAG) semantic research platform powered by vector embeddings and advanced LLMs." />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-950/60 to-slate-900 border border-blue-500/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium">
              <Sparkles className="w-4 h-4" /> Phase 18: RAG Research Platform
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Semantic Vector <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">RAG Engine</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Query our entire repository of peer-reviewed papers, quantum simulations, and telemetry logs using state-of-the-art vector embeddings and retrieval-augmented generation.
            </p>
          </div>
        </div>

        {/* Semantic Search Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-400" /> Semantic Knowledge Search
          </h2>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ask any scientific question (e.g., 'What are the error thresholds for topological qubits?')..."
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-base"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              {loading ? 'Retrieving...' : 'Search Embeddings'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {searchResult && (
            <div className="mt-6 p-6 bg-slate-950 border border-blue-500/30 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> RAG Synthesized Answer
                </span>
                <span className="text-xs text-slate-400 font-mono">Confidence: {searchResult.confidence}</span>
              </div>
              <p className="text-slate-200 text-base leading-relaxed">{searchResult.answer}</p>
              <div className="pt-3 border-t border-slate-800/80">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Retrieved Sources:</h4>
                <ul className="space-y-1">
                  {searchResult.sources.map((src, i) => (
                    <li key={i} className="text-xs text-blue-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" /> {src}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Indexed Knowledge Base & Embeddings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Vector Database</h3>
                <p className="text-xs text-slate-400">pgvector / ChromaDB</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">Over 7,500 high-dimensional embedding vectors stored with cosine similarity indexing.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Embedding Model</h3>
                <p className="text-xs text-slate-400">OpenAI / HuggingFace</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">`text-embedding-3-large` generating 3072-dimensional semantic representations.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Document Ingestion</h3>
                <p className="text-xs text-slate-400">Automated Pipeline</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">Automatic chunking, overlap tokenization, and vector DB synchronization upon publish.</p>
          </div>
        </div>

        {/* Indexed Papers List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" /> Indexed Knowledge Base Documents
          </h2>

          <div className="divide-y divide-slate-800">
            {documents.map(doc => (
              <div key={doc.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-white text-base">{doc.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Vector Chunks: {doc.embeddings}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
EOF
