import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';
import { Trash2 } from 'lucide-react';

const ItineraryItem = ({ item, onDelete }) => {
  return (
    <div className="itinerary-item">
      <div className="itinerary-content">
        
        <div className="itinerary-day-badge">
          {item.day || 'Day 1'}
        </div>

        <div className="itinerary-details">
          <p className="itinerary-activity">
            {item.activity || 'No activity'}
          </p>

          {item.cost && (
            <p className="itinerary-cost">
              Rs {parseFloat(item.cost).toFixed(2)}
            </p>
          )}
        </div>

      </div>

      <button 
        onClick={() => onDelete(item.id)}
        className="delete-button"
      >
        <Trash2 size={16} />
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