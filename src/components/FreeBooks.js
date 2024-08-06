// src/components/FreeBooks.js

import React from 'react';
import './FreeBooks.css';

const FreeBooks = () => {
  const books = [
    {
      title: 'Book One',
      author: 'Author One',
      description: 'This is a description for Book One.',
    },
    {
      title: 'Book Two',
      author: 'Author Two',
      description: 'This is a description for Book Two.',
    },
    {
      title: 'Book Three',
      author: 'Author Three',
      description: 'This is a description for Book Three.',
    },
  ];

  return (
    <div className="free-books">
      <h2>Free Books</h2>
      <div className="books-list">
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeBooks;
