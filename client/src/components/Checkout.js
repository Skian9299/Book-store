import React, { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Checkout</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-lg">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Shipping Address</label>
          <textarea className="form-control" name="address" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select className="form-select" name="paymentMethod" onChange={handleChange}>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
