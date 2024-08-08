import React from 'react';
import './MyAccount.css';
import { useNavigate } from 'react-router-dom';
const MyAccount = () => {
    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName'); // Close dropdown on logout
        navigate('/');
      };
    return (
        <div className="my-account-container">
            <h1>My Account</h1>
            <div className="account-info">
                <h2>Account Information</h2>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Email:</strong> johndoe@example.com</p>
                <p><strong>Phone:</strong> 123-456-7890</p>
                <p><strong>Address:</strong> 123 Main St, Springfield, IL 62701</p>
            </div>
            <div className="order-history">
                <h2>Order History</h2>
                <ul>
                    <li>Order #1234 - <strong>Completed</strong> - <em>07/15/2024</em></li>
                    <li>Order #1235 - <strong>Shipped</strong> - <em>07/20/2024</em></li>
                    <li>Order #1236 - <strong>Processing</strong> - <em>07/25/2024</em></li>
                </ul>
            </div>
            <div className="saved-addresses">
                <h2>Saved Addresses</h2>
                <p>123 Main St, Springfield, IL 62701</p>
                <p>456 Elm St, Shelbyville, IL 62565</p>
                <button>Add New Address</button>
            </div>
            <div className="account-actions">
                <button>Edit Profile</button>
                <button>Change Password</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default MyAccount;
