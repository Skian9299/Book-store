import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error("Error fetching book details:", error));
  }, [id]);

  return book ? (
    <div className="card">
      <img src={book.image} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <p>${book.price}</p>
        <button className="btn btn-success">Add to Cart</button>
      </div>
    </div>
  ) : <p>Loading...</p>;
}

export default BookDetails;
