import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Database, Cpu, Search, Sparkles, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Banner from '../components/Banner';

export default function AIResearchAssistant() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am the GUS AI Research Assistant. How can I help you with your scientific inquiries today?' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages([...messages, { role: 'user', content: query }]);
    setQuery('');
    
    // Simulate AI response for foundation phase
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'This is a simulated response. The AI Research Assistant architecture (RAG + LLM) is currently being initialized. In the future, I will be able to query our internal vector database of research papers.' 
      }]);
    }, 1000);
  };

  return (
    <div className="ai-assistant-page">
      <Helmet>
        <title>AI Assistant | GUS Research Lab</title>
        <meta name="description" content="AI-powered research assistant for GUS Research Lab." />
      </Helmet>

      <Banner 
        title="AI Research Assistant" 
        subtitle="Harnessing advanced LLMs and RAG for scientific discovery" 
      />

      <div className="container">
        <div className="ai-architecture-grid">
          {/* Architecture Overview */}
          <div className="ai-sidebar-info">
            <div className="card">
              <h3><Database size={20} /> RAG Architecture</h3>
              <p>Our Retrieval-Augmented Generation system connects LLMs to our curated scientific database.</p>
              
              <div className="tech-stack">
                <div className="tech-item"><Cpu size={16} /> LLM: GPT-4o / Claude 3.5</div>
                <div className="tech-item"><Database size={16} /> Vector DB: Pinecone / Weaviate</div>
                <div className="tech-item"><Search size={16} /> Semantic Search: Hybrid Search</div>
              </div>

              <div className="prompt-library" style={{ marginTop: '2rem' }}>
                <h4><BookOpen size={18} /> Prompt Library</h4>
                <ul>
                  <li>Summarize research paper</li>
                  <li>Compare methodology</li>
                  <li>Extract key findings</li>
                  <li>Identify research gaps</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="ai-chat-container">
            <div className="chat-window card">
              <div className="chat-messages">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`message ${msg.role}`}
                  >
                    <div className="message-icon">
                      {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                    </div>
                    <div className="message-content">
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              <form onSubmit={handleSend} className="chat-input-area">
                <input 
                  type="text" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a research question..."
                />
                <button type="submit" className="btn btn-primary">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
