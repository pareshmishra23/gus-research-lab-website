import React, { useState } from 'react';
import { Play, Youtube, Eye, ThumbsUp, Calendar, Filter, Search, Sparkles, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const categories = ['All', 'Quantum Computing', 'Artificial Intelligence', 'UAP Research', 'Space Science', 'Keynotes'];

  const channelStats = {
    subscribers: '142K',
    totalViews: '8.4M',
    videosCount: '128',
    researchHours: '1,200+'
  };

  const playlists = [
    {
      id: 1,
      title: 'Quantum Mechanics & Qubits',
      count: '14 Videos',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
      description: 'Deep dive into error correction, topological qubits, and quantum supremacy benchmarks.'
    },
    {
      id: 2,
      title: 'Advanced AI & Neural Architectures',
      count: '28 Videos',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600',
      description: 'Transformer models, recursive reasoning, multimodal embeddings, and cognitive simulation.'
    },
    {
      id: 3,
      title: 'UAP Empirical & Sensor Analysis',
      count: '18 Videos',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
      description: 'Multispectral sensor telemetry, radar anomaly logs, and aerospace physics.'
    }
  ];

  const videos = [
    {
      id: 'v1',
      title: 'Quantum Advantage in Fault-Tolerant Lattice Cryptography',
      category: 'Quantum Computing',
      duration: '45:12',
      views: '124K',
      date: 'May 14, 2026',
      youtubeId: 'dQw4w9WgXcQ', // Placeholder
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
      description: 'Dr. Evelyn Vance presents our latest breakthrough in fault-tolerant quantum lattice structures.'
    },
    {
      id: 'v2',
      title: 'Multimodal Neural Networks for Deep Space Telemetry Interpretation',
      category: 'Artificial Intelligence',
      duration: '38:40',
      views: '98K',
      date: 'April 29, 2026',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
      description: 'How real-time attention mechanisms process deep space probe signals with zero latency.'
    },
    {
      id: 'v3',
      title: 'Multispectral Sensor Analysis of Anomalous Aerial Phenomena',
      category: 'UAP Research',
      duration: '52:15',
      views: '310K',
      date: 'April 10, 2026',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      description: 'Rigorous peer-reviewed evaluation of infrared and radar anomaly logs collected across 2025.'
    },
    {
      id: 'v4',
      title: 'Dark Matter Halos and Gravitational Lensing Simulation',
      category: 'Space Science',
      duration: '31:50',
      views: '76K',
      date: 'March 22, 2026',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=800',
      description: 'Supercomputer modeling of galactic rotation curves and dark matter distribution.'
    },
    {
      id: 'v5',
      title: 'Annual GUS Research Lab Scientific Keynote 2026',
      category: 'Keynotes',
      duration: '1:18:20',
      views: '215K',
      date: 'March 01, 2026',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      description: 'Full keynote address covering our roadmap across AI, quantum hardware, and space exploration.'
    },
    {
      id: 'v6',
      title: 'Topological Qubits: Overcoming Decoherence Bottlenecks',
      category: 'Quantum Computing',
      duration: '29:45',
      views: '64K',
      date: 'February 15, 2026',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
      description: 'An in-depth technical seminar on Majorana zero modes and protected entanglement.'
    }
  ];

  const filteredVideos = videos.filter(v => {
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Videos & Media | GUS Research Lab</title>
        <meta name="description" content="Watch cutting-edge research seminars, keynotes, and documentary breakdowns from GUS Research Lab." />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header & Channel Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/40 via-indigo-950/60 to-slate-900 border border-blue-500/20 p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium">
                <Youtube className="w-4 h-4" /> Official YouTube Channel
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                GUS Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Lab Media</span>
              </h1>
              <p className="text-slate-300 text-lg">
                Explore peer-reviewed seminars, quantum computing breakdowns, AI architecture deep dives, and rigorous UAP telemetry telemetry reviews.
              </p>
            </div>
            
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition shadow-lg shadow-red-600/30"
            >
              <Youtube className="w-5 h-5" /> Subscribe on YouTube <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Channel Statistics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800">
            <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-bold text-white">{channelStats.subscribers}</div>
              <div className="text-sm text-slate-400 mt-1">Subscribers</div>
            </div>
            <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-bold text-white">{channelStats.totalViews}</div>
              <div className="text-sm text-slate-400 mt-1">Total Views</div>
            </div>
            <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-bold text-white">{channelStats.videosCount}</div>
              <div className="text-sm text-slate-400 mt-1">Published Seminars</div>
            </div>
            <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-bold text-white">{channelStats.researchHours}</div>
              <div className="text-sm text-slate-400 mt-1">Recorded Hours</div>
            </div>
          </div>
        </div>

        {/* Featured Playlists */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-400" /> Featured Playlists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playlists.map(playlist => (
              <div key={playlist.id} className="group bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/40 transition shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img src={playlist.thumbnail} alt={playlist.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs font-medium text-slate-200">
                    {playlist.count}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">{playlist.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2">{playlist.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Gallery Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-red-500" /> Latest Research Seminars
            </h2>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="group bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/40 transition shadow-xl flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-xs font-semibold text-slate-200">
                    {video.duration}
                  </span>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-blue-600/80 backdrop-blur-md text-xs font-medium text-white">
                    {video.category}
                  </span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition line-clamp-2">{video.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{video.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800/80">
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {video.views} views</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {video.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
              <Youtube className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">No videos found</h3>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your search query or category filter.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
EOF
