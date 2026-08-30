import React from 'react';
import * as Icons from 'lucide-react';

export default function TopicCard({ topic, onClick }) {
  // Dynamically resolve icon from name string
  const IconComponent = Icons[topic.icon] || Icons.BookOpen;

  return (
    <div 
      onClick={onClick}
      className="topic-card glass-panel glass-card-interactive"
      style={{ '--accent-color': topic.color }}
    >
      <div className="topic-icon-wrapper" style={{ backgroundColor: `${topic.color}15`, borderColor: `${topic.color}30` }}>
        <IconComponent size={24} style={{ color: topic.color }} />
      </div>
      
      <div className="topic-card-body">
        <h4 className="topic-card-title">{topic.title}</h4>
        <p className="topic-card-desc">{topic.description}</p>
      </div>

      <div className="topic-card-arrow">
        <Icons.ArrowRight size={16} className="arrow-icon" />
      </div>

      <style>{`
        .topic-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .topic-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--accent-color);
          opacity: 0;
          transition: var(--transition-fast);
        }

        .topic-card:hover::after {
          opacity: 1;
        }

        .topic-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: 1px solid transparent;
          flex-shrink: 0;
        }

        .topic-card-body {
          flex: 1;
        }

        .topic-card-title {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1.05rem;
          margin-bottom: 4px;
          color: var(--text-main);
        }

        .topic-card-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .topic-card-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          transition: var(--transition-fast);
          opacity: 0;
          transform: translateX(-10px);
        }

        .topic-card:hover .topic-card-arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--accent-color);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .arrow-icon {
          transition: transform 0.2s ease;
        }

        .topic-card:hover .arrow-icon {
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}
