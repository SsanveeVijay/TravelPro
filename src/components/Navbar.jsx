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
          <Plane size={22} />
          <span>TravelPro</span>
        </Link>

        <div className="navbar-menu">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "navbar-link active-btn"
                : "navbar-link"
            }
          >
            My Trips
          </Link>

          <Link
            to="/create"
            className={
              location.pathname === "/create"
                ? "navbar-link active-btn"
                : "navbar-link"
            }
          >
            Create Trip
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;