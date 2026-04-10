import React from 'react';
import PropTypes from 'prop-types'; // Used for validating props
import '../styles/card.css';
import { Trash2 } from 'lucide-react'; // Icon for delete button

// Functional component receiving props from parent (TripDetails)
const ItineraryItem = ({ item, onDelete }) => {
  return (
    // Main container for a single itinerary item
    <div className="itinerary-item">

      {/* Left section containing activity details */}
      <div className="itinerary-content">
        
        {/* Displays the day of the activity */}
        {/* If day is not provided, defaults to 'Day 1' */}
        <div className="itinerary-day-badge">
          {item.day || 'Day 1'}
        </div>

        {/* Activity details section */}
        <div className="itinerary-details">

          {/* Displays activity name */}
          {/* If no activity is provided, shows fallback text */}
          <p className="itinerary-activity">
            {item.activity || 'No activity'}
          </p>

          {/* Conditional rendering:
              Cost is only displayed if it exists */}
          {item.cost && (
            <p className="itinerary-cost">

              {/* parseFloat ensures value is treated as a number
                  toFixed(2) formats it to 2 decimal places */}
              Rs {parseFloat(item.cost).toFixed(2)}
            </p>
          )}
        </div>

      </div>

      {/* Delete button for removing the activity */}
      <button 
        onClick={() => onDelete(item.id)} // Calls parent function with item ID
        className="delete-button"
      >
        <Trash2 size={16} /> {/* Trash icon */}
      </button>

    </div>
  );
};

// PropTypes used for validating props passed to this component
ItineraryItem.propTypes = {

  // item must be an object with a specific structure
  item: PropTypes.shape({

    // id must be a string and is required
    id: PropTypes.string.isRequired,

    // activity name must be a string and required
    activity: PropTypes.string.isRequired,

    // day must be a string and required
    day: PropTypes.string.isRequired,

    // cost can be either string or number (optional field)
    cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number])

  }).isRequired,

  // onDelete must be a function and is required
  onDelete: PropTypes.func.isRequired
};

export default ItineraryItem;