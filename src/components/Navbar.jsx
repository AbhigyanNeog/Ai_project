import React, { useState } from 'react';
import { Terminal, MessageSquare, Code, BookOpen, Info, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Terminal },
    { id: 'chat', label: 'Coding Chat', icon: MessageSquare },
    { id: 'explainer', label: 'Code Explainer', icon: Code },
    { id: 'topics', label: 'Learning Topics', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Logo */}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-icon-wrapper">
            <Terminal size={20} className="brand-icon" />
          </div>
          <span className="brand-name">Code<span className="text-gradient">Companion</span></span>
        </div>

        {/* Desktop Nav Items */}
        <ul className="navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer">
          <ul className="mobile-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* CSS specific to Navbar */}
      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(11, 15, 25, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          width: 100%;
        }

        .navbar-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .brand-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .brand-icon {
          color: var(--primary);
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.3rem;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navbar-links {
          display: flex;
          list-style: none;
          gap: 8px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }

        .nav-btn:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.04);
        }

        .nav-btn.active {
          color: var(--primary);
          background: rgba(59, 130, 246, 0.1);
          font-weight: 600;
          border: 1px solid rgba(59, 130, 246, 0.15);
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-main);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
        }

        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          padding: 16px;
          animation: slideDown 0.2s ease-out forwards;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
        }

        .mobile-nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 1rem;
          transition: var(--transition-fast);
        }

        .mobile-nav-btn:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-nav-btn.active {
          color: var(--primary);
          background: rgba(59, 130, 246, 0.1);
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
}
