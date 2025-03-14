import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import image5 from '../../assets/images/imageHero.jpg';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{  backgroundImage: `url(${image5})`, backgroundSize: 'cover', height: '100vh', color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Reliable Rides, Anytime, Anywhere</h1>
        <p>Book a cab in minutes</p>
        <button className="btn btn-primary" style={{ marginTop: '20px', padding: '15px 30px', fontSize: '1.2rem' }}>Book Now</button>
      </div>

      {/* Service Overview */}
      <div className="container my-5">
        <div className="row text-center">
          <div className="col-md-3">
            <i className="fas fa-clock fa-3x" style={{ color: '#007bff' }}></i>
            <h3>24/7 Availability</h3>
            <p>We’re always here for you.</p>
          </div>
          <div className="col-md-3">
            <i className="fas fa-dollar-sign fa-3x" style={{ color: '#007bff' }}></i>
            <h3>Affordable Pricing</h3>
            <p>Rides that won’t break your budget.</p>
          </div>
          <div className="col-md-3">
            <i className="fas fa-shield-alt fa-3x" style={{ color: '#007bff' }}></i>
            <h3>Safe Rides</h3>
            <p>Your safety is our priority.</p>
          </div>
          <div className="col-md-3">
            <i className="fas fa-car fa-3x" style={{ color: '#007bff' }}></i>
            <h3>Professional Drivers</h3>
            <p>Experienced drivers for your comfort.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
