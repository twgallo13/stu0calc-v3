
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Define a type for the rate card data returned by the API
interface RateCard {
  id: string;
  name: string;
  version: string;
  monthly_minimum_cents: number;
}

const App = () => {
  const [rateCards, setRateCards] = useState<RateCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchRateCards = async () => {
      try {
        // The request is proxied by Vite to http://localhost:3000/api/ratecards
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
  }, []); // The empty dependency array ensures this effect runs only once

  const renderContent = () => {
    if (loading) {
      return <p>Loading rate cards...</p>;
    }
    if (error) {
      return <p>Error fetching data: {error}</p>;
    }
    if (rateCards.length === 0) {
      return <p>No rate cards found. Please run the seed script.</p>
    }
    return (
      <ul>
        {rateCards.map(card => (
          <li key={card.id}>
            {card.name} ({card.version})
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main>
      <h1>Available Rate Cards</h1>
      {renderContent()}
    </main>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find the root element to mount the App.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
