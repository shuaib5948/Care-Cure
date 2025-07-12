import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function Theme({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const lightTheme = {
    '--primary-color': '#009688',
    '--primary-light': '#4DB6AC',
    '--primary-dark': '#00796B',
    '--background-color': '#FFFFFF',
    '--background-secondary': '#F5F5F5',
    '--background-tertiary': '#F8F9FA',
    '--text-color': '#212121',
    '--text-secondary': '#757575',
    '--muted-text-color': '#9E9E9E',
    '--border-color': '#E0E0E0',
    '--border-light': '#F0F0F0',
    '--button-color': '#009688',
    '--card-background': '#FFFFFF',
    '--input-background': '#FAFAFA',
    '--shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
    '--shadow-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
    '--heading-font': '"Poppins", sans-serif',
    '--body-font': '"Roboto", sans-serif',
    '--heading-weight-medium': '500',
    '--heading-weight-semibold': '600',
    '--heading-weight-bold': '700',
    '--body-weight-light': '300',
    '--body-weight-normal': '400',
    '--body-weight-medium': '500'
  };

  const darkTheme = {
    '--primary-color': '#26A69A',
    '--primary-light': '#4DB6AC',
    '--primary-dark': '#00695C',
    '--background-color': '#121212',
    '--background-secondary': '#1E1E1E',
    '--background-tertiary': '#2D2D2D',
    '--text-color': '#E0E0E0',
    '--text-secondary': '#B0B0B0',
    '--muted-text-color': '#757575',
    '--border-color': '#404040',
    '--border-light': '#303030',
    '--button-color': '#26A69A',
    '--card-background': '#1E1E1E',
    '--input-background': '#2D2D2D',
    '--shadow': '0 2px 4px rgba(0, 0, 0, 0.3)',
    '--shadow-hover': '0 4px 12px rgba(0, 0, 0, 0.4)',
    '--heading-font': '"Poppins", sans-serif',
    '--body-font': '"Roboto", sans-serif',
    '--heading-weight-medium': '500',
    '--heading-weight-semibold': '600',
    '--heading-weight-bold': '700',
    '--body-weight-light': '300',
    '--body-weight-normal': '400',
    '--body-weight-medium': '500'
  };

  const themeStyle = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div style={themeStyle} className={isDarkMode ? 'dark-theme' : 'light-theme'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export default Theme;
