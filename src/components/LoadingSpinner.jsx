import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClass = `spinner spinner-${size}`;
  
  return (
    <div className="loading-container">
      <div className={sizeClass}></div>
      <span className="ml-3">Loading comments...</span>
    </div>
  );
};

export default LoadingSpinner;