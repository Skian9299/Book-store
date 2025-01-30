import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#343a40" }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white fw-bold">
            Online Book Store
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-3">
                <Link to="/about" className="nav-link text-white">
                  About
                </Link>
              </li>
              <li className="nav-item mx-3">
                <button className="nav-link text-white bg-transparent border-0" onClick={() => setIsCartModalOpen(true)}>
                  Cart
                </button>
              </li>
              <li className="nav-item mx-3">
                <Link to="/topsellerbooks" className="nav-link text-white">
                  Top Sellers
                </Link>
              </li>

              <li className="nav-item dropdown mx-3">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setIsSignUpModalOpen(true)}>
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setIsLoginModalOpen(true)}>
                      Login
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button className="btn-close" onClick={() => setIsLoginModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <input type="email" className="form-control mb-2" placeholder="Email" />
                <input type="password" className="form-control mb-2" placeholder="Password" />
                <button className="btn btn-primary w-100">Login</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign-Up Modal */}
      {isSignUpModalOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button className="btn-close" onClick={() => setIsSignUpModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <input type="email" className="form-control mb-2" placeholder="Email" />
                <input type="password" className="form-control mb-2" placeholder="Password" />
                <button className="btn btn-primary w-100">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartModalOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cart</h5>
                <button className="btn-close" onClick={() => setIsCartModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <p>Your cart is empty.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
