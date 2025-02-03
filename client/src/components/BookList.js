import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="row">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
