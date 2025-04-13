import React from 'react';
import './App.css';
import foodImage from './food.avif';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Menu from './Menu';
import Login from './Login';
import Bill from './Bill'; // Bill import added
import PlaceOrder from './PlaceOrder'; // Must match file name
import Payment from './Payment'; // Add this line to import Payment component
import PayToProceed from './PayToProceed';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-logo">🍽️ Mahima's Restaurant</div>
        <div className="nav-links">
          <Link to="/">
            <button className="nav-button">Home</button>
          </Link>
          <Link to="/menu">
            <button className="nav-button">Menu</button>
          </Link>
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
          <Link to="/settings">
            <button className="nav-button">Settings</button>
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bill" element={<Bill />} /> {/* Bill route added */}
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/payment" element={<Payment cartTotal={50} />} /> {/* Add Payment Route */}
        <Route path="/paytoproceed" element={<PayToProceed />} />
      </Routes>
    </Router>
  );
}

export default App;

// Home Component
function Home() {
  return (
    <>
      <div className="front-page">
        <img src={foodImage} alt="Delicious Food" className="hero-image" />
        <h1>🍽️ Welcome to Mahima's Restaurant</h1>
        <p>Delicious food, delivered fresh & hot!</p>
        <Link to="/menu">
          <button>View Menu</button>
        </Link>
      </div>
    </>
  );
}

// Settings Component
function Settings() {
  return (
    <div className="page-container">
      <h2>⚙️ Settings</h2>
      <p>Manage your account preferences here.</p>
    </div>
  );
}
