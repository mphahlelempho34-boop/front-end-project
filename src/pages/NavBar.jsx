
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // 1. Import useLocation [3]
import "./NavBar.css"

function NavBar() {
  const location = useLocation(); // 2. Grab the current active path [3]

  // 3. If the path is exactly "/", don't render anything at all [3]
  if (location.pathname === "/") {
    return null;
  }
  else if (location.pathname === "/Registration") {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Books App</Link>
      </div>
      <div className="navbar-links">
        
        <Link to="/Home" className="nav-link">Add A Book</Link>
        <Link to="/Home" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
    </nav>
  );
}

export default NavBar;
