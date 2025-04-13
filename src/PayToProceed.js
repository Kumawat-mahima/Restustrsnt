import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PayToProceed.css';

const PayToProceed = () => {
  const navigate = useNavigate(); // for going back to home
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePayment = () => {
    if (!amount) {
      setErrorMessage('❌ Please enter an amount.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);

    // Simulate 5-second payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMessage(`✅ ₹${amount} has been debited from your account and credited to Mahima's Restaurant.`);
    }, 5000);
  };

  return (
    <div className="pay-container">
      <div className="pay-box">
        <div className="upi-header">
          <div className="circle-avatar">PB</div>
          <div>
            <h3>Mahima's Restaurant</h3>
            <p className="upi-id">94xxxxxxx-8@ofnjnzf</p>
          </div>
        </div>

        {!successMessage && (
          <>
            <input
              type="number"
              placeholder="₹ Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="amount-input"
              disabled={isProcessing}
            />

            <input
              type="text"
              placeholder="Add a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
              disabled={isProcessing}
            />
          </>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {isProcessing && <p className="processing-message">⏳ Processing Payment...</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {!successMessage && (
          <button
            className="pay-button"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'PROCEED TO PAY'}
          </button>
        )}

        {successMessage && (
          <button
            className="home-button"
            onClick={() => navigate('/')}
          >
            ⬅️ Back to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default PayToProceed;
