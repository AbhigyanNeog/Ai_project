import React from 'react';
import { ArrowRight, MessageSquare, Code, BookOpen, Sparkles, Terminal } from 'lucide-react';
import TopicCard from '../components/TopicCard';
import { topicsData } from '../data/demoResponses';

export default function Home({ setCurrentPage, setSelectedTopicId }) {
  const handleTopicClick = (topicId) => {
    setSelectedTopicId(topicId);
    setCurrentPage('topics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section glass-panel">
        <div className="hero-badge">
          <Sparkles size={14} className="badge-icon" />
          <span>Interactive Coding Companion</span>
        </div>
        
        <h1 className="hero-title">
          Your Friendly <br />
          <span className="gradient-text">Code Companion</span>
        </h1>
        
        <p className="hero-tagline">“Learn. Code. Debug. Understand.”</p>
        <p className="hero-desc">
          Struggling with syntax, loops, or complex errors? Code Companion gives you simple, 
          jargon-free explanations, debugging guidance, and interactive exercises to help you master programming.
        </p>

        <div className="hero-ctas">
          <button onClick={() => setCurrentPage('topics')} className="btn btn-primary">
            <BookOpen size={18} />
            <span>Start Learning</span>
          </button>
          <button onClick={() => setCurrentPage('chat')} className="btn btn-secondary">
            <MessageSquare size={18} />
            <span>Ask a Question</span>
          </button>
        </div>
      </section>

      {/* Feature Quick Actions */}
      <section className="features-section">
        <h2 className="section-title">Try Interactive Tools</h2>
        <div className="grid-2">
          {/* Card 1: Coding Chat */}
          <div onClick={() => setCurrentPage('chat')} className="feature-card glass-panel glass-card-interactive">
            <div className="feature-icon-wrapper blue-glow">
              <MessageSquare size={24} className="feature-icon" />
            </div>
            <h3 className="feature-card-title">Coding Chatbot</h3>
            <p className="feature-card-desc">
              Have a programming question? Ask our friendly assistant for clear answers, concept analogies, and example code.
            </p>
            <div className="feature-card-link">
              <span>Chat Now</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 2: Code Explainer */}
          <div onClick={() => setCurrentPage('explainer')} className="feature-card glass-panel glass-card-interactive animate-card">
            <div className="feature-icon-wrapper purple-glow">
              <Code size={24} className="feature-icon" />
            </div>
            <h3 className="feature-card-title">Code Explainer & Debugger</h3>
            <p className="feature-card-desc">
              Paste your buggy or confusing code. Our tool will explain how it works, highlight errors, and offer suggestions to simplify it.
            </p>
            <div className="feature-card-link">
              <span>Explain Code</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* Learning Topics Grid */}
      <section className="topics-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Beginner Learning Topics</h2>
            <p className="section-subtitle">Select a core concept to explore definitions, analogies, and code examples.</p>
          </div>
          <button onClick={() => setCurrentPage('topics')} className="btn btn-secondary btn-sm">
            <span>View All Topics</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="topics-grid">
          {topicsData.map((topic) => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              onClick={() => handleTopicClick(topic.id)} 
            />
          ))}
        </div>
      </section>

      <style>{`
        .home-container {
          display: flex;
          flex-direction: column;
          gap: 64px;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Hero styling */
        .hero-section {
          padding: 60px 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          background: radial-gradient(circle at top, rgba(99, 102, 241, 0.08) 0%, rgba(17, 24, 39, 0.45) 100%);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 6px 12px;
          border-radius: 99px;
          font-size: 0.8rem;
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 24px;
          font-family: var(--font-sans);
        }

        .badge-icon {
          color: var(--primary);
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          margin-bottom: 16px;
          font-family: var(--font-heading);
          letter-spacing: -0.03em;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-tagline {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 16px;
        }

        .hero-desc {
          max-width: 680px;
          font-size: 1.05rem;
          color: var(--text-muted);
          margin-bottom: 36px;
          line-height: 1.6;
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-ctas {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
          }
        }

        /* Features Section */
        .section-title {
          font-size: 1.8rem;
          font-family: var(--font-heading);
          font-weight: 700;
          margin-bottom: 24px;
        }

        .feature-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .feature-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          margin-bottom: 20px;
        }

        .blue-glow {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.25);
          color: var(--primary);
        }

        .purple-glow {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.25);
          color: var(--secondary);
        }

        .feature-card-title {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }

        .feature-card-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .feature-card-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-main);
          margin-top: auto;
          transition: var(--transition-fast);
        }

        .feature-card:hover .feature-card-link {
          gap: 10px;
          color: var(--primary);
        }

        /* Topics Section */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.85rem;
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        @media (max-width: 640px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .topics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
