import React from "react";
import img1 from "../Images/img1.jpg";

const BookCard = ({ book, addToCart }) => {
  const imageUrl = book.image_url ? book.image_url : img1; // Use default image if none provided

  return (
    <div 
      className="card h-100 shadow-lg border-0" 
      style={{
        width: "12rem", 
        borderRadius: "15px", 
        background: "linear-gradient(135deg, #2c3e50, #4ca1af)", // Cool modern gradient
        color: "#ecf0f1", // Light text for contrast
      }}
    >
      <img
        src={imageUrl}
        className="card-img-top"
        alt={book.title}
        style={{
          objectFit: "cover",
          height: "150px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px"
        }}
      />
      <div className="card-body d-flex flex-column p-2 text-center">
        <h6 className="card-title fw-bold">{book.title}</h6>
        <p className="card-text small">{book.description}</p>
        <p className="card-text"><strong>Price:</strong> ${book.price}</p>
        <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
        <button 
          className="btn btn-sm text-white mt-auto" 
          style={{ 
            background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Eye-catching button
            borderRadius: "10px",
            border: "none",
          }}
          onClick={() => addToCart(book)}
        >
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
