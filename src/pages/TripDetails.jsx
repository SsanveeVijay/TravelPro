import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItineraryItem from '../components/ItineraryItem';
import '../styles/form.css';
import { Plus, ArrowLeft, DollarSign, TrendingUp } from 'lucide-react';

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
      const storedTrips = localStorage.getItem('travelProTrips');
      if (storedTrips) {
        const trips = JSON.parse(storedTrips);
        const foundTrip = trips.find(t => t.id === id);
        if (foundTrip) {
          setTrip(foundTrip);
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading trip:', error);
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
      const storedTrips = localStorage.getItem('travelProTrips');
      const trips = JSON.parse(storedTrips || '[]');
      const updatedTrips = trips.map(t => {
        if (t.id === id) {
          return {
            ...t,
            itinerary: [...(t.itinerary || []), newActivity]
          };
        }
        return t;
      });
      
      localStorage.setItem('travelProTrips', JSON.stringify(updatedTrips));
      setActivity('');
      setCost('');
      setDay('Day 1');
      loadTrip();
    } catch (error) {
      console.error('Error adding activity:', error);
      setError('Failed to add activity. Please try again.');
    }
  };

  const handleDeleteActivity = (activityId) => {
    try {
      const storedTrips = localStorage.getItem('travelProTrips');
      const trips = JSON.parse(storedTrips || '[]');
      const updatedTrips = trips.map(t => {
        if (t.id === id) {
          return {
            ...t,
            itinerary: (t.itinerary || []).filter(item => item.id !== activityId)
          };
        }
        return t;
      });
      
      localStorage.setItem('travelProTrips', JSON.stringify(updatedTrips));
      loadTrip();
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  if (!trip) {
    return (
      <div className="page-container" data-testid="loading-state">
        <p>Loading trip...</p>
      </div>
    );
  }

  const totalSpent = trip.itinerary?.reduce((sum, item) => sum + (parseFloat(item?.cost) || 0), 0) || 0;
  const remainingBudget = parseFloat(trip.budget) - totalSpent;
  const budgetPercentage = Math.min((totalSpent / parseFloat(trip.budget)) * 100, 100);

  return (
    <div className="page-container" data-testid="trip-details-page">
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
        data-testid="back-button"
      >
        <ArrowLeft size={20} />
        Back to Trips
      </button>

      <div className="trip-details-header">
        <div>
          <h1 className="page-title" data-testid="trip-name">{trip.name}</h1>
          <p className="page-subtitle">{trip.itinerary?.length || 0} activities planned</p>
        </div>
      </div>

      <div className="budget-overview" data-testid="budget-overview">
        <div className="budget-card">
          <div className="budget-card-header">
            <DollarSign size={24} className="budget-icon" />
            <span>Budget Overview</span>
          </div>
          <div className="budget-stats">
            <div className="budget-stat-item">
              <span className="budget-stat-label">Total Budget</span>
              <span className="budget-stat-amount" data-testid="total-budget">${parseFloat(trip.budget).toFixed(2)}</span>
            </div>
            <div className="budget-stat-item">
              <span className="budget-stat-label">Total Spent</span>
              <span className="budget-stat-amount spent" data-testid="total-spent">${totalSpent.toFixed(2)}</span>
            </div>
            <div className="budget-stat-item">
              <span className="budget-stat-label">Remaining</span>
              <span className={`budget-stat-amount ${remainingBudget < 0 ? 'over' : 'remaining'}`} data-testid="remaining-budget">
                ${Math.abs(remainingBudget).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="budget-progress">
            <div className="budget-progress-bar">
              <div 
                className={`budget-progress-fill ${budgetPercentage >= 100 ? 'full' : ''}`}
                style={{ width: `${budgetPercentage}%` }}
                data-testid="budget-progress-fill"
              ></div>
            </div>
            <span className="budget-progress-text" data-testid="budget-progress-text">{budgetPercentage.toFixed(0)}% used</span>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="form-container">
          <h2 className="section-title">Add Activity</h2>
          <form onSubmit={handleAddActivity} className="activity-form" data-testid="activity-form">
            {error && (
              <div className="error-message" data-testid="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="activity" className="form-label">Activity Name</label>
              <input
                type="text"
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="e.g., Visit Eiffel Tower"
                className="form-input"
                data-testid="activity-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="day" className="form-label">Day</label>
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="form-select"
                  data-testid="day-select"
                >
                  <option value="Day 1">Day 1</option>
                  <option value="Day 2">Day 2</option>
                  <option value="Day 3">Day 3</option>
                  <option value="Day 4">Day 4</option>
                  <option value="Day 5">Day 5</option>
                  <option value="Day 6">Day 6</option>
                  <option value="Day 7">Day 7</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cost" className="form-label">Cost ($)</label>
                <input
                  type="number"
                  id="cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="form-input"
                  data-testid="cost-input"
                />
              </div>
            </div>

            <button type="submit" className="submit-button" data-testid="add-activity-button">
              <Plus size={20} />
              Add Activity
            </button>
          </form>
        </div>

        <div className="itinerary-container">
          <h2 className="section-title">Itinerary</h2>
          {!trip.itinerary || trip.itinerary.length === 0 ? (
            <div className="empty-itinerary" data-testid="empty-itinerary">
              <TrendingUp size={48} className="empty-icon" />
              <p>No activities yet. Start adding to your itinerary!</p>
            </div>
          ) : (
            <div className="itinerary-list" data-testid="itinerary-list">
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
