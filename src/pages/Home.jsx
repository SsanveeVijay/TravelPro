import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripCard from '../components/TripCard';

// Utility functions 
import { getTrips, saveTrips } from '../utils/storage';

const Home = () => {

  // State - stores trips (React Dataflow)
  const [trips, setTrips] = useState([]);

  const navigate = useNavigate();

  // useEffect - runs after component mounts (lifecycle equivalent)
  useEffect(() => {
    setTrips(getTrips()); // load from localStorage
  }, []);

  // Function passed as prop to child (TripCard)
  const handleDeleteTrip = (id) => {

    // Updating state immutably
    const updatedTrips = trips.filter(trip => trip.id !== id);

    setTrips(updatedTrips);     // update UI
    saveTrips(updatedTrips);    // persist data
  };

  return (
    <div className="page-container">

      {/* JSX */}
      <div className="page-header">
        <h1 className="page-title">My Travel Plans</h1>
        <p className="page-subtitle">
          Manage and track your upcoming trips
        </p>
      </div>

      {/* Conditional rendering */}
      {trips.length === 0 ? (
        <div className="empty-state home-empty">
          <h2 className="empty-title">No trips yet</h2>
          <p className="empty-text">Create one to get started</p>

          {/* Navigation using hook */}
          <button onClick={() => navigate('/create')} className="primary-button">
            Create Trip
          </button>
        </div>
      ) : (
        <div className="trips-grid">

          {/* Mapping over state - rendering list */}
          {trips.map((trip) => (
            <TripCard
              key={trip.id}          // key required for lists
              trip={trip}            // passing data as props
              onDelete={handleDeleteTrip} // passing function as prop
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;