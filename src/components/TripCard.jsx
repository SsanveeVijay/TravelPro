import React from 'react';

// PropTypes - used for props validation
import PropTypes from 'prop-types';

// Hook - used for navigation
import { useNavigate } from 'react-router-dom';

import '../styles/card.css';
import { calculateBudget } from '../utils/budget';

// Functional component receiving props
// props = data passed from parent (Home component)
const TripCard = ({ trip, onDelete }) => {

  // Hook → allows navigation
  const navigate = useNavigate();

  // Derived data from props
  const itineraryCount = trip.itinerary?.length || 0;

  // Using utility function, separation of logic
  const { totalSpent, remaining, percentage } = calculateBudget(trip);

  return (
    <div
      className="trip-card"

      // Clicking card navigates to details page
      onClick={() => navigate(`/trip/${trip.id}`)}
    >

      {/* Event handling + stopping propagation */}
      <button
        className="delete-trip-btn"
        onClick={(e) => {
          e.stopPropagation(); // prevents parent click (navigation)
          onDelete(trip.id);   // calling parent function via props
        }}
      >
        Delete
      </button>

      {/* JSX rendering dynamic values */}
      <div className="trip-card-header">
        <h3 className="trip-card-title">
          {trip.name || 'Untitled Trip'}
        </h3>

        <div className="trip-card-badge">
          {itineraryCount} {itineraryCount === 1 ? 'Activity' : 'Activities'}
        </div>
      </div>

      {/* Data display */}
      <div className="trip-card-content">
        <div className="trip-stat">
          <p className="trip-stat-label">Budget</p>
          <p className="trip-stat-value">
            Rs {parseFloat(trip.budget || 0).toFixed(2)}
          </p>
        </div>

        <div className="trip-stat">
          <p className="trip-stat-label">Spent</p>
          <p className="trip-stat-value">
            Rs {totalSpent.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Styling + dynamic width using inline style */}
      <div className="budget-tracker">
        <div className="budget-info">
          <span className="budget-label">Used</span>
          <span className="budget-percentage">
            {percentage.toFixed(0)}%
          </span>
        </div>

        <div className="budget-bar">
          <div
            className="budget-fill"

            // Dynamic styling, React inline styles
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Conditional rendering */}
        <p className="budget-remaining">
          {remaining >= 0
            ? `Rs ${remaining.toFixed(2)} left`
            : `Rs ${Math.abs(remaining).toFixed(2)} over`}
        </p>
      </div>
    </div>
  );
};

// Props validation
TripCard.propTypes = {
  trip: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TripCard;