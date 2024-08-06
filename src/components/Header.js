import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import supercoinsIcon from '../assets/images/coin-removebg-preview.png';
import useScrollDirection from '../hooks/useScrollDirection';
import logo from '../assets/images/logo.png';

const Header = ({ searchTerm, onSearchChange, onSearch, superCoins, cartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const location = useLocation(); // Use useLocation to get the current path

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/login');
  };
  const goHome = () => {
    navigate('/');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      onSearch();
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  // Conditionally render different elements based on the current path
  const isCartPage = location.pathname === '/cart';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header className={`header ${scrollDirection === 'down' ? 'hide' : ''}`}>
      <div className="menu-icon" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
        <FaBars />
      </div>
      <div className={`menu ${menuOpen ? 'active' : ''}`} onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
        <div className="menu-item"><Link to="/myaccount">My Account</Link></div>
        <div className="menu-item"><Link to="/orders">My Orders</Link></div>
        <div className="menu-item"><Link to="/offers">Offers</Link></div>
        <div className="menu-item"><Link to="/free-books">Free Books</Link></div>
        <div className="menu-item"><Link to="/sell-books">Sell Books</Link></div>
      </div>

      <img src={logo} alt="Logo" className="logo" onClick={goHome} />
      <h1><a onClick={goHome}>BOOKY</a></h1>
      {!isCartPage && !isAuthPage && (
        <>
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search books..."
              onKeyPress={handleKeyPress} // Add onKeyPress handler here
            />
            <button onClick={onSearch}>Search</button>
          </div>
          <div className="cart-icon" onClick={goToCart}>
            <FaShoppingCart />
            {cartItems > 0 && <div className="cart-counter">{cartItems}</div>}
          </div>
          <div className="supercoins">
            <img src={supercoinsIcon} alt="SuperCoins" className="supercoins-icon" />
            <span className="supercoins-number">{superCoins}</span>
          </div>
          <div className="account-icon">
            <button onClick={goLogin}>Login or Signup</button>
          </div>
        </>
      )}
      {(isCartPage || isAuthPage) && (
        <div className="header-message">
          {isCartPage ? <p>Your Cart</p> : <p>Login / Signup</p>}
        </div>
      )}
    </header>
  );
};

export default Header;
