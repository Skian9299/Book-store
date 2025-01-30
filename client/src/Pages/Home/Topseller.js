// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     // Fetch books from the backend API
//     axios
//       .get("http://localhost:5000/books")  // Replace with your actual API URL
//       .then((response) => {
//         setBooks(response.data);
//         setFilteredBooks(response.data); // Initially, no filter, show all books
//       })
//       .catch((error) => {
//         console.error("Error fetching books:", error);
//       });
//   }, []);

//   useEffect(() => {
//     // Filter books based on selected genre and search query
//     let filtered = books.filter((book) =>
//       book.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (selectedGenre !== "All") {
//       filtered = filtered.filter((book) => book.genre === selectedGenre);
//     }

//     setFilteredBooks(filtered);
//   }, [selectedGenre, searchQuery, books]);

//   const handleGenreChange = (event) => {
//     setSelectedGenre(event.target.value);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <input
//           type="text"
//           placeholder="Search books"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           style={{
//             width: "200px",
//             padding: "8px",
//             margin: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <select
//           value={selectedGenre}
//           onChange={handleGenreChange}
//           style={{
//             padding: "8px",
//             margin: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="All">All Genres</option>
//           <option value="Romance">Romance</option>
//           <option value="Biography">Biography</option>
//           <option value="Fiction">Fiction</option>
//           <option value="Sci-Fi">Sci-Fi</option>
//           <option value="Mystery">Mystery</option>
//           <option value="Horror">Horror</option>
//         </select>
//       </div>

//       <div className="book-list">
//         {filteredBooks.map((book) => (
//           <div key={book.id} style={{ marginBottom: "20px" }}>
//             <img
//               src={book.image_url}
//               alt={book.title}
//               style={{ width: "200px", height: "300px", marginBottom: "10px" }}
//             />
//             <h3>{book.title}</h3>
//             <p>{book.genre}</p>
//             <p>${book.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
