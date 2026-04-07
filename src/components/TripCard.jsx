import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/card.css';
import { MapPin, DollarSign, Calendar } from 'lucide-react';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  
  const itineraryCount = trip?.itinerary?.length || 0;
  const totalSpent = trip?.itinerary?.reduce((sum, item) => sum + (parseFloat(item?.cost) || 0), 0) || 0;
  const remainingBudget = (parseFloat(trip?.budget) || 0) - totalSpent;
  const budgetPercentage = trip?.budget ? Math.min((totalSpent / parseFloat(trip.budget)) * 100, 100) : 0;

  const handleClick = () => {
    navigate(`/trip/${trip?.id}`);
  };

  return (
    <div 
      className="trip-card" 
      onClick={handleClick}
      data-testid={`trip-card-${trip?.id}`}
    >
      <div className="trip-card-header">
        <h3 className="trip-card-title" data-testid="trip-card-title">{trip?.name || 'Untitled Trip'}</h3>
        <div className="trip-card-badge">
          <Calendar size={14} />
          <span>{itineraryCount} {itineraryCount === 1 ? 'Activity' : 'Activities'}</span>
        </div>
      </div>
      
      <div className="trip-card-content">
        <div className="trip-stat">
          <DollarSign size={18} className="trip-icon" />
          <div>
            <p className="trip-stat-label">Budget</p>
            <p className="trip-stat-value" data-testid="trip-budget">${parseFloat(trip?.budget || 0).toFixed(2)}</p>
          </div>
        </div>
        
        <div className="trip-stat">
          <MapPin size={18} className="trip-icon" />
          <div>
            <p className="trip-stat-label">Spent</p>
            <p className="trip-stat-value" data-testid="trip-spent">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="budget-tracker">
        <div className="budget-info">
          <span className="budget-label">Budget Used</span>
          <span className="budget-percentage" data-testid="budget-percentage">{budgetPercentage.toFixed(0)}%</span>
        </div>
        <div className="budget-bar">
          <div 
            className={`budget-fill ${budgetPercentage > 100 ? 'over-budget' : ''}`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            data-testid="budget-bar-fill"
          ></div>
        </div>
        <p className="budget-remaining" data-testid="budget-remaining">
          {remainingBudget >= 0 
            ? `$${remainingBudget.toFixed(2)} remaining` 
            : `$${Math.abs(remainingBudget).toFixed(2)} over budget`}
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
    itinerary: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        activity: PropTypes.string,
        day: PropTypes.string,
        cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    )
  }).isRequired
};

export default TripCard;
