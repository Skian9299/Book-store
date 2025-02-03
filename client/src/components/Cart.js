import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.patch(`/cart/${id}`, { quantity: newQuantity });
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.title}</h5>
                <p className="text-muted">Price: {item.price}</p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-secondary me-2" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-secondary ms-2" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;