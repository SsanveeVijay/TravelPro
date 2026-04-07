import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';
import { Trash2, DollarSign } from 'lucide-react';

const ItineraryItem = ({ item, onDelete }) => {
  return (
    <div className="itinerary-item" data-testid={`itinerary-item-${item?.id}`}>
      <div className="itinerary-content">
        <div className="itinerary-day-badge" data-testid="itinerary-day">
          {item?.day || 'Day 1'}
        </div>
        <div className="itinerary-details">
          <p className="itinerary-activity" data-testid="itinerary-activity">{item?.activity || 'No activity'}</p>
          {item?.cost && (
            <p className="itinerary-cost" data-testid="itinerary-cost">
              <DollarSign size={14} />
              ${parseFloat(item.cost).toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <button 
        onClick={() => onDelete(item?.id)}
        className="delete-button"
        data-testid="delete-itinerary-button"
        aria-label="Delete activity"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

ItineraryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ItineraryItem;
