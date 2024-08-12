import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const email = localStorage.getItem('email');
                console.log('Fetching user data email:', email);
                const userResponse = await axios.get(`http://localhost:8080/api/users/details`, {
                    params: {
                        email: email,
                    },
                });
                console.log('User data:', userResponse.data);
                setUserData(userResponse.data);

                // Fetch addresses
                const addressResponse = await axios.get(`http://localhost:8080/api/addresses/user/${userResponse.data.id}`);
                console.log('Addresses:', addressResponse.data);
                setAddresses(addressResponse.data);

            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        localStorage.removeItem('firstName'); // Remove any other stored user data
        navigate('/');
    };

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="my-account-container">
            <h1 style={{ color: "white" }}>My Account</h1>
            <div className="account-info">
                <h2>Account Information</h2>
                <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phoneNo}</p>
                <p><strong>Address:</strong> {userData.address}</p>
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
                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <p key={address.id}>
                            {address.street}, {address.city}, {address.state} {address.postalCode}, {address.country}
                        </p>
                    ))
                ) : (
                    <p>No saved addresses</p>
                )}
                <button>Add New Address</button>
            </div>
            <div className="account-actions">
                <button>Edit Profile</button>
                <button>Change Password</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default MyAccount;
