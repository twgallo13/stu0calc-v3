import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

interface RateCard {
  id: string;
  name: string;
  version: string;
}

const App = () => {
  const [rateCards, setRateCards] = useState<RateCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRateCards = async () => {
      try {
        const response = await fetch('/api/ratecards');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: RateCard[] = await response.json();
        setRateCards(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRateCards();
  }, []);

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (rateCards.length === 0) return <p>No rate cards found. Please run the database seed script.</p>;
    
    return (
      <ul>
        {rateCards.map(card => <li key={card.id}>{card.name} (v{card.version})</li>)}
      </ul>
    );
  };

  return (
    <main>
      <h1>Available Rate Cards</h1>
      {renderContent()}
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