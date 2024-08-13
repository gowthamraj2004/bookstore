import React from 'react';
import './Footer.css'; // Assuming you will have some styles
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  // Check if the current path is either login or signup
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null; // Do not render the footer
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section company">
          <h2>Company</h2>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Affiliate Program</a></li>
          </ul>
        </div>
        <div className="footer-section help">
          <h2>Get Help</h2>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Payment Options</a></li>
          </ul>
        </div>
        <div className="footer-section shop">
          <h2>Online Shop</h2>
          <ul>
            <li><a href="#">Watch</a></li>
            <li><a href="#">Bag</a></li>
            <li><a href="#">Shoes</a></li>
            <li><a href="#">Dress</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="footer-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="footer-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="footer-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="footer-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 BOOKY . All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
