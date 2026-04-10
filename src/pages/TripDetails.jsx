import React, { useState, useEffect } from 'react';

// useParams - used to get dynamic route parameter (:id)
// useNavigate - used for programmatic navigation
import { useParams, useNavigate } from 'react-router-dom';

import ItineraryItem from '../components/ItineraryItem';
import '../styles/form.css';

// Utility functions (logic separated from UI)
import { calculateBudget } from '../utils/budget';
import { getTrips, saveTrips } from '../utils/storage';

const TripDetails = () => {

  // Extracting trip id from URL (/trip/:id)
  const { id } = useParams();

  const navigate = useNavigate();

  // State management using Hooks (React Dataflow)
  const [trip, setTrip] = useState(null);
  const [activity, setActivity] = useState('');
  const [day, setDay] = useState('Day 1');
  const [cost, setCost] = useState('');
  const [error, setError] = useState('');

  // useEffect - acts like componentDidMount
  // Runs whenever 'id' changes
  useEffect(() => {
    loadTrip();
  }, [id]);

  // Function to load trip data from localStorage
  const loadTrip = () => {
    try {
      const trips = getTrips();

      // Find trip with matching id
      const foundTrip = trips.find(t => t.id === id);

      // If found - update state
      if (foundTrip) setTrip(foundTrip);

      // If not found - redirect to home
      else navigate('/');
    } catch {
      navigate('/');
    }
  };

  // Form submit handler to add new activity
  const handleAddActivity = (e) => {
    e.preventDefault();

    setError('');

    // Validation: activity name required
    if (!activity.trim()) {
      setError('Please enter an activity name');
      return;
    }

    // Validation: cost cannot be negative
    if (cost && parseFloat(cost) < 0) {
      setError('Cost cannot be negative');
      return;
    }

    // Get current spent amount using utility function
    const currentSpent = calculateBudget(trip).totalSpent;

    // Convert new cost to number
    const newCost = cost ? parseFloat(cost) : 0;

    // Business logic validation - budget should not be exceeded
    if (currentSpent + newCost > parseFloat(trip.budget)) {
      setError('Budget exceeded! Cannot add this activity.');
      return;
    }

    // Create new activity object
    const newActivity = {
      id: Date.now().toString(),
      activity: activity.trim(),
      day,
      cost: newCost.toFixed(2)
    };

    try {
      const trips = getTrips();

      // Update only the selected trip
      const updatedTrips = trips.map(t =>
        t.id === id
          ? {
              ...t,

              // Immutable update of itinerary array
              itinerary: [...(t.itinerary || []), newActivity]
            }
          : t
      );

      // Save updated data
      saveTrips(updatedTrips);

      // Reset form fields (controlled components)
      setActivity('');
      setCost('');
      setDay('Day 1');

      // Reload updated trip data
      loadTrip();

    } catch {
      setError('Failed to add activity');
    }
  };

  // Delete activity function
  const handleDeleteActivity = (activityId) => {
    try {
      const trips = getTrips();

      // Remove selected activity
      const updatedTrips = trips.map(t =>
        t.id === id
          ? {
              ...t,

              // Filtering out deleted activity
              itinerary: (t.itinerary || []).filter(item => item.id !== activityId)
            }
          : t
      );

      saveTrips(updatedTrips);

      // Refresh UI
      loadTrip();
    } catch {}
  };

  // Conditional rendering - while data is loading
  if (!trip) {
    return (
      <div className="page-container">
        <p>Loading trip...</p>
      </div>
    );
  }

  // Calculate budget stats (separation of logic)
  const { totalSpent, remaining, percentage } = calculateBudget(trip);

  return (
    <div className="page-container">

      {/* Navigation using hook */}
      <button onClick={() => navigate('/')} className="back-button">
        ← Back
      </button>

      {/* JSX rendering dynamic data */}
      <div className="trip-details-header">
        <h1 className="page-title">{trip.name}</h1>
        <p className="page-subtitle">
          {trip.itinerary?.length || 0} activities planned
        </p>
      </div>

      {/* Budget display section */}
      <div className="budget-overview">
        <div className="budget-card">
          <h3>Budget Overview</h3>

          <div className="budget-stats">
            <div>
              <p>Total</p>
              <p className="budget-stat-amount">
                Rs {parseFloat(trip.budget).toFixed(2)}
              </p>
            </div>

            <div>
              <p>Spent</p>
              <p className="budget-stat-amount">
                Rs {totalSpent.toFixed(2)}
              </p>
            </div>

            <div>
              <p>Remaining</p>
              <p className="budget-stat-amount">
                {remaining >= 0
                  ? `Rs ${remaining.toFixed(2)}`
                  : `Exceeded by Rs ${Math.abs(remaining).toFixed(2)}`
                }
              </p>
            </div>
          </div>

          {/* Dynamic styling - width based on percentage */}
          <div className="budget-bar">
            <div
              className="budget-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p>{percentage.toFixed(0)}% used</p>
        </div>
      </div>

      {/* Layout section */}
      <div className="content-grid">

        {/* Form section (controlled inputs) */}
        <div className="form-container">
          <h2 className="form-title">Add Activity</h2>

          {/* Conditional error display */}
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleAddActivity} className="activity-form">

            <div className="form-group">
              <label className="form-label">Activity Name</label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)} // controlled input
                className="form-input"
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label className="form-label">Day</label>

                {/* Controlled select input */}
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="form-select"
                >
                  <option>Day 1</option>
                  <option>Day 2</option>
                  <option>Day 3</option>
                  <option>Day 4</option>
                  <option>Day 5</option>
                  <option>Day 6</option>
                  <option>Day 7</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Cost (Rs)</label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="form-input"
                />
              </div>

            </div>

            <button type="submit" className="submit-button">
              Add Activity
            </button>
          </form>
        </div>

        {/* Rendering child components using map (dataflow via props) */}
        <div className="itinerary-container">
          <h2>Itinerary</h2>

          {/* Conditional rendering */}
          {!trip.itinerary || trip.itinerary.length === 0 ? (
            <p>No activities yet.</p>
          ) : (
            <div className="itinerary-list">

              {/* Passing data + function as props */}
              {trip.itinerary.map((item) => (
                <ItineraryItem
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteActivity}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;