import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';
import asusImage from '../assets/images/jjk.jpg';
import days from '../assets/images/500 days of summer.jpeg';
import suppandi from '../assets/images/suppandi.jpeg';
import harry from '../assets/images/harry.jpeg';
import gatsby from '../assets/images/The Great Gatsby.jpeg';

const products = [
    { id: 1, name: 'jjk', price: 100, description: 'This is sample description', image: asusImage },
    { id: 2, name: 'suppandi', price: 170, description: 'This is sample description', image: suppandi },
    { id: 3, name: '500 days of summer', price: 700, description: 'This is sample description', image: days },
    { id: 4, name: 'harry potter', price: 1500, description: 'This is sample description', image: harry },
    { id: 5, name: 'The Great Gatsby', price: 500, description: 'This is sample description', image: gatsby },
];

const Order = () => {
  const navigate = useNavigate();

  const handleTrackOrderClick = (productId) => {
    if (productId === 1) { // Assuming you want to navigate only for the first product
      navigate('/order-tracking');
    }
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button className="track-order-button" onClick={() => handleTrackOrderClick(product.id)}>
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;