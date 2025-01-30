import React from "react";
import './Footer.css';  // Link to the CSS for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <p>&copy; 2025 Your Bookstore. All Rights Reserved.</p>
        </div>

        <div className="footer-section social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

        <div className="footer-section links">
          <a href="/about">About</a>
          <a href="/books">Books</a>
          <a href="/cart">Cart</a>
          <a href="/login">Login</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
