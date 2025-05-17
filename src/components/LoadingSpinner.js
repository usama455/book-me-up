import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      width: '100%'
    }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ 
          animation: 'spin 1s linear infinite',
          color: 'var(--primary-color)'
        }}
      >
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;