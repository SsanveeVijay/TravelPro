import React, { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';

const Home = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const parsedTrips = JSON.parse(localStorage.getItem('travelProTrips') || '[]');
    setTrips(Array.isArray(parsedTrips) ? parsedTrips : []);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Travel Plans</h1>
          <p className="page-subtitle">
            Manage and track your upcoming trips
          </p>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-title">No trips yet</h2>
          <p className="empty-text">
            Create one to get started
          </p>

          <button 
            onClick={() => window.location.href = '/create'} 
            className="primary-button"
          >
            Create Trip
          </button>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;