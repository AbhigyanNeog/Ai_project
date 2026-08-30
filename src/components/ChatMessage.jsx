import React, { useState } from 'react';
import { User, Cpu, Copy, Check } from 'lucide-react';

export default function ChatMessage({ message }) {
  const { sender, text } = message;
  const isAssistant = sender === 'assistant';
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (codeText, index) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper to parse simple markdown formatting (code blocks, inline code, bold text)
  const parseMessageText = (rawText) => {
    if (!rawText) return null;

    // Split by triple backticks for code blocks
    const parts = rawText.split('```');
    
    return parts.map((part, index) => {
      // If it's a code block (odd indices in split)
      if (index % 2 === 1) {
        // Separate language from code content
        const firstNewLine = part.indexOf('\n');
        let language = 'code';
        let codeContent = part;

        if (firstNewLine !== -1) {
          const possibleLang = part.substring(0, firstNewLine).trim();
          if (possibleLang.length > 0 && possibleLang.length < 15) {
            language = possibleLang;
            codeContent = part.substring(firstNewLine + 1);
          }
        }

        // Strip trailing newline if present
        codeContent = codeContent.replace(/\n$/, '');

        return (
          <div key={index} className="chat-code-block-wrapper">
            <div className="chat-code-header">
              <span className="chat-code-lang">{language.toUpperCase()}</span>
              <button 
                onClick={() => handleCopy(codeContent, index)}
                className="chat-copy-btn"
                title="Copy code"
              >
                {copiedIndex === index ? (
                  <>
                    <Check size={12} className="success-icon" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="chat-pre">
              <code className="chat-code">{codeContent}</code>
            </pre>
          </div>
        );
      }

      // If it's regular text, parse bold (**text**) and inline code (`code`)
      let textSegment = part;
      
      // We will parse line breaks
      const lines = textSegment.split('\n').map((line, lineIdx) => {
        // Regex replace **bold** with <strong>
        // Regex replace `code` with <code>
        // This is safe since we escaped code blocks already
        
        let formattedLine = line;
        
        // Escape HTML tags to prevent XSS in user input, but allow our custom inline styles
        formattedLine = formattedLine
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        // Parse Bold (**text**)
        const boldRegex = /\*\*(.*?)\*\*/g;
        formattedLine = formattedLine.replace(boldRegex, '<strong>$1</strong>');

        // Parse Inline Code (`code`)
        const inlineCodeRegex = /`(.*?)`/g;
        formattedLine = formattedLine.replace(inlineCodeRegex, '<code class="inline-code">$1</code>');

        return (
          <span 
            key={lineIdx} 
            dangerouslySetInnerHTML={{ __html: formattedLine }} 
            style={{ display: 'block', minHeight: line === '' ? '12px' : 'auto', marginBottom: '8px' }}
          />
        );
      });

      return <div key={index} className="text-paragraph">{lines}</div>;
    });
  };

  return (
    <div className={`message-row ${isAssistant ? 'assistant-row' : 'user-row'}`}>
      <div className={`avatar-wrapper ${isAssistant ? 'assistant-avatar' : 'user-avatar'}`}>
        {isAssistant ? <Cpu size={16} /> : <User size={16} />}
      </div>
      
      <div className={`message-bubble ${isAssistant ? 'assistant-bubble' : 'user-bubble'}`}>
        <div className="message-sender-title">
          {isAssistant ? 'Assistant' : 'You'}
        </div>
        <div className="message-text">
          {parseMessageText(text)}
        </div>
      </div>

      <style>{`
        .message-row {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          align-items: flex-start;
          width: 100%;
          animation: fadeInUp 0.3s ease-out;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .user-row {
          flex-direction: row-reverse;
        }

        .avatar-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .assistant-avatar {
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: var(--primary);
        }

        .user-avatar {
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: var(--secondary);
        }

        .message-bubble {
          max-width: 75%;
          padding: 16px;
          border-radius: 16px;
          font-size: 0.95rem;
          color: var(--text-main);
          box-shadow: var(--glass-shadow);
        }

        .assistant-bubble {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-top-left-radius: 4px;
        }

        .user-bubble {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-top-right-radius: 4px;
        }

        .message-sender-title {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          color: var(--text-muted);
        }

        .user-row .message-sender-title {
          color: var(--secondary);
          text-align: right;
        }

        .assistant-row .message-sender-title {
          color: var(--primary);
        }

        .message-text {
          word-break: break-word;
        }

        .inline-code {
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.85em;
          color: #f43f5e;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .chat-code-block-wrapper {
          border-radius: 8px;
          overflow: hidden;
          margin: 12px 0;
          border: 1px solid var(--border-color);
          background: #0d1117;
        }

        .chat-code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #161b22;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: var(--font-sans);
        }

        .chat-code-lang {
          font-weight: 600;
        }

        .chat-copy-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-family: var(--font-sans);
          transition: var(--transition-fast);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .chat-copy-btn:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
        }

        .success-icon {
          color: var(--accent-teal);
        }

        .chat-pre {
          padding: 12px;
          margin: 0;
          overflow-x: auto;
        }

        .chat-code {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #c9d1d9;
          line-height: 1.5;
        }

        .text-paragraph {
          margin-bottom: 12px;
        }
        
        .text-paragraph:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .message-bubble {
            max-width: 85%;
          }
        }
      `}</style>
    </div>
  );
}
