import React from 'react';
import './OrderTracking.css';
import productImage from '../assets/images/jjk.jpg'; // Adjust the path based on the actual location of the image

const OrderTracking = () => {
  return (
    <div className="order-tracking">
      <div className="order-header">
        <div className="order-details">
          <p className="order-id">Order ID - OD431907839845887100</p>
          <h2>jjk</h2>
          <p className="seller">Seller: maga</p>
          <p className="price">₹199 <span className="offers">2 offers</span></p>
        </div>
        <div className="order-image">
          <img src={productImage} alt="Product" />
        </div>
      </div>
      <div className="delivery-info">
        <h3>Open Box Delivery will be done</h3>
        <div className="delivery-steps">
          <div>
            <i className="icon-box"></i>
            <p>Sealed package will be opened</p>
          </div>
          <div>
            <i className="icon-check"></i>
            <p>Checks will be performed</p>
          </div>
          <div>
            <i className="icon-otp"></i>
            <p>Share OTP 017833</p>
          </div>
        </div>
      </div>
      <div className="order-status">
        <div className="status-item confirmed">
          <div className="status-icon"></div>
          <p>Order Confirmed, Mon Jul 29</p>
        </div>
        <div className="status-item shipped">
          <div className="status-icon"></div>
          <p>Shipped, Mon Jul 29</p>
        </div>
        <div className="status-item out-for-delivery">
          <div className="status-icon"></div>
          <p>Out For Delivery, Today</p>
          <p>Your order is out for delivery., Coimbatore, Wed 31st Jul</p>
        </div>
        <div className="status-item delivery">
          <div className="status-icon"></div>
          <p>Delivery</p>
        </div>
      </div>
      <div className="contact-info">
        <p>You can reach the delivery person at <strong>04461767777 (PIN: 146)</strong></p>
        <button className="call-button">Call</button>
      </div>
    </div>
  );
};

export default OrderTracking;