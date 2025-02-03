import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookCard({ book }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/books/${book.id}`);
      window.location.reload(); // Reload page to reflect changes
    } catch (error) {
      console.error("There was an error deleting the book!", error);
    }
  };

  const handleUpdate = () => {
    // Redirect to the book edit page or open a modal for editing
    window.location.href = `/books/${book.id}/edit`;
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        {/* Show image if available */}
        <img
          src={book.image_url || "https://via.placeholder.com/200x300"} // Placeholder image if no image
          className="card-img-top"
          alt={book.title}
        />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.description}</p> {/* Show description */}
          <p className="card-text">${book.price}</p>
          <Link to={`/books/${book.id}`} className="btn btn-primary">
            View Details
          </Link>
          <button className="btn btn-warning ms-2" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn btn-danger ms-2" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
