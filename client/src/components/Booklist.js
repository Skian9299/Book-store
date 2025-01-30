import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './Bookcard';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    // Fetch books data from the backend
    axios.get('books') // Replace with your actual backend API URL
      .then(response => {
        setBooks(response.data);
        setFilteredBooks(response.data); // Set the filtered books initially to all books
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const addToCart = (book) => {
    setCart([...cart, book]);
    alert(`${book.title} has been added to the cart!`);
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setGenre(selectedGenre);

    if (selectedGenre === '') {
      setFilteredBooks(books); // Show all books if no genre is selected
    } else {
      const filtered = books.filter(book => book.genre === selectedGenre); // Filter by genre
      setFilteredBooks(filtered);
    }
  };

  return (
    <div className="container mt-5">
      {/* Top Sellers Title */}
      <h2 className="text-center mb-4">Top Sellers</h2>

      {/* Genre Filter Dropdown */}
      <div className="mb-4">
        <form>
          <label htmlFor="genreSelect" className="form-label">Choose Genre</label>
          <select
            id="genreSelect"
            className="form-select"
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            {/* Add more genres as needed */}
          </select>
        </form>
      </div>

      {/* Book Cards */}
      <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 g-3">
        {filteredBooks.map(book => (
          <div className="col" key={book.id}>
            <BookCard book={book} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
