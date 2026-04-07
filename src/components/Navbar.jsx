import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';
import { Plane } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <Plane size={20} />
          <span>TravelPro</span>
        </Link>

        <div className="navbar-menu">

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