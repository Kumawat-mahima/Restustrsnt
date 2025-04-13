import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const menuItems = [
  { name: "Margherita Pizza", price: 250, image: "https://safrescobaldistatic.blob.core.windows.net/media/2022/11/PIZZA-MARGHERITA.jpg" },
  { name: "Paneer Tikka", price: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjU3AT9r8228is-t5JHuLCk2InG0PID_mpRw&s" },
  { name: "Gulab Jamun", price: 120, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_oI9T2AZBP9AFY0FuflyORBbI5je9QP0OsA&s" },
  { name: "Masala Dosa", price: 150, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sjxaooBtw7ZY8XdJxRo0SSoRieb80OVOLQ&s" },
  { name: "Cold Coffee", price: 70, image: "https://www.milkmaid.in/sites/default/files/2024-05/Cold-Coffee-335x300.jpg" },
  { name: "Pasta", price: 100, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGxJQNLQ_tpfDqgGfFpEARarc7qNGTDVEYg&s" },
  { name: "Strawberry Shake", price: 80, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkA0votyqmVK3N2S_Gk_qItelyhhe0A-fKqA&s" },
  { name: "Cheese Sandwich", price: 140, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuj8s13vXLL0O3poEAh7JqXNiDBoVhsBUIw&s" },
  { name: "Burger", price: 95, image: "https://www.recipetineats.com/tachyon/2023/09/Crispy-fried-chicken-burgers_5.jpg" },
  { name: "French Fries", price: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYOFvOMlVJiBKvxYuwjBGzEx55zkA-I1dWFQ&s" },
];

function Menu() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState(() => {
    const stored = localStorage.getItem('quantities');
    return stored ? JSON.parse(stored) : Array(menuItems.length).fill(0);
  });

  // Load cart from localStorage on first load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save quantities to localStorage when they change
  useEffect(() => {
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [quantities]);

  const addToCart = (item, index) => {
    const quantity = quantities[index];
    if (quantity > 0) {
      const newItem = { ...item, quantity };

      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex(i => i.name === item.name);
        if (existingIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingIndex].quantity += quantity;
          return updatedCart;
        }
        return [...prevCart, newItem];
      });

      const updatedQuantities = [...quantities];
      updatedQuantities[index] = 0;
      setQuantities(updatedQuantities);

      alert(`${quantity} x ${item.name} added to cart! 🛒`);
    } else {
      alert('Please select a quantity greater than 0.');
    }
  };

  const increaseQty = (index) => {
    const updated = [...quantities];
    updated[index]++;
    setQuantities(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...quantities];
    if (updated[index] > 0) updated[index]--;
    setQuantities(updated);
  };

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="menu-page">
      <h2 className="menu-title">
        🍽️ Our Menu <span className="cart-count">({totalItemsInCart} items in cart)</span>
      </h2>

      <button className="floating-bill-btn" onClick={() => navigate("/bill")}>
        💳 Bill
      </button>

      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.image} alt={item.name} className="menu-img" />
            <h3 className="menu-name">{item.name}</h3>
            <p className="menu-price">₹{item.price.toLocaleString('en-IN')}</p>

            <div className="quantity-control">
              <button onClick={() => decreaseQty(index)} className="qty-btn">-</button>
              <span className="qty-number">{quantities[index]}</span>
              <button onClick={() => increaseQty(index)} className="qty-btn">+</button>
            </div>

            <button
              onClick={() => addToCart(item, index)}
              className={`add-btn ${quantities[index] === 0 ? 'disabled' : ''}`}
              disabled={quantities[index] === 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
