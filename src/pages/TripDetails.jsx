import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItineraryItem from '../components/ItineraryItem';
import '../styles/form.css';
import { calculateBudget } from '../utils/budget';
import { getTrips, saveTrips } from '../utils/storage';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [activity, setActivity] = useState('');
  const [day, setDay] = useState('Day 1');
  const [cost, setCost] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadTrip();
  }, [id]);

  const loadTrip = () => {
    try {
      const trips = getTrips();
      const foundTrip = trips.find(t => t.id === id);

      if (foundTrip) setTrip(foundTrip);
      else navigate('/');
    } catch {
      navigate('/');
    }
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    setError('');

    if (!activity.trim()) {
      setError('Please enter an activity name');
      return;
    }

    if (cost && parseFloat(cost) < 0) {
      setError('Cost cannot be negative');
      return;
    }

    const newActivity = {
      id: Date.now().toString(),
      activity: activity.trim(),
      day,
      cost: cost ? parseFloat(cost).toFixed(2) : '0.00'
    };

    try {
      const trips = getTrips();

      const updatedTrips = trips.map(t =>
        t.id === id
          ? { ...t, itinerary: [...(t.itinerary || []), newActivity] }
          : t
      );

      saveTrips(updatedTrips);

      setActivity('');
      setCost('');
      setDay('Day 1');
      loadTrip();
    } catch {
      setError('Failed to add activity');
    }
  };

  const handleDeleteActivity = (activityId) => {
    try {
      const trips = getTrips();

      const updatedTrips = trips.map(t =>
        t.id === id
          ? {
              ...t,
              itinerary: (t.itinerary || []).filter(item => item.id !== activityId)
            }
          : t
      );

      saveTrips(updatedTrips);
      loadTrip();
    } catch {}
  };

  if (!trip) {
    return (
      <div className="page-container">
        <p>Loading trip...</p>
      </div>
    );
  }

  const { totalSpent, remaining, percentage } = calculateBudget(trip);

  return (
    <div className="page-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back
      </button>

      <div className="trip-details-header">
        <h1 className="page-title">{trip.name}</h1>
        <p className="page-subtitle">
          {trip.itinerary?.length || 0} activities planned
        </p>
      </div>

      <div className="budget-overview">
        <div className="budget-card">
          <h3>Budget Overview</h3>

         <div className="budget-stats">
  <div>
    <p>Total</p>
    <p className="budget-stat-amount">Rs {parseFloat(trip.budget).toFixed(2)}</p>
  </div>

  <div>
    <p>Spent</p>
    <p className="budget-stat-amount">Rs {totalSpent.toFixed(2)}</p>
  </div>

  <div>
    <p>Remaining</p>
    <p className="budget-stat-amount">
      Rs {Math.abs(remaining).toFixed(2)}
    </p>
  </div>
</div>

          <div className="budget-bar">
            <div
              className="budget-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p>{percentage.toFixed(0)}% used</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="form-container">
          <h2 className="form-title">Add Activity</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleAddActivity} className="activity-form">
            <div className="form-group">
              <label className="form-label">Activity Name</label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Day</label>
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

        <div className="itinerary-container">
          <h2>Itinerary</h2>

          {!trip.itinerary || trip.itinerary.length === 0 ? (
            <p>No activities yet.</p>
          ) : (
            <div className="itinerary-list">
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