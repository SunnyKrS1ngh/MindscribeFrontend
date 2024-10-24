import React from 'react';
import '../styles/LoadingSpinner.css'; // Import the CSS file for styles

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
