import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripCard from '../components/TripCard';
import { getTrips } from '../utils/storage';
import AppInfo from '../components/AppInfo';

const Home = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Travel Plans</h1>
        <p className="page-subtitle">
          Manage and track your upcoming trips
        </p>
      </div>

      {trips.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-title">No trips yet</h2>
          <p className="empty-text">Create one to get started</p>

          <button onClick={() => navigate('/create')} className="primary-button">
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
      <AppInfo />
    </div>
  );
};

export default Home;