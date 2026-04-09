import React from 'react';

// React Router is used for navigation between pages without reloading the site
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Importing different components (this shows component-based architecture)
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';

// Global CSS styling applied to entire app
import './styles/global.css';

// Functional Component (modern React approach using functions instead of classes)
function App() {
  return (
    <div>
      {/* Router wraps entire app → enables client-side routing */}
      <Router>

        {/* Navbar is a reusable component visible on all pages */}
        <Navbar />

        {/* Routes define different paths and which component to render */}
        <Routes>

          {/* When URL is "/", Home component is rendered */}
          <Route path="/" element={<Home />} />

          {/* When URL is "/create", CreateTrip component is rendered */}
          <Route path="/create" element={<CreateTrip />} />

          {/* Dynamic routing: :id allows different trip IDs */}
          <Route path="/trip/:id" element={<TripDetails />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;