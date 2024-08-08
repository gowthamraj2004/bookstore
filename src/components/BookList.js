import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import './BookList.css';

const BookList = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; // Adjust the number of books per page as needed
  const pagesToShow = 4; // Number of pages to show in pagination

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      <div className="book-list">
        {currentBooks.map((book) => (
          <Link key={book.id} to={`/book/${book.id}`} className="book-link">
            <Book
              title={book.title}
              author={book.author}
              description={book.description}
              genre={book.genre}
              thumbnail={`data:image/jpeg;base64,${book.thumbnail}`}
            />
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="pagination-button"
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className="pagination-button"
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default BookList;
