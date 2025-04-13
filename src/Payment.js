import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { location: deliveryLocation } = location.state || {}; // Access location passed from PlaceOrder
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handleProceedToPay = () => {
    // Check if a payment method is selected
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Navigate to PayToProceed, passing both location and selected payment method
    navigate('/paytoproceed', {
      state: { 
        deliveryLocation, 
        paymentMethod: selectedPaymentMethod 
      }
    });
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>💳 Payment</h2>
        <p>Your order will be delivered to: <strong>{deliveryLocation || 'N/A'}</strong></p>
      </div>
      
      <div className="payment-body">
        <h3>Choose your payment method:</h3>

        <div className="payment-methods">
          <div 
            className={`payment-method ${selectedPaymentMethod === 'Visa' ? 'selected' : ''}`}
            onClick={() => setSelectedPaymentMethod('Visa')}
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEtvNDhCItb6OIiVKpzCb1OiHMdRnoeDexmg&s" alt="Visa" className="payment-icon" />
            <p>Visa</p>
          </div>

          <div 
            className={`payment-method ${selectedPaymentMethod === 'Phone Pe' ? 'selected' : ''}`}
            onClick={() => setSelectedPaymentMethod('Phone Pe')}
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivMT_DhDeXQxWdV3uJpl9QilEIQOLlvEJ1Q&s" alt="Phone Pe" className="payment-icon" />
            <p>Phone Pe</p>
          </div>

          <div 
            className={`payment-method ${selectedPaymentMethod === 'Google Pay' ? 'selected' : ''}`}
            onClick={() => setSelectedPaymentMethod('Google Pay')}
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdRbWgQnvCW8WkV5A4MbdVg1VVUsLPyMTloA&s" alt="Google Pay" className="payment-icon" />
            <p>Google Pay</p>
          </div>
        </div>

        <button className="pay-now-btn" onClick={handleProceedToPay}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Payment;
