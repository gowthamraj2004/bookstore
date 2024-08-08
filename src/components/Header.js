import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import supercoinsIcon from '../assets/images/coin-removebg-preview.png';
import useScrollDirection from '../hooks/useScrollDirection';
import logo from '../assets/images/logo.png';

const Header = ({ searchTerm, onSearchChange, onSearch, superCoins, cartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu
  const scrollDirection = useScrollDirection();
  const location = useLocation();

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('token');
    localStorage.removeItem('firstName');
    setFirstName(null);
    setDropdownOpen(false); // Close dropdown on logout
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

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
              onKeyPress={handleKeyPress}
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
            {firstName ? (
              <div className="welcome-message">
                <button onClick={toggleDropdown} className="welcome-btn">
                  Welcome, {firstName}
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => navigate('/login')}>Login or Signup</button>
            )}
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
