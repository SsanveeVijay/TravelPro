import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripCard from '../components/TripCard';
import { getTrips, saveTrips } from '../utils/storage';

const Home = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  // 🔥 DELETE FUNCTION
  const handleDeleteTrip = (id) => {
    const updatedTrips = trips.filter(trip => trip.id !== id);
    setTrips(updatedTrips);
    saveTrips(updatedTrips);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Travel Plans</h1>
        <p className="page-subtitle">
          Manage and track your upcoming trips
        </p>
      </div>

      {trips.length === 0 ? (
        <div className="empty-state home-empty">
          <h2 className="empty-title">No trips yet</h2>
          <p className="empty-text">Create one to get started</p>

          <button onClick={() => navigate('/create')} className="primary-button">
            Create Trip
          </button>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={handleDeleteTrip}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;