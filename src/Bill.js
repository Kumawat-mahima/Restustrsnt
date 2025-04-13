// bill.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bill.css';

function Bill() {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(0);

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  useEffect(() => {
    setDiscountedTotal(total);
  }, [total]);

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'foodie10') {
      setCouponMessage('✅ Coupon applied: 10% off!');
      setDiscountedTotal((total * 0.9).toFixed(2));
    } else {
      setCouponMessage('❌ Invalid coupon code');
      setDiscountedTotal(total);
    }
  };

  const placeOrder = () => {
    alert('✅ Order placed successfully!');
    localStorage.removeItem('cart');
    localStorage.removeItem('quantities');
    setTimeout(() => navigate('/payment'), 1000);
  };

  const backToMenu = () => navigate('/menu');

  return (
    <div className="bill-page">
      <h2>🧾 Your Bill</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <table className="bill-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3"><strong>Grand Total</strong></td>
              <td><strong>₹{discountedTotal}</strong></td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="bill-buttons">
        {/* Back Button */}
        <button className="btn-back" onClick={backToMenu}>⬅️ Back to Menu</button>

        {/* Coupon Input Section */}
        <div className="coupon-section">
          <label className="coupon-label" htmlFor="coupon-input">Got a coupon code?</label>
          <input
            id="coupon-input"
            type="text"
            placeholder="e.g. FOODIE10"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="btn-coupon" onClick={applyCoupon}>🎟️ Apply Coupon</button>
          {couponMessage && (
            <p className={`coupon-message ${couponMessage.includes('✅') ? 'success' : 'error'}`}>
              {couponMessage}
            </p>
          )}
        </div>

        {/* Place Order Button */}
        <button className="btn-order" onClick={placeOrder} disabled={cart.length === 0}>🛍️ Place Order</button>
      </div>
    </div>
  );
}

export default Bill;
