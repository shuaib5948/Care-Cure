import React from 'react';
import { useTheme } from './Theme';

function DarkModeToggle({ className = '' }) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button 
      className={`dark-mode-toggle ${className}`}
      onClick={toggleDarkMode}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? '🌙' : '☀️'}
      
      <style>
        {`
          .dark-mode-toggle {
            background: ${isDarkMode ? '#333' : '#fff'};
            border: 1px solid ${isDarkMode ? '#555' : '#ddd'};
            color: ${isDarkMode ? '#fff' : '#333'};
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            font-size: 16px;
            transition: all 0.2s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .dark-mode-toggle:hover {
            background: ${isDarkMode ? '#444' : '#f5f5f5'};
          }

          .dark-mode-toggle:active {
            transform: scale(0.95);
          }
        `}
      </style>
    </button>
  );
}

export default DarkModeToggle;
