# Your Friendly Code Companion

An interactive coding tutor and helper designed specifically for programming beginners, college students, and self-learners.

---

## 1. Problem Statement

Learning to program can be intimidating. Beginners often struggle with:
- **Dry, technical jargon** in standard documentation that feels overwhelming.
- **Cryptic compiler error messages** (like `SyntaxError` or `TypeError`) that fail to explain *what* went wrong and *how* to fix it.
- **Abstract concepts** (like recursion or Object-Oriented Programming) that lack relatable, real-world analogies.
- **Fragmented tools**, requiring students to jump between compilers, explanation sites, and search engines.

---

## 2. Proposed Solution

**Your Friendly Code Companion** bridges this gap by serving as a dedicated, conversational guide. It features:
- **Relatable Analogies**: Breaking down abstract computer science structures into daily concepts (e.g., viewing variables as labeled storage boxes).
- **Simple, Interactive Chatbot**: Translating complex questions into simple, jargon-free explanations.
- **Code Analyzer & Debugger**: An IDE-like space that identifies syntax issues, suggests simplifications, and offers code demonstrations.
- **Targeted Topic Guides**: Highlighting beginner "gotchas" and common errors alongside clean, copy-pasteable code examples.

---

## 3. Objectives

- **Demystify Computer Science**: Help beginners build a solid mental model of programming paradigms.
- **Provide Conversational Aid**: Offer interactive, chat-style responses to questions.
- **Simplify Diagnostics**: Explain code errors in clear, plain language.
- **Demonstrate Best Practices**: Guide users on how to refactor and simplify messy logic.
- **Facilitate Active Practice**: Provide editable code blocks and templates to encourage typing and experimentation.

---

## 4. Key Features Implemented

1. **Sleek Beginner Dashboard**: 
   - A modern dark-theme landing page with glassmorphism panels.
   - Quick portals to the Chatbot and Code Explainer.
   - A visual overview of 7 essential learning topics.
2. **Coding Chatbot**:
   - Simulated conversational interface with typing animations.
   - Intelligent keyword-based lookups (for loops, recursion, lists, variables).
   - Fast, clickable prompt suggestions for testing.
3. **Code Explainer & Debugger**:
   - Interactive IDE code editor pane with synchronized line numbers.
   - Multiple preset templates illustrating syntax and type errors.
   - Functional tabs: **Explain Code**, **Find Error**, **Simplify Code**, and **Give Example**.
   - Custom heuristic parser for user-submitted code snippets.
4. **Learning Topics Library**:
   - Interactive split view for Python Basics, Loops, Functions, OOP, Arrays, and Debugging.
   - Displays real-world analogies, conceptual summaries, copy-paste code blocks, and beginner gotchas.
5. **Interactive About & Documentation**:
   - Project specifications, objectives, and technology stack.
   - Animated **System Workflow stepper** detailing the request lifecycle.

---

## 5. Technology Stack

- **Core Library**: React (v19)
- **Scaffolding/Bundle**: Vite (v8)
- **Styling**: Custom Vanilla CSS (Dark theme glassmorphism, responsive CSS grid/flexbox)
- **Icons**: Lucide React Icons
- **Mock engine**: Client-side keyword parser and regex check functions

---

## 6. System Workflow

The following diagram illustrates how user requests move through the application:

```text
       User (Enters code/question)
                 ↓
      Frontend User Interface (Validates, triggers loading state)
                 ↓
      Assistant Processing (Parses input keywords, runs syntax regex checks)
                 ↓
   Explanation & Debugging Guidance (Generates output, renders syntax block)
                 ↓
                 User (Learns, modifies code, copies examples)
```

---

## 7. Future Scope

To expand this prototype into a full-scale educational product, we plan to implement:
1. **Real LLM Integration**: Connecting to Google Gemini API for unlimited, dynamic coding guidance.
2. **Code Sandbox Execution**: Enabling users to run their Python or JavaScript code directly inside the browser.
3. **Multi-Language Support**: Expanding concept sheets and code highlight presets to C++, Java, Rust, and SQL.
4. **Interactive Practice Quizzes**: Adding mini-challenges at the end of topics to test comprehension.
5. **Personalized Learning Paths**: Assessing user progress and recommending topics dynamically.
6. **Voice Commands**: Allowing voice-based coding queries for accessibility.
7. **Code Visualizer**: Rendering execution stacks visually (e.g. tracking recursive calls in real-time).

---

## 8. Instructions to Run Locally

Follow these steps to run the application on your computer:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or above recommended).

### Installation
1. Open a terminal inside the project directory.
2. Install all dependencies:
   ```bash
   npm install
   ```

### Running in Development Mode
Start the local development server:
```bash
npm run dev
```
Once started, the terminal will display a local address (typically `http://localhost:5173`). Open this URL in your web browser.

### Building for Production
To generate a optimized build folder:
```bash
npm run build
```
The compiled static assets will be output to the `/dist` directory.
