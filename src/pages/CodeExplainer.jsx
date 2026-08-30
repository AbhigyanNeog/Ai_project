import React, { useState } from 'react';
import { Eye, ShieldAlert, Zap, BookOpen, Terminal, Sparkles } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import { getCustomExplainerResponse } from '../data/demoResponses';

export default function CodeExplainer() {
  const [code, setCode] = useState('for i in range(5):\n    print(i)');
  const [activeTab, setActiveTab] = useState('explain'); // explain, error, simplify, example
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({
    explain: "This code is a **for loop** in Python. It does the following:\n1. `range(5)` generates a sequence of numbers from `0` to `4` (5 numbers total).\n2. The variable `i` takes the value of each number in that sequence, one by one.\n3. `print(i)` outputs the current value of `i` to the screen on each iteration.\n\n**Result output:**\n`0`\n`1`\n`2`\n`3`\n`4`",
    error: "This code is syntactically **correct** and will run perfectly. No bugs detected!\n\n💡 *Tip:* If you wanted to start printing from 1 instead of 0, you could write `range(1, 6)`.",
    simplify: "This code is already as simple and clean as it gets! It represents the standard, idiomatic way to loop 5 times in Python.",
    example: "Here is an example of using the loop to do something more realistic, like calculating a sum:\n```python\ntotal = 0\nfor i in range(1, 6):  # numbers 1 to 5\n    total += i\nprint(\"The sum of numbers 1 to 5 is:\", total)\n# Output: 15\n```"
  });

  const presets = [
    { 
      label: 'Simple For Loop', 
      code: 'for i in range(5):\n    print(i)',
      title: 'Python Basics'
    },
    { 
      label: 'Missing Syntax Error', 
      code: 'def add(a, b)\nreturn a + b',
      title: 'Missing Colon & Indent'
    },
    { 
      label: 'Type Mismatch Error', 
      code: 'x = "10"\ny = 5\nprint(x + y)',
      title: 'Adding String + Integer'
    }
  ];

  const loadPreset = (presetCode) => {
    setCode(presetCode);
    triggerAnalysis(presetCode, activeTab);
  };

  const handleActionClick = (action) => {
    setActiveTab(action);
    triggerAnalysis(code, action);
  };

  const triggerAnalysis = (currentCode, action) => {
    if (!currentCode.trim()) {
      alert("Please write or paste some code first!");
      return;
    }
    
    setIsLoading(true);

    // Simulate analysis delay
    setTimeout(() => {
      const parsedOutput = getCustomExplainerResponse(currentCode, action);
      
      setResults(prev => ({
        ...prev,
        [action]: parsedOutput
      }));
      setIsLoading(false);
    }, 850);
  };

  const formatOutput = (text) => {
    if (!text) return 'No data available.';
    
    // Parse formatting rules:
    // **bold** -> <strong>
    // `code` -> <code>
    // \n -> <br />
    // \n\n -> margins
    
    const lines = text.split('\n').map((line, idx) => {
      let formattedLine = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Replace bold
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Replace inline code
      formattedLine = formattedLine.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');

      // Replace emojis or icons if needed
      
      // Handle python code blocks inside descriptions (```python ... ```)
      if (line.trim().startsWith('```')) {
        return null; // Handle separately or keep as hidden markers
      }

      return (
        <span 
          key={idx} 
          dangerouslySetInnerHTML={{ __html: formattedLine }} 
          style={{ display: 'block', minHeight: line === '' ? '12px' : 'auto', marginBottom: '6px' }}
        />
      );
    });

    // Handle full code blocks inside explain outputs (if any exist between ```)
    const codeBlocks = text.split('```');
    if (codeBlocks.length > 1) {
      return codeBlocks.map((block, index) => {
        if (index % 2 === 1) {
          // It's code block
          const lines = block.split('\n');
          const lang = lines[0].trim();
          const codeLines = lines.slice(1).join('\n').replace(/\n$/, '');
          return (
            <div key={index} className="explainer-embedded-code">
              <div className="embedded-code-header">{lang.toUpperCase()}</div>
              <pre className="embedded-code-pre"><code>{codeLines}</code></pre>
            </div>
          );
        } else {
          // Regular text block inside splitter
          return (
            <div key={index} className="description-text-chunk">
              {block.split('\n').map((l, lIdx) => {
                let fmt = l.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                           .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
                return <p key={lIdx} dangerouslySetInnerHTML={{ __html: fmt }} style={{ marginBottom: '8px' }} />;
              })}
            </div>
          );
        }
      });
    }

    return <div className="formatted-text-block">{lines}</div>;
  };

  const tabsInfo = [
    { id: 'explain', label: 'Explain Code', icon: Eye },
    { id: 'error', label: 'Find Error', icon: ShieldAlert },
    { id: 'simplify', label: 'Simplify Code', icon: Zap },
    { id: 'example', label: 'Give Example', icon: BookOpen }
  ];

  return (
    <div className="explainer-container">
      {/* Title */}
      <div className="explainer-header">
        <h1 className="explainer-title">Code Explainer</h1>
        <p className="explainer-subtitle">Paste your snippet, identify compiler issues, and obtain refactoring tips.</p>
      </div>

      {/* Preset Selector */}
      <div className="presets-container glass-panel">
        <div className="presets-title">
          <Terminal size={14} className="preset-icon" />
          <span>Try a Template:</span>
        </div>
        <div className="presets-list">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => loadPreset(preset.code)}
              className="preset-btn"
              title={preset.title}
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout grid */}
      <div className="grid-2">
        {/* Editor Side */}
        <div className="editor-side">
          <div className="editor-label">
            <span>Input Code:</span>
          </div>
          <CodeEditor 
            code={code} 
            onChange={(val) => setCode(val)} 
            placeholder="# Write Python code or paste a snippet..."
          />
          <div className="editor-hints">
            <span>Make changes above and click any tab on the right to analyze.</span>
          </div>
        </div>

        {/* Results Side */}
        <div className="results-side glass-panel">
          {/* Tabs header */}
          <div className="results-tabs">
            {tabsInfo.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleActionClick(tab.id)}
                  className={`tab-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content area */}
          <div className="tab-content-panel">
            {isLoading ? (
              <div className="analysis-loading-wrapper">
                <div className="spinner"></div>
                <p>Analyzing code structure...</p>
                <span className="sub-load">Running mock debugger checklist</span>
              </div>
            ) : (
              <div className="analysis-result-content">
                {formatOutput(results[activeTab])}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .explainer-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .explainer-header {
          margin-bottom: 8px;
        }

        .explainer-title {
          font-size: 2.2rem;
          font-family: var(--font-heading);
          margin-bottom: 4px;
        }

        .explainer-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        /* Preset container styling */
        .presets-container {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 20px;
          background: rgba(17, 24, 39, 0.4);
          border-radius: 12px;
          flex-wrap: wrap;
        }

        .presets-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .preset-icon {
          color: var(--accent-teal);
        }

        .presets-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .preset-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 6px 12px;
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--text-main);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .preset-btn:hover {
          border-color: var(--primary);
          background: rgba(59, 130, 246, 0.05);
        }

        /* Editor labels and hints */
        .editor-side {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .editor-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .editor-hints {
          font-size: 0.75rem;
          color: var(--text-dim);
          font-style: italic;
        }

        /* Results Side panel */
        .results-side {
          display: flex;
          flex-direction: column;
          height: 418px; /* sync with editor total height (toolbar + editor body + border) */
          overflow: hidden;
        }

        .results-tabs {
          display: flex;
          background: rgba(17, 24, 39, 0.5);
          border-bottom: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
          border-bottom: 2px solid transparent;
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.02);
        }

        .tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
          background: rgba(59, 130, 246, 0.05);
          font-weight: 600;
        }

        .tab-content-panel {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: rgba(11, 15, 25, 0.15);
        }

        /* Loading Spinner */
        .analysis-loading-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 12px;
          color: var(--text-muted);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(59, 130, 246, 0.1);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .sub-load {
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        /* Diagnostic Outputs Styling */
        .analysis-result-content {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-main);
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

        .explainer-embedded-code {
          border-radius: 8px;
          overflow: hidden;
          margin: 12px 0;
          border: 1px solid var(--border-color);
          background: #0d1117;
        }

        .embedded-code-header {
          padding: 6px 12px;
          background: #161b22;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .embedded-code-pre {
          padding: 12px;
          margin: 0;
          overflow-x: auto;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #c9d1d9;
        }

        .formatted-text-block strong {
          color: var(--primary);
        }

        .description-text-chunk strong {
          color: var(--primary);
        }

        @media (max-width: 900px) {
          .results-side {
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
}
