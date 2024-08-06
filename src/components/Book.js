import React from 'react';
import './Book.css';

function Book({ title, author, description, genre, thumbnail }) {
  return (
    <div className="book-container">
      <div className="book">
        <div className="book-front">
          <div className="book-thumbnail-container">
            <img src={thumbnail} alt={`${title} cover`} className="book-thumbnail" />
          </div>
          <h2>{title}</h2>
        </div>
        <div className="book-back">
          <h3><strong>Author: </strong>{author}</h3>
          <p className="book-genre"><strong>Genre: </strong>{genre}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Book;
