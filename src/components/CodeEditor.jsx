import React, { useRef } from 'react';
import { Copy, Trash, Play } from 'lucide-react';

export default function CodeEditor({ code, onChange, placeholder }) {
  const lineNumbersRef = useRef(null);
  
  const lineCount = Math.max(code.split('\n').length, 1);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="editor-container">
      {/* Editor Header Bar */}
      <div className="editor-toolbar">
        <div className="editor-tab">
          <Play size={12} className="tab-icon" />
          <span>script.py</span>
        </div>
        <div className="editor-actions">
          <button onClick={handleCopy} className="toolbar-btn" title="Copy code">
            <Copy size={14} />
            <span>Copy</span>
          </button>
          <button onClick={handleClear} className="toolbar-btn text-rose" title="Clear code">
            <Trash size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="editor-body">
        {/* Line Numbers */}
        <div ref={lineNumbersRef} className="line-numbers-col">
          {lineNumbers.map((num) => (
            <div key={num} className="line-number-item">
              {num}
            </div>
          ))}
        </div>

        {/* Text Area Input */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          placeholder={placeholder || "# Paste or write your code here..."}
          className="editor-textarea-control"
          spellCheck="false"
        />
      </div>

      <style>{`
        .editor-container {
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background: #0d1117; /* GitHub Dark background */
          box-shadow: var(--glass-shadow);
        }

        .editor-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          background: #161b22;
          border-bottom: 1px solid var(--border-color);
        }

        .editor-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--text-main);
          font-weight: 500;
        }

        .tab-icon {
          color: var(--accent-teal);
        }

        .editor-actions {
          display: flex;
          gap: 12px;
        }

        .toolbar-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .toolbar-btn:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
        }

        .toolbar-btn.text-rose:hover {
          color: var(--accent-rose);
          background: rgba(244, 63, 94, 0.08);
        }

        .editor-body {
          display: flex;
          height: 350px;
          position: relative;
        }

        .line-numbers-col {
          width: 48px;
          padding: 16px 0;
          background: #090c10;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 10px;
          user-select: none;
          overflow-y: hidden;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #484f58;
          line-height: 1.6;
        }

        .line-number-item {
          height: 22.4px; /* matching line-height of textarea */
          display: flex;
          align-items: center;
        }

        .editor-textarea-control {
          flex: 1;
          background: transparent;
          color: #c9d1d9;
          border: none;
          outline: none;
          resize: none;
          padding: 16px;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          line-height: 1.6;
          overflow-y: auto;
          white-space: pre;
          tab-size: 4;
        }

        .editor-textarea-control::placeholder {
          color: #57606a;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
