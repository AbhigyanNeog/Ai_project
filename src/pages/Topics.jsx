import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { topicsData } from '../data/demoResponses';

export default function Topics({ selectedTopicId, setSelectedTopicId }) {
  // Use state matching or fallback to first topic
  const activeTopic = topicsData.find(t => t.id === selectedTopicId) || topicsData[0];
  const [copied, setCopied] = useState(false);

  const selectTopic = (id) => {
    setSelectedTopicId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get active icon
  const ActiveIcon = Icons[activeTopic.icon] || Icons.BookOpen;

  return (
    <div className="topics-page-container">
      {/* Page Header */}
      <div className="topics-page-header">
        <h1 className="topics-title">Beginner Learning Topics</h1>
        <p className="topics-subtitle">Expand your programming fundamentals with crystal clear definitions and practical examples.</p>
      </div>

      {/* Main Split Layout */}
      <div className="topics-layout">
        {/* Sidebar Topics List */}
        <aside className="topics-sidebar glass-panel">
          <h3 className="sidebar-heading">Concepts</h3>
          <ul className="sidebar-menu">
            {topicsData.map((topic) => {
              const TopicIcon = Icons[topic.icon] || Icons.BookOpen;
              const isSelected = activeTopic.id === topic.id;
              
              return (
                <li key={topic.id}>
                  <button
                    onClick={() => selectTopic(topic.id)}
                    className={`sidebar-item ${isSelected ? 'active' : ''}`}
                    style={{ '--item-accent': topic.color }}
                  >
                    <div className="sidebar-icon-wrapper" style={{ backgroundColor: isSelected ? `${topic.color}15` : 'transparent' }}>
                      <TopicIcon size={16} style={{ color: isSelected ? topic.color : 'var(--text-muted)' }} />
                    </div>
                    <div className="sidebar-item-text">
                      <span className="sidebar-item-title">{topic.title}</span>
                      <span className="sidebar-item-desc">{topic.description}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Detailed Topic Study Guide */}
        <main className="topic-content-pane glass-panel">
          {/* Header */}
          <div className="topic-content-header" style={{ borderBottomColor: `${activeTopic.color}20` }}>
            <div className="topic-icon-banner" style={{ backgroundColor: `${activeTopic.color}15`, borderColor: `${activeTopic.color}30` }}>
              <ActiveIcon size={28} style={{ color: activeTopic.color }} />
            </div>
            <div>
              <h2 className="active-topic-title">{activeTopic.title}</h2>
              <p className="active-topic-desc">{activeTopic.description}</p>
            </div>
          </div>

          {/* Body content */}
          <div className="topic-content-body">
            {/* Summary */}
            <div className="content-section">
              <h3 className="content-section-title">Core Concept</h3>
              <p className="text-content">{activeTopic.summary}</p>
            </div>

            {/* Analogy */}
            <div className="content-section analogy-box" style={{ borderColor: `${activeTopic.color}30`, background: `${activeTopic.color}05` }}>
              <div className="analogy-header">
                <Icons.Lightbulb size={18} style={{ color: activeTopic.color }} />
                <h4 style={{ color: activeTopic.color }}>Real-world Analogy</h4>
              </div>
              <p className="analogy-text">{activeTopic.analogy}</p>
            </div>

            {/* Subconcepts Grid */}
            <div className="content-section">
              <h3 className="content-section-title">Key Elements</h3>
              <div className="subconcepts-list">
                {activeTopic.concepts.map((concept, index) => (
                  <div key={index} className="subconcept-item">
                    <div className="subconcept-bullet" style={{ backgroundColor: activeTopic.color }}></div>
                    <div>
                      <strong className="subconcept-name">{concept.name}</strong>
                      <p className="subconcept-desc">{concept.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example block */}
            <div className="content-section">
              <div className="code-example-heading">
                <h3 className="content-section-title">Code Demonstration</h3>
                <button 
                  onClick={() => handleCopyCode(activeTopic.codeExample)}
                  className="copy-code-btn"
                >
                  {copied ? (
                    <>
                      <Icons.Check size={12} className="text-teal" />
                      <span className="text-teal">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Icons.Copy size={12} />
                      <span>Copy Example</span>
                    </>
                  )}
                </button>
              </div>

              <div className="topic-code-wrapper">
                <div className="topic-code-header">
                  <span>PYTHON</span>
                </div>
                <pre className="topic-code-pre">
                  <code>{activeTopic.codeExample}</code>
                </pre>
              </div>
            </div>

            {/* Beginner tips/warnings */}
            <div className="content-section warning-box">
              <div className="warning-header">
                <Icons.AlertTriangle size={18} className="warning-icon" />
                <h4>Beginner Pro Tip & Gotchas</h4>
              </div>
              <p className="warning-text">{activeTopic.tips}</p>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .topics-page-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .topics-title {
          font-size: 2.2rem;
          font-family: var(--font-heading);
          margin-bottom: 4px;
        }

        .topics-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        /* Layout */
        .topics-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .topics-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Sidebar list */
        .topics-sidebar {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sidebar-heading {
          font-size: 1rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding-left: 8px;
        }

        .sidebar-menu {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          text-align: left;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 10px 12px;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: var(--transition-fast);
        }

        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: var(--border-color);
        }

        .sidebar-item.active {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--item-accent);
        }

        .sidebar-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .sidebar-item-text {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sidebar-item-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .sidebar-item.active .sidebar-item-title {
          color: var(--text-main);
        }

        .sidebar-item-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        /* Detail Pane content */
        .topic-content-pane {
          padding: 32px;
          min-height: 500px;
        }

        .topic-content-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 28px;
        }

        .topic-icon-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          border: 1px solid transparent;
          flex-shrink: 0;
        }

        .active-topic-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .active-topic-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .topic-content-body {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .content-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .content-section-title {
          font-size: 1.1rem;
          font-family: var(--font-heading);
          font-weight: 600;
          color: var(--text-main);
        }

        .text-content {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Analogy Box */
        .analogy-box {
          border-left: 4px solid var(--border-color);
          padding: 16px 20px;
          border-radius: 0 12px 12px 0;
        }

        .analogy-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .analogy-header h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .analogy-text {
          font-size: 0.95rem;
          color: var(--text-main);
          font-style: italic;
          line-height: 1.5;
        }

        /* Subconcepts list */
        .subconcepts-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .subconcept-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .subconcept-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }

        .subconcept-name {
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .subconcept-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Code block example */
        .code-example-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .copy-code-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--border-color);
          padding: 6px 12px;
          border-radius: 6px;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .copy-code-btn:hover {
          color: var(--text-main);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .text-teal {
          color: var(--accent-teal) !important;
        }

        .topic-code-wrapper {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background: #0d1117;
        }

        .topic-code-header {
          padding: 8px 16px;
          background: #161b22;
          border-bottom: 1px solid var(--border-color);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-dim);
          letter-spacing: 0.05em;
        }

        .topic-code-pre {
          padding: 16px;
          margin: 0;
          overflow-x: auto;
        }

        .topic-code-pre code {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #c9d1d9;
          line-height: 1.5;
        }

        /* Tip warning box */
        .warning-box {
          border: 1px solid rgba(245, 158, 11, 0.2);
          background: rgba(245, 158, 11, 0.03);
          border-radius: 12px;
          padding: 18px;
        }

        .warning-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-amber);
          margin-bottom: 6px;
        }

        .warning-header h4 {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .warning-icon {
          color: var(--accent-amber);
        }

        .warning-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
