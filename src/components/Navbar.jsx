import React from 'react';

// Link → used instead of <a> to avoid page reload
// useLocation → gives current URL path (used for active styling)
import { Link, useLocation } from 'react-router-dom';

import '../styles/navbar.css';
import { Plane } from 'lucide-react';

// Functional Component
const Navbar = () => {

  // Hook → gives current route info
  const location = useLocation();

  return (
    // JSX → HTML-like syntax inside JavaScript
    <nav className="navbar">
      <div className="navbar-container">

        {/* Clicking this navigates to home */}
        <Link to="/" className="navbar-logo">
          <Plane size={20} />
          <span>TravelPro</span>
        </Link>

        <div className="navbar-menu">

          {/* Conditional styling using JS inside JSX */}
          <Link
            to="/"
            className={`navbar-link ${location.pathname === "/" ? "active-btn" : ""}`}
          >
            My Trips
          </Link>

          <Link
            to="/create"
            className={`navbar-link ${location.pathname === "/create" ? "active-btn" : ""}`}
          >
            Create Trip
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;