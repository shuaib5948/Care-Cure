import React from 'react';

function Theme({ children }) {
  const themeStyle = {
    '--primary-color': '#009688',
    '--background-color': '#FFFFFF',
    '--text-color': '#212121',
    '--muted-text-color': '#9E9E9E',
    '--border-color': '#E0E0E0',
    '--button-color': '#009688',
    '--heading-font': '"Poppins", sans-serif',
    '--body-font': '"Roboto", sans-serif',
    '--heading-weight-medium': '500',
    '--heading-weight-semibold': '600',
    '--heading-weight-bold': '700',
    '--body-weight-light': '300',
    '--body-weight-normal': '400',
    '--body-weight-medium': '500'
  };

  return (
    <div style={themeStyle}>
      {children}
    </div>
  );
}

export default Theme;
