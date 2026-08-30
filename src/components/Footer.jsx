import React from 'react';
import { Terminal, Heart } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo" onClick={() => handleNavClick('home')}>
            <Terminal size={16} className="logo-icon" />
            <span>CodeCompanion</span>
          </div>
          <p className="footer-tagline">Your friendly guide through loops, variables, and error messages.</p>
        </div>
        
        <div className="footer-links-group">
          <button onClick={() => handleNavClick('home')} className="footer-link">Dashboard</button>
          <button onClick={() => handleNavClick('chat')} className="footer-link">Coding Chat</button>
          <button onClick={() => handleNavClick('explainer')} className="footer-link">Code Explainer</button>
          <button onClick={() => handleNavClick('topics')} className="footer-link">Topics</button>
          <button onClick={() => handleNavClick('about')} className="footer-link">Documentation & Workflow</button>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Friendly Code Companion. Prototype for educational demonstration.</p>
        <p className="footer-credit">
          Made with <Heart size={12} className="heart-icon" /> for programming beginners
        </p>
      </div>

      <style>{`
        .footer-container {
          background: rgba(17, 24, 39, 0.4);
          border-top: 1px solid var(--border-color);
          padding: 40px 16px 20px 16px;
          margin-top: auto;
          width: 100%;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 60px;
          margin-bottom: 30px;
        }

        .footer-left {
          flex: 1;
          min-width: 250px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-main);
          margin-bottom: 12px;
          cursor: pointer;
        }

        .logo-icon {
          color: var(--primary);
        }

        .footer-tagline {
          font-size: 0.85rem;
          color: var(--text-muted);
          max-width: 320px;
        }

        .footer-links-group {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          align-items: center;
        }

        .footer-link {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--primary);
          text-decoration: underline;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .footer-credit {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .heart-icon {
          color: var(--accent-rose);
          fill: var(--accent-rose);
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 24px;
          }
          .footer-links-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
