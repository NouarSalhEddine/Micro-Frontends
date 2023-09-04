import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      setErrorInfo(errorInfo);
    };

    const handleResetError = () => {
      setHasError(false);
      setError(null);
      setErrorInfo(null);
    };

    // Add event listeners to handle errors
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    // Clean up the event listeners
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong!</h1>
        <p>{error.toString()}</p>
        <div>Additional error information:</div>
        <pre>{errorInfo.componentStack}</pre>
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
