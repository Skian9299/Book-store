import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Home({ addToCart }) {
  const [contentIndex, setContentIndex] = useState(0);

  const contentOptions = [
    {
      type: "books",
      title: "Featured Books",
      items: [
        {
          id: 1,
          title: "The Art of Thinking Clearly",
          description: "A guide to logical thinking and better decision-making.",
          imgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
          price: 499,
        },
        {
          id: 2,
          title: "Atomic Habits",
          description: "An easy & proven way to build good habits and break bad ones.",
          imgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
          price: 599,
        },
        {
          id: 3,
          title: "Deep Work",
          description: "Rules for focused success in a distracted world.",
          imgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
          price: 399,
        },
      ],
    },
    {
      type: "offers",
      title: "Special Discounts!",
      items: [
        "The Art of Thinking Clearly - Now Ksh 399",
        "Atomic Habits - Limited Offer Ksh 499",
        "Deep Work - Grab it for Ksh 299",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setContentIndex((prevIndex) => (prevIndex + 1) % contentOptions.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyNow = async (book) => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        addToCart(book);
        alert(`${book.title} added to cart!`);
      }
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mt-4 text-center"
    >
      <h1 className="mb-3">📚 Welcome to the Bookstore</h1>
      <p>Find your next great read at unbeatable prices!</p>

      <motion.div
        className="card mx-auto shadow-lg border-0"
        style={{ width: "80%", borderRadius: "15px", overflow: "hidden", cursor: "pointer" }}
        onClick={() => setContentIndex((prev) => (prev + 1) % contentOptions.length)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="card-body">
          {contentOptions[contentIndex].type === "books" ? (
            <div className="row">
              {contentOptions[contentIndex].items.map((book) => (
                <div className="col-md-4" key={book.id}>
                  <div className="card shadow-sm">
                    <img
                      src={book.imgUrl}
                      className="card-img-top"
                      alt={book.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text text-muted">{book.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-success fw-bold">Ksh {book.price}</span>
                        <motion.button
                          className="btn btn-primary"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyNow(book);
                          }}
                        >
                          Buy Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card bg-info text-white">
              <div className="card-body">
                <h5 className="card-title">{contentOptions[contentIndex].title}</h5>
                <ul className="list-unstyled">
                  {contentOptions[contentIndex].items.map((offer, index) => (
                    <li key={index}>{offer}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
