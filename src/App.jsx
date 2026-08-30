import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Chat from './pages/Chat';
import CodeExplainer from './pages/CodeExplainer';
import Topics from './pages/Topics';
import About from './pages/About';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTopicId, setSelectedTopicId] = useState('python-basics');

  // Support back/forward browser buttons or simple hash triggers if user wants to use links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'chat', 'explainer', 'topics', 'about'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger on initial mount
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when page state changes so reload/back works correctly
  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={handlePageChange} setSelectedTopicId={setSelectedTopicId} />;
      case 'chat':
        return <Chat />;
      case 'explainer':
        return <CodeExplainer />;
      case 'topics':
        return <Topics selectedTopicId={selectedTopicId} setSelectedTopicId={setSelectedTopicId} />;
      case 'about':
        return <About />;
      default:
        return <Home setCurrentPage={handlePageChange} setSelectedTopicId={setSelectedTopicId} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer setCurrentPage={handlePageChange} />
    </div>
  );
}
