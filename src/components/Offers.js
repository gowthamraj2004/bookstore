// src/components/Offers.js
import React from 'react';
import './Offers.css'; // Ensure to create and style this CSS file
import { Rating } from '@mui/material';

// Import different images for each book
import bookImage1 from '../assets/images/harry.jpeg';
import bookImage2 from '../assets/images/suppandi.jpeg';
import bookImage3 from '../assets/images/Jungle Book.jpg';
import bookImage4 from '../assets/images/500 days of summer.jpeg';
import bookImage5 from '../assets/images/The Great Gatsby.jpeg';
import bookImage6 from '../assets/images/batman.jpeg';

const Offers = () => {
  const books = [
    {
      title: 'Book One',
      originalPrice: '300.00',
      offerPrice: '200.00',
      rating: 4,
      image: bookImage1, // Use imported image
    },
    {
      title: 'Book Two',
      originalPrice: '250.00',
      offerPrice: '150.00',
      rating: 3,
      image: bookImage2, // Use imported image
    },
    {
      title: 'Book Three',
      originalPrice: '400.00',
      offerPrice: '250.00',
      rating: 5,
      image: bookImage3, // Use imported image
    },
    {
      title: 'Book Four',
      originalPrice: '350.00',
      offerPrice: '220.00',
      rating: 4,
      image: bookImage4, // Use imported image
    },
    {
      title: 'Book Five',
      originalPrice: '280.00',
      offerPrice: '180.00',
      rating: 3,
      image: bookImage5, // Use imported image
    },
    {
      title: 'Book Six',
      originalPrice: '500.00',
      offerPrice: '300.00',
      rating: 5,
      image: bookImage6, // Use imported image
    },
  ];

  return (
    <div className="offers-page">
      <h2>Special Offers</h2>
      <div className="books-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" /> {/* Use the specific image for each book */}
            <h3>{book.title}</h3>
            <div className="price-section">
              <span className="original-price">₹{book.originalPrice}</span>
              <span className="offer-price">₹{book.offerPrice}</span>
            </div>
            <Rating name="read-only" value={book.rating} readOnly />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;