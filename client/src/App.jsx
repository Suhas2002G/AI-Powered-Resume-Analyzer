import React from 'react';
import { ThemeProvider } from './components/contexts/ThemeContext'
import AppContent from './AppContent';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;