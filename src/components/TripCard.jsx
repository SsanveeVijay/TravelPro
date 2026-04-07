import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/card.css';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const itineraryCount = trip.itinerary?.length || 0;

  const totalSpent =
    trip.itinerary?.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0) || 0;

  const remainingBudget = (parseFloat(trip.budget) || 0) - totalSpent;

  const budgetPercentage = trip.budget
    ? Math.min((totalSpent / parseFloat(trip.budget)) * 100, 100)
    : 0;

  const handleClick = () => {
    navigate(`/trip/${trip.id}`);
  };

  return (
    <div className="trip-card" onClick={handleClick}>
      
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
            {budgetPercentage.toFixed(0)}%
          </span>
        </div>

        <div className="budget-bar">
          <div
            className="budget-fill"
            style={{ width: `${budgetPercentage}%` }}
          ></div>
        </div>

        <p className="budget-remaining">
          {remainingBudget >= 0
            ? `Rs ${remainingBudget.toFixed(2)} left`
            : `Rs ${Math.abs(remainingBudget).toFixed(2)} over`}
        </p>

      </div>

    </div>
  );
};

TripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    itinerary: PropTypes.array
  }).isRequired
};

export default TripCard;