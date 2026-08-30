import React, { useState } from 'react';
import { ShieldCheck, Target, Layers, ArrowRight, User, Terminal, Cpu, CheckCircle } from 'lucide-react';

export default function About() {
  const [activeStep, setActiveStep] = useState(0);

  const objectives = [
    "Help beginners understand programming concepts through analogies",
    "Provide conversational coding assistance with immediate feedback",
    "Explain buggy snippets in simple, jargon-free language",
    "Help users identify common coding syntax and type errors",
    "Provide verified copy-pasteable code examples for practice"
  ];

  const features = [
    { title: "Dashboard Hub", desc: "A user-friendly home panel containing quick action portals and topic lists." },
    { title: "Coding Chatbot", desc: "A mock conversational interface that answers coding questions asynchronously." },
    { title: "Code Explainer", desc: "An IDE-like panel mapping diagnostics, compile error checking, and code simplifications." },
    { title: "Learning Topics", desc: "A conceptual list expanding analogies, code examples, and beginner gotchas." }
  ];

  const workflowSteps = [
    {
      title: "User Input",
      desc: "User types a programming question or pastes a snippet of code in the editor.",
      icon: User,
      color: "#60a5fa"
    },
    {
      title: "Frontend Interface",
      desc: "The UI processes input validation, handles tab switches, and updates UI status.",
      icon: Terminal,
      color: "#a78bfa"
    },
    {
      title: "Processing Block",
      desc: "The mock AI matches keywords and code structures using deterministic rules.",
      icon: Cpu,
      color: "#2dd4bf"
    },
    {
      title: "Explanation & Tips",
      desc: "The system outputs clean explanations, compile reports, and analogy breakdowns.",
      icon: ShieldCheck,
      color: "#fb7185"
    }
  ];

  return (
    <div className="about-page-container">
      {/* Title */}
      <div className="about-header">
        <h1 className="about-title">About & Documentation</h1>
        <p className="about-subtitle">Project goals, architecture overview, and design specifications.</p>
      </div>

      {/* Intro section */}
      <div className="grid-2">
        <section className="doc-section glass-panel">
          <h2 className="doc-section-title">
            <Target size={20} className="sec-icon text-blue" />
            <span>Problem Statement</span>
          </h2>
          <div className="doc-content">
            <p>
              Programming beginners, college students, and self-taught developers often struggle to understand 
              complex programming concepts when faced with dry, technical documentation. 
            </p>
            <p style={{ marginTop: '12px' }}>
              Standard compiler error messages are frequently cryptic and confusing, leading to frustration 
              and slow progress. Traditional tools give answer resolutions without teaching the underlying logic.
            </p>
          </div>
        </section>

        <section className="doc-section glass-panel">
          <h2 className="doc-section-title">
            <CheckCircle size={20} className="sec-icon text-purple" />
            <span>Proposed Solution</span>
          </h2>
          <div className="doc-content">
            <p>
              <strong>Your Friendly Code Companion</strong> acts as an interactive coding tutor. It translates 
              complex coding structures into simple terms using real-world analogies.
            </p>
            <p style={{ marginTop: '12px' }}>
              By combining a chat interface with a dedicated Code Explainer and structured learning paths, 
              it allows students to learn interactively and debug their code with step-by-step guidance.
            </p>
          </div>
        </section>
      </div>

      {/* System Workflow (Interactive Stepper) */}
      <section className="workflow-section glass-panel">
        <h2 className="doc-section-title">
          <Layers size={20} className="sec-icon text-teal" />
          <span>Interactive System Workflow</span>
        </h2>
        <p className="workflow-sub">Hover or click on the steps below to inspect how information flows through the application.</p>
        
        <div className="workflow-stepper">
          {workflowSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isSelected = activeStep === index;
            
            return (
              <div 
                key={index} 
                className={`workflow-step-card ${isSelected ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                style={{ '--step-color': step.color }}
              >
                <div className="step-num">{index + 1}</div>
                <div className="step-card-header">
                  <div className="step-icon-wrapper">
                    <StepIcon size={20} />
                  </div>
                  <h3>{step.title}</h3>
                </div>
                <p className="step-card-desc">{step.desc}</p>
                
                {index < workflowSteps.length - 1 && (
                  <div className="step-arrow-divider">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Objectives and Specs grid */}
      <div className="grid-2">
        {/* Objectives */}
        <section className="doc-section glass-panel">
          <h2 className="doc-section-title">Objectives</h2>
          <ul className="objectives-list">
            {objectives.map((obj, index) => (
              <li key={index} className="objective-item">
                <span className="obj-checkbox">✓</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack and Details */}
        <section className="doc-section glass-panel">
          <h2 className="doc-section-title">Technology Stack</h2>
          <div className="tech-stack-details">
            <div className="tech-item">
              <span className="tech-label">Core framework:</span>
              <span className="tech-value">React (Vite)</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Styling:</span>
              <span className="tech-value">Vanilla CSS (Custom design system)</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Icons package:</span>
              <span className="tech-value">Lucide React Icons</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Mock logic:</span>
              <span className="tech-value">Keyword mapper & analysis rules</span>
            </div>
            <div className="tech-item" style={{ borderBottom: 'none' }}>
              <span className="tech-label">Target build:</span>
              <span className="tech-value">Static frontend prototype</span>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .about-page-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .about-header {
          margin-bottom: 8px;
        }

        .about-title {
          font-size: 2.2rem;
          font-family: var(--font-heading);
          margin-bottom: 4px;
        }

        .about-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .doc-section {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }

        .doc-section-title {
          font-size: 1.25rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .sec-icon {
          flex-shrink: 0;
        }

        .text-blue { color: var(--primary); }
        .text-purple { color: var(--secondary); }
        .text-teal { color: var(--accent-teal); }

        .doc-content p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Workflow Stepper */
        .workflow-section {
          padding: 32px 28px;
          text-align: left;
        }

        .workflow-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .workflow-stepper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          position: relative;
        }

        @media (max-width: 900px) {
          .workflow-stepper {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .workflow-step-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 24px 20px;
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .workflow-step-card:hover, .workflow-step-card.active {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--step-color);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.02);
        }

        .step-num {
          position: absolute;
          top: -12px;
          left: 20px;
          background: var(--bg-main);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .workflow-step-card.active .step-num {
          background: var(--step-color);
          color: #000;
          border-color: var(--step-color);
        }

        .step-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .step-icon-wrapper {
          color: var(--text-muted);
          transition: var(--transition-fast);
        }

        .workflow-step-card:hover .step-icon-wrapper, 
        .workflow-step-card.active .step-icon-wrapper {
          color: var(--step-color);
        }

        .step-card-header h3 {
          font-size: 1.05rem;
          font-weight: 600;
        }

        .step-card-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Connecting arrow indicators */
        .step-arrow-divider {
          position: absolute;
          right: -22px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--border-color);
          pointer-events: none;
          z-index: 2;
        }

        @media (max-width: 900px) {
          .step-arrow-divider {
            display: none;
          }
        }

        /* Objectives bullet list */
        .objectives-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .objective-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .obj-checkbox {
          color: var(--accent-teal);
          font-weight: 800;
        }

        /* Tech Stack Table/Details */
        .tech-stack-details {
          display: flex;
          flex-direction: column;
        }

        .tech-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          font-size: 0.9rem;
        }

        .tech-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .tech-value {
          color: var(--text-main);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
