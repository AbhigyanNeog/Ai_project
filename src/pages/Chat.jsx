import React, { useState } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import { chatResponses } from '../data/demoResponses';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hi! I am your **Code Companion**. 🐍 \n\nI can help you understand variables, loops, lists, functions, OOP, and debugging. Ask me a question, or try one of the suggestions below!'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    { label: 'Explain for loop', query: 'for loop' },
    { label: 'What is a variable?', query: 'variable' },
    { label: 'Explain recursion', query: 'recursion' },
    { label: 'What is OOP?', query: 'oop' }
  ];

  const handleSendMessage = (text) => {
    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: text
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing state
    setIsTyping(true);

    // Keyword lookup logic
    setTimeout(() => {
      const cleanText = text.toLowerCase().trim();
      let responseText = '';

      // Check for matching keywords in the chatResponses keys
      const matchedKey = Object.keys(chatResponses).find(key => 
        cleanText.includes(key)
      );

      if (matchedKey) {
        responseText = chatResponses[matchedKey];
      } else {
        responseText = `That's a great question! \n\nIn this prototype version, I have curated answers for core concepts. Try asking about: \n- **variables** or **constants**\n- **for loop** or **while loop**\n- **lists** or **arrays**\n- **functions** or **recursion**\n- **OOP** (Object-Oriented Programming)\n- **debugging** or **fixing errors**\n\nOr click one of the suggested prompts at the top!`;
      }

      // Add assistant response
      const assistantMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        text: responseText
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200); // 1.2 second delay for realistic feel
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: 'Chat history cleared. What programming topic can I explain next?'
      }
    ]);
  };

  return (
    <div className="chat-page-container">
      {/* Header Info */}
      <div className="chat-page-header">
        <div>
          <h1 className="chat-title">Coding Chatbot</h1>
          <p className="chat-subtitle">Ask questions in plain English and learn with simple analogies.</p>
        </div>
        <div className="chat-header-tips glass-panel">
          <HelpCircle size={16} className="tip-icon" />
          <span>Tip: Ask for specific topics like 'explain lists' or 'what is recursion?'</span>
        </div>
      </div>

      {/* Suggested Quick Buttons */}
      <div className="suggested-prompts-bar">
        <span className="suggested-title">Quick Prompts:</span>
        <div className="suggested-buttons">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(prompt.query)}
              disabled={isTyping}
              className="suggested-btn glass-panel"
            >
              <Sparkles size={12} className="btn-sparkle" />
              <span>{prompt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Box Container */}
      <div className="chat-box-wrapper">
        <ChatBox
          messages={messages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          onClearChat={handleClearChat}
        />
      </div>

      <style>{`
        .chat-page-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chat-page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .chat-title {
          font-size: 2.2rem;
          font-family: var(--font-heading);
          margin-bottom: 4px;
        }

        .chat-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .chat-header-tips {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(59, 130, 246, 0.05);
          border-color: rgba(59, 130, 246, 0.15);
        }

        .tip-icon {
          color: var(--primary);
        }

        /* Suggested prompt buttons bar */
        .suggested-prompts-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .suggested-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dim);
        }

        .suggested-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .suggested-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          color: var(--text-main);
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 500;
          background: rgba(255, 255, 255, 0.02);
          border-color: var(--border-color);
          transition: var(--transition-fast);
        }

        .suggested-btn:hover:not(:disabled) {
          border-color: var(--primary);
          background: rgba(59, 130, 246, 0.05);
          transform: translateY(-1px);
        }

        .btn-sparkle {
          color: var(--accent-amber);
        }

        .chat-box-wrapper {
          width: 100%;
        }

        @media (max-width: 768px) {
          .chat-page-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .chat-header-tips {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
