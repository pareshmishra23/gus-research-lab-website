import React, { useState } from 'react';
import { FileText, Plus, Edit3, Trash2, Calendar, User, Tag, Eye, Save, CheckCircle, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function ResearchCMS() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Quantum Advantage in Lattice Cryptography',
      category: 'Quantum Computing',
      status: 'Published',
      author: 'Dr. Evelyn Vance',
      scheduledDate: '2026-05-14',
      version: 'v1.2',
      tags: ['Quantum', 'Cryptography', 'Lattice']
    },
    {
      id: 2,
      title: 'Multimodal Attention in Deep Space Telemetry',
      category: 'Artificial Intelligence',
      status: 'Review',
      author: 'Dr. Marcus Sterling',
      scheduledDate: '2026-08-15',
      version: 'v0.9',
      tags: ['AI', 'Telemetry', 'Space']
    },
    {
      id: 3,
      title: 'Multispectral Radar Anomalies in UAP Encounters',
      category: 'UAP Research',
      status: 'Draft',
      author: 'Commander Sarah Connor',
      scheduledDate: '2026-09-01',
      version: 'v0.1',
      tags: ['UAP', 'Radar', 'Physics']
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({
    title: '',
    category: 'Quantum Computing',
    status: 'Draft',
    author: '',
    content: '',
    tags: '',
    scheduledDate: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (currentArticle.id) {
      setArticles(articles.map(a => a.id === currentArticle.id ? currentArticle : a));
    } else {
      setArticles([...articles, { ...currentArticle, id: Date.now(), version: 'v1.0' }]);
    }
    setIsEditing(false);
    setCurrentArticle({ title: '', category: 'Quantum Computing', status: 'Draft', author: '', content: '', tags: '', scheduledDate: '' });
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Research CMS | GUS Research Lab Admin</title>
      </Helmet>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Research Content Management System</h1>
          <p className="text-slate-400 text-sm mt-1">Manage rich-text research articles, editorial workflows, and scheduled publishing.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(true); setCurrentArticle({ title: '', category: 'Quantum Computing', status: 'Draft', author: '', content: '', tags: '', scheduledDate: '' }); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition shadow-lg shadow-blue-600/30"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
            {currentArticle.id ? 'Edit Research Article' : 'Create Research Article'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Article Title</label>
              <input 
                type="text" 
                required
                value={currentArticle.title}
                onChange={e => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select 
                value={currentArticle.category}
                onChange={e => setCurrentArticle({ ...currentArticle, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Quantum Computing">Quantum Computing</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="UAP Research">UAP Research</option>
                <option value="Space Science">Space Science</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Workflow Status</label>
              <select 
                value={currentArticle.status}
                onChange={e => setCurrentArticle({ ...currentArticle, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Review">In Review</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Author Profile</label>
              <input 
                type="text" 
                required
                value={currentArticle.author}
                onChange={e => setCurrentArticle({ ...currentArticle, author: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                placeholder="Dr. Author Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Scheduled Publishing Date</label>
              <input 
                type="date" 
                value={currentArticle.scheduledDate}
                onChange={e => setCurrentArticle({ ...currentArticle, scheduledDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Rich Text / Markdown Content</label>
            <textarea 
              rows={8}
              value={currentArticle.content}
              onChange={e => setCurrentArticle({ ...currentArticle, content: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              placeholder="# Abstract&#10;&#10;Write markdown content here..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition shadow-lg shadow-blue-600/30"
            >
              <Save className="w-4 h-4" /> Save Article
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-slate-950/50">
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Scheduled Date</th>
                  <th className="p-4">Version</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-semibold text-white">{article.title}</td>
                    <td className="p-4 text-slate-300">{article.category}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        article.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        article.status === 'Review' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {article.status === 'Published' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {article.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{article.author}</td>
                    <td className="p-4 text-slate-400">{article.scheduledDate || 'Immediate'}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-mono">{article.version}</span></td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => { setCurrentArticle(article); setIsEditing(true); }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setArticles(articles.filter(a => a.id !== article.id))}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
EOF
