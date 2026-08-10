import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Database, Cpu, Search, Sparkles, BookOpen, User, ChevronRight, Info, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Banner from '../components/Banner';

const promptLibrary = [
  { id: 1, title: 'Summarize Findings', text: 'Summarize the key findings from the recent quantum entanglement papers.' },
  { id: 2, title: 'Methodology Review', text: 'Compare the methodologies used in our climate prediction projects.' },
  { id: 3, title: 'Extract Data', text: 'Extract all statistical data related to solid-state battery efficiency.' },
  { id: 4, title: 'Research Gaps', text: 'Identify potential research gaps in our current biotechnology portfolio.' }
];

export default function AIResearchAssistant() {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am the GUS AI Research Assistant. I have access to the entire lab database. How can I assist your research today?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e, text = null) => {
    if (e) e.preventDefault();
    const messageText = text || query;
    if (!messageText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setQuery('');
    setIsTyping(true);
    
    // Simulate RAG + LLM response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Based on our internal research database (Querying: ${messageText.substring(0, 20)}...), I've analyzed 4 relevant papers and 2 active projects. 

Key Analysis:
- Found correlation between qubit stability and cryogenic temperature fluctuations.
- Recommended methodology: Adaptive Error Correction (AEC).
- Data source: "Quantum Systems Lab Report 2026-Q3".

Would you like me to generate a detailed summary or extract the raw data tables?`,
        sources: ['Quantum Systems Lab Report 2026-Q3', 'AEC Methodology Review', 'Qubit Stability Data']
      }]);
    }, 2000);
  };

  const usePrompt = (text) => {
    handleSend(null, text);
  };

  return (
    <div className="ai-assistant-page">
      <Helmet>
        <title>AI Research Assistant | GUS LAB</title>
        <meta name="description" content="AI-powered research assistant for GUS Research Lab." />
      </Helmet>

      <Banner 
        title="AI Research Assistant" 
        subtitle="Intelligent discovery through RAG-powered scientific analysis" 
      />

      <div className="container" style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <div className="ai-layout-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem' }}>
          
          {/* Sidebar */}
          <div className="ai-sidebar">
            <div className="card" style={{ background: '#162447', border: '1px solid #1a3a70', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                <Zap size={20} color="#4a7bba" /> Prompt Library
              </h3>
              <div className="prompt-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {promptLibrary.map(prompt => (
                  <button 
                    key={prompt.id} 
                    className="prompt-item"
                    onClick={() => usePrompt(prompt.text)}
                    style={{ 
                      textAlign: 'left', 
                      padding: '0.75rem', 
                      background: 'rgba(74, 123, 186, 0.05)', 
                      border: '1px solid rgba(74, 123, 186, 0.1)',
                      borderRadius: '8px',
                      color: '#a0aec0',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '600', color: '#4a7bba', marginBottom: '0.25rem' }}>{prompt.title}</div>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prompt.text}</div>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#a0aec0' }}>
                  <Info size={16} /> System Status
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#657786' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Knowledge Base:</span>
                    <span style={{ color: '#51cf66' }}>Connected</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Vector DB:</span>
                    <span style={{ color: '#51cf66' }}>Active</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>LLM Engine:</span>
                    <span>GPT-4o</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Main */}
          <div className="ai-chat-main">
            <div className="card chat-window" style={{ background: '#162447', border: '1px solid #1a3a70', borderRadius: '12px', height: '650px', display: 'flex', flexDirection: 'column', padding: 0 }}>
              <div className="chat-header" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1a3a70', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '10px', height: '10px', background: '#51cf66', borderRadius: '50%' }}></div>
                <span style={{ fontWeight: '600' }}>Scientific RAG Assistant</span>
              </div>
              
              <div className="chat-messages" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`message ${msg.role}`}
                    style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      maxWidth: '85%',
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                    }}
                  >
                    <div className="message-icon" style={{ 
                      width: '36px', height: '36px', background: '#0a1128', borderRadius: '50%', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: msg.role === 'user' ? '#51cf66' : '#4a7bba',
                      flexShrink: 0
                    }}>
                      {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                    </div>
                    <div className="message-bubble" style={{ 
                      background: msg.role === 'user' ? 'rgba(74, 123, 186, 0.1)' : '#0a1128',
                      padding: '1rem', borderRadius: '12px', color: '#e1e8ed', lineHeight: '1.6', fontSize: '0.95rem',
                      borderBottomLeftRadius: msg.role === 'assistant' ? '2px' : '12px',
                      borderBottomRightRadius: msg.role === 'user' ? '2px' : '12px'
                    }}>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                      
                      {msg.sources && (
                        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
                          <div style={{ color: '#657786', marginBottom: '0.5rem', fontWeight: '600' }}>SOURCES:</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {msg.sources.map((s, idx) => (
                              <span key={idx} style={{ background: 'rgba(74, 123, 186, 0.1)', color: '#4a7bba', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                <Database size={10} style={{ marginRight: '0.3rem' }} /> {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="message assistant" style={{ display: 'flex', gap: '1rem' }}>
                    <div className="message-icon" style={{ width: '36px', height: '36px', background: '#0a1128', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a7bba' }}>
                      <Bot size={20} />
                    </div>
                    <div className="message-bubble" style={{ background: '#0a1128', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '0.4rem' }}>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }}>●</motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}>●</motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}>●</motion.span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="chat-input-area" style={{ padding: '1.5rem', borderTop: '1px solid #1a3a70', display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe your research query or select from library..."
                  style={{ flex: 1, background: '#0a1128', border: '1px solid #1a3a70', borderRadius: '8px', padding: '0.85rem 1.25rem', color: 'white', outline: 'none' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.5rem', borderRadius: '8px' }}>
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
