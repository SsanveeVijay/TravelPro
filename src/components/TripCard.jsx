import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/card.css';
import { calculateBudget } from '../utils/budget';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const itineraryCount = trip.itinerary?.length || 0;
  const { totalSpent, remaining, percentage } = calculateBudget(trip);

  return (
    <div className="trip-card" onClick={() => navigate(`/trip/${trip.id}`)}>
      <div className="trip-card-header">
        <h3 className="trip-card-title">
          {trip.name || 'Untitled Trip'}
        </h3>

        <div className="trip-card-badge">
          {itineraryCount} {itineraryCount === 1 ? 'Activity' : 'Activities'}
        </div>
      </div>

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
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="budget-remaining">
          {remaining >= 0
            ? `Rs ${remaining.toFixed(2)} left`
            : `Rs ${Math.abs(remaining).toFixed(2)} over`}
        </p>
      </div>
    </div>
  );
};

TripCard.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripCard;