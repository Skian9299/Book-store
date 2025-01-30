import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar";
import Banner from "./Banner";
import BookList from "./Booklist";
import Login from "./Login";
import Signup from "./Signup";
import AboutUs from "./About";
import Checkout from "./Checkout";
import './App.css';
import Footer from "./Footer";


function App() {
  return (
    <Router>
      <div>
        {/* Navbar will be visible on all pages */}
        <Navbar />
        
        
        {/* Set up routes for different pages */}
        <Routes>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Checkout />} />
        </Routes>
        <Banner/>
        <BookList/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
