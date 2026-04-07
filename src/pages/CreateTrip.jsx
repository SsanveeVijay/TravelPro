import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

const CreateTrip = () => {
  const [tripName, setTripName] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tripName.trim() || !budget) {
      setError('Please fill all fields');
      return;
    }

    const newTrip = {
      id: Date.now().toString(),
      name: tripName.trim(),
      budget: parseFloat(budget).toFixed(2),
      itinerary: []
    };

    const existingTrips = JSON.parse(localStorage.getItem('travelProTrips') || '[]');
    const updatedTrips = [...existingTrips, newTrip];
    localStorage.setItem('travelProTrips', JSON.stringify(updatedTrips));

    navigate('/');
  };

  return (
    <div className="form-page">
      
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        ← Back
      </button>

      <div className="form-container">
        <h2>Create New Trip</h2>

        {error && (
          <p className="error-message">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Trip Name</label>
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="Enter trip name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Budget</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget"
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