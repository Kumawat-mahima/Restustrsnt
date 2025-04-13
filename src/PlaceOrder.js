import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';

function PlaceOrder() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locationFetched, setLocationFetched] = useState(false);  // To track if location is fetched

  // Fetching location using geolocation API
  const fetchLocation = () => {
    setLoading(true);
    setErrorMessage('');
    setLocation('Fetching your location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || 'your area';
            setLocation(`✅ Your order will be delivered in ${city}.`);
            setLocationFetched(true);  // Set location as fetched
          } catch (error) {
            setErrorMessage('❌ Could not fetch location details.');
            setLocation('');
          }
          setLoading(false);
        },
        () => {
          setErrorMessage('❌ Location access denied.');
          setLocation('');
          setLoading(false);
        }
      );
    } else {
      setErrorMessage('❌ Geolocation not supported.');
      setLocation('');
      setLoading(false);
    }
  };

  // Handle the submission when location is entered or fetched
  const handleLocationSubmit = () => {
    const finalLocation = location || manualInput.trim();
    if (finalLocation) {
      setLocation(finalLocation);

      // If location is fetched, navigate after a small delay
      if (locationFetched) {
        setTimeout(() => navigate('/payment', { state: { location: finalLocation } }), 1000);
      } else {
        // If manual location is provided, navigate immediately
        navigate('/payment', { state: { location: finalLocation } });
      }
    } else {
      setErrorMessage('❌ Please provide a valid location.');
    }
  };

  return (
    <div className="place-order-page">
      <div className="order-box">
        <div className="location-options">
          {/* Display loading message above the input section */}
          {loading && <p className="loading-msg">📍 Fetching your location...</p>}
          
          {/* Button to fetch location */}
          <button onClick={fetchLocation} disabled={loading}>
            📍 Use My Current Location
          </button>

          <div className="or-divider">OR</div>

          {/* Input for manual location */}
          <input
            type="text"
            placeholder="Enter your location"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleLocationSubmit} disabled={loading || (!manualInput.trim() && !location)}>
            ✅ Submit Location
          </button>
        </div>

        {/* Display location or error messages */}
        {location && <p className="location-msg">{location}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default PlaceOrder;
