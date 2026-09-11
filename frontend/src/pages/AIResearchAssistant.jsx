import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Database, Zap, User, Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Banner from '../components/Banner';
import { projects } from '../data/projects';

const promptLibrary = [
  { id: 1, title: 'Lab Projects', text: 'What projects has GUS Research Lab built?' },
  { id: 2, title: 'Document Intelligence', text: 'Tell me about the GUS Document Intelligence & OCR project.' },
  { id: 3, title: 'Earthquake Monitoring', text: 'How does QuakeGuard process seismic data?' },
  { id: 4, title: 'StockSignalAI', text: 'What features are in StockSignalAI?' }
];

export default function AIResearchAssistant() {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I am the GUS Research Lab AI Assistant. I can provide details on our deployed experimental projects including Document Intelligence OCR, Kundali Computational Astrology, QuakeGuard Seismic Intelligence, and StockSignalAI.' 
    }
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

    setTimeout(() => {
      setIsTyping(false);
      let responseContent = '';
      let sources = ['GUS Research Lab Portfolio Index'];

      const lowerText = messageText.toLowerCase();

      if (lowerText.includes('project') || lowerText.includes('built') || lowerText.includes('showcase') || lowerText.includes('lab')) {
        responseContent = `GUS Research Lab currently showcases four deployed experimental systems:\n\n` +
          `1. GUS Document Intelligence & OCR — AI-powered document processing, optical character recognition, and structured data extraction.\n` +
          `2. GUS Kundali / Computational Astrology — Software application generating astrological charts and planetary coordinates from birth data.\n` +
          `3. QuakeGuard / Earthquake Intelligence — Seismic activity visualization dashboard for monitoring and analyzing tremor events.\n` +
          `4. StockSignalAI — AI/ML market intelligence workspace analyzing stock data and technical indicators.\n\n` +
          `Each project has an active, live demonstration hosted on Hugging Face Spaces.`;
        sources = ['GUS Project Registry', 'Hugging Face Spaces Deployment Registry'];
      } else if (lowerText.includes('ocr') || lowerText.includes('document')) {
        const p = projects.find(item => item.id === 'document-intelligence');
        responseContent = `GUS Document Intelligence & OCR:\n${p.shortDescription}\n\nKey Capabilities: OCR, text extraction, document understanding, and structured information extraction.\nLive Demo: ${p.liveUrl}`;
        sources = ['Document Intelligence Spec', 'HF Space: pareshmishra-document-intelligence-ocr'];
      } else if (lowerText.includes('earthquake') || lowerText.includes('quake')) {
        const p = projects.find(item => item.id === 'earthquake');
        responseContent = `QuakeGuard / Earthquake Intelligence Dashboard:\n${p.shortDescription}\n\nCapabilities: Event visualization, sensor telemetry, and tremor research. Note: QuakeGuard is an experimental research system and does NOT claim to provide certified earthquake prediction.\nLive Demo: ${p.liveUrl}`;
        sources = ['QuakeGuard Spec', 'HF Space: pareshmishra-earthquake-dashboard'];
      } else if (lowerText.includes('stock') || lowerText.includes('financial')) {
        const p = projects.find(item => item.id === 'stocksignalai');
        responseContent = `StockSignalAI:\n${p.shortDescription}\n\nFocus: Technical indicators, momentum analysis, and market data exploration. Note: Developed strictly for analytical research and does NOT provide financial advice.\nLive Demo: ${p.liveUrl}`;
        sources = ['StockSignalAI Spec', 'HF Space: pareshmishra-stocksignalai'];
      } else if (lowerText.includes('kundali') || lowerText.includes('astrology')) {
        const p = projects.find(item => item.id === 'kundali');
        responseContent = `GUS Kundali / Computational Astrology:\n${p.shortDescription}\n\nFocus: Positional planetary calculations and astrological chart rendering. Presented as a software system without scientific claims of empirical validation.\nLive Demo: ${p.liveUrl}`;
        sources = ['GUS Kundali Spec', 'HF Space: pareshmishra-kundali'];
      } else {
        responseContent = `Based on our research repository, GUS Research Lab develops independent AI, machine learning, and scientific computing systems.\n\n` +
          `Our 4 primary deployed projects are:\n` +
          `- GUS Document Intelligence & OCR\n` +
          `- GUS Kundali Computational Astrology\n` +
          `- QuakeGuard Earthquake Intelligence\n` +
          `- StockSignalAI Financial Analytics\n\n` +
          `Which of these systems would you like to explore further?`;
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseContent,
        sources: sources
      }]);
    }, 1200);
  };

  const usePrompt = (text) => {
    handleSend(null, text);
  };

  return (
    <div className="ai-assistant-page" style={{ background: '#090d16', minHeight: '100vh', color: '#f8fafc' }}>
      <Helmet>
        <title>AI Assistant | GUS Research Lab</title>
        <meta name="description" content="AI Assistant for exploring GUS Research Lab experimental projects and live demonstrations." />
      </Helmet>

      <Banner 
        title="AI Research Assistant" 
        subtitle="Explore project metadata, research specifications, and live demo links" 
      />

      <div className="container" style={{ maxWidth: '1200px', margin: '3rem auto 4rem', padding: '0 1.5rem' }}>
        <div className="ai-layout-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem' }}>
          
          {/* Sidebar */}
          <div className="ai-sidebar">
            <div className="card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem', borderRadius: '16px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.1rem', color: '#fff' }}>
                <Zap size={20} color="#60a5fa" /> Prompt Library
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
                      background: 'rgba(30, 41, 59, 0.5)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                      color: '#cbd5e1',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '600', color: '#60a5fa', marginBottom: '0.25rem' }}>{prompt.title}</div>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prompt.text}</div>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                  <Info size={16} /> System Status
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Project Knowledge Base:</span>
                    <span style={{ color: '#4ade80' }}>Connected (4 Projects)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Live Demos Status:</span>
                    <span style={{ color: '#4ade80' }}>Hugging Face Active</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Lab Positioning:</span>
                    <span style={{ color: '#38bdf8' }}>Independent AI Lab</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Main */}
          <div className="ai-chat-main">
            <div className="card chat-window" style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', height: '650px', display: 'flex', flexDirection: 'column', padding: 0 }}>
              <div className="chat-header" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80' }}></div>
                <span style={{ fontWeight: '700', color: '#fff' }}>GUS Research Lab Assistant</span>
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
                      width: '36px', height: '36px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '50%', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: msg.role === 'user' ? '#4ade80' : '#60a5fa',
                      border: '1px solid rgba(255,255,255,0.08)',
                      flexShrink: 0
                    }}>
                      {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                    </div>
                    <div className="message-bubble" style={{ 
                      background: msg.role === 'user' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                      padding: '1rem 1.25rem', borderRadius: '12px', color: '#e2e8f0', lineHeight: '1.6', fontSize: '0.95rem',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderBottomLeftRadius: msg.role === 'assistant' ? '2px' : '12px',
                      borderBottomRightRadius: msg.role === 'user' ? '2px' : '12px'
                    }}>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                      
                      {msg.sources && (
                        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem' }}>
                          <div style={{ color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600' }}>SOURCES:</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {msg.sources.map((s, idx) => (
                              <span key={idx} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
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
                    <div className="message-icon" style={{ width: '36px', height: '36px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
                      <Bot size={20} />
                    </div>
                    <div className="message-bubble" style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '0.4rem' }}>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }}>●</motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}>●</motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}>●</motion.span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="chat-input-area" style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about GUS Research Lab projects or select from library..."
                  style={{ flex: 1, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.85rem 1.25rem', color: 'white', outline: 'none' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.5rem', borderRadius: '10px', background: '#2563eb' }}>
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
