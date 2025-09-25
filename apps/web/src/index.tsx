import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/ratecards')
      .catch(err => setError(err.message));
  }, []);

  return (
    <main>
      <h1>Available Rate Cards</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </main>
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);