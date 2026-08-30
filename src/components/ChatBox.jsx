import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, ArrowRight } from 'lucide-react';
import ChatMessage from './ChatMessage';

export default function ChatBox({ messages, onSendMessage, isTyping, onClearChat }) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chatbox-panel glass-panel">
      {/* Chat header */}
      <div className="chatbox-header">
        <div className="chatbox-title-wrapper">
          <span className="live-status-dot"></span>
          <h3 className="chatbox-title">Assistant Session</h3>
        </div>
        
        {messages.length > 2 && (
          <button 
            onClick={onClearChat}
            className="chat-clear-btn"
            title="Clear Chat History"
          >
            <Trash2 size={14} />
            <span>Clear Chat</span>
          </button>
        )}
      </div>

      {/* Messages Thread */}
      <div className="chat-thread-container">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Assistant Typing Indicator */}
        {isTyping && (
          <div className="message-row assistant-row">
            <div className="avatar-wrapper assistant-avatar typing-avatar">
              <span className="dot pulse-1"></span>
              <span className="dot pulse-2"></span>
              <span className="dot pulse-3"></span>
            </div>
            <div className="message-bubble assistant-bubble typing-bubble">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="chat-input-form">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask a coding question... (e.g., 'Explain loops' or 'How to fix error')"
          className="chat-textarea-input"
          rows={1}
          disabled={isTyping}
        />
        
        <button 
          type="submit" 
          className={`chat-submit-btn ${!inputValue.trim() || isTyping ? 'disabled' : ''}`}
          disabled={!inputValue.trim() || isTyping}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>

      <style>{`
        .chatbox-panel {
          display: flex;
          flex-direction: column;
          height: 600px;
          overflow: hidden;
          width: 100%;
        }

        .chatbox-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(17, 24, 39, 0.4);
        }

        .chatbox-title-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .live-status-dot {
          width: 8px;
          height: 8px;
          background-color: var(--accent-teal);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-teal);
          animation: statusGlow 2s infinite alternate;
        }

        @keyframes statusGlow {
          from { opacity: 0.5; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1.1); }
        }

        .chatbox-title {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1rem;
        }

        .chat-clear-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: var(--transition-fast);
        }

        .chat-clear-btn:hover {
          color: var(--accent-rose);
          border-color: rgba(244, 63, 94, 0.3);
          background: rgba(244, 63, 94, 0.05);
        }

        .chat-thread-container {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: rgba(11, 15, 25, 0.1);
        }

        /* Typing indicators styling */
        .typing-avatar {
          background: rgba(59, 130, 246, 0.05);
          border-color: rgba(59, 130, 246, 0.2);
        }

        .typing-bubble {
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background-color: var(--text-muted);
          border-radius: 50%;
          display: inline-block;
          animation: typingBlink 1.4s infinite both;
        }

        .typing-dots span:nth-child(2) {
          animation-delay: .2s;
        }

        .typing-dots span:nth-child(3) {
          animation-delay: .4s;
        }

        @keyframes typingBlink {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }

        /* Input section */
        .chat-input-form {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(17, 24, 39, 0.6);
          border-top: 1px solid var(--border-color);
        }

        .chat-textarea-input {
          flex: 1;
          background: rgba(11, 15, 25, 0.8);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-main);
          padding: 12px 16px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          resize: none;
          min-height: 44px;
          max-height: 120px;
          transition: var(--transition-fast);
        }

        .chat-textarea-input:focus {
          border-color: var(--primary);
          background: rgba(11, 15, 25, 0.95);
        }

        .chat-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border: none;
          color: white;
          cursor: pointer;
          transition: var(--transition-fast);
          flex-shrink: 0;
          box-shadow: 0 4px 10px var(--primary-glow);
        }

        .chat-submit-btn:hover:not(.disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 14px var(--secondary-glow);
        }

        .chat-submit-btn.disabled {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-dim);
          box-shadow: none;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
