import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';
import { getTrips, saveTrips } from '../utils/storage';

const CreateTrip = () => {

  // Controlled inputs → state manages input values
  const [tripName, setTripName] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // Validation
    if (!tripName.trim() || !budget) {
      setError('Please fill all fields');
      return;
    }

    // Creating new object
    const newTrip = {
      id: Date.now().toString(),
      name: tripName.trim(),
      budget: parseFloat(budget),
      itinerary: []
    };

    // Data persistence
    const existingTrips = getTrips();
    saveTrips([...existingTrips, newTrip]);

    navigate('/');
  };

  return (
    <div className="form-page create-trip-page">

      {/* Navigation */}
      <button onClick={() => navigate('/')} className="back-button">
        ← Back
      </button>

      <div className="form-container">
        <h2 className="form-title">Create New Trip</h2>

        {/* Conditional rendering */}
        {error && <p className="error-message">{error}</p>}

        {/* Form handling */}
        <form onSubmit={handleSubmit} className="trip-form">

          <div className="form-group">
            <label className="form-label">Trip Name</label>
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)} // controlled input
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Budget (Rs)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-button">
            Create Trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;