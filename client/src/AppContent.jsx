import React from 'react';
import { useTheme } from './components/contexts/ThemeContext'
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Footer from './components/layout/Footer';

const AppContent = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header darkMode={isDark} setDarkMode={toggleTheme} />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default AppContent;