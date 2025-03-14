import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // Remove user token and ID from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">🚗 Mega City Cabs</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light fw-semibold" to="/cars">Cars</Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light fw-semibold" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-warning px-3 py-1 rounded" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button 
                  className="btn btn-danger px-3 py-1 rounded fw-bold" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
