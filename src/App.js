import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/BookList';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import Footer from './components/Footer';
import MyCart from './components/MyCart';
import FreeBooks from './components/FreeBooks';
import Order from './components/Order';
import OrderTracking from './components/OrderTracking';
import MyAccount from './components/MyAccount';
import BookDisplay from './components/BookDisplay';
import './App.css';

import { CartProvider } from './components/CartContext';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [superCoins, setSuperCoins] = useState(100);
  const [cartItems, setCartItems] = useState(3);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books');
        console.log(response.data);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to load books. Please try again later.');
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addBook = async (newBook) => {
    try {
      await axios.post('/api/books/add', newBook);
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again later.');
    }
  };

  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header
            searchTerm={inputValue}
            onSearchChange={setInputValue}
            onSearch={handleSearch}
            superCoins={superCoins}
            cartItems={cartItems}
          />
          <main className="main-content">
            {error && <div className="error-message">{error}</div>}
            <Routes>
              <Route path="/" element={<BookList books={filteredBooks} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<MyCart />} />
              <Route path="/free-books" element={<FreeBooks />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/book/:id" element={<BookDisplay books={books} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
