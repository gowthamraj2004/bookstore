import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cart');
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart items', error);
        }
    };

    const addToCart = async (book) => {
        try {
            await axios.post('http://localhost:8080/api/cart', book);
            // Optionally, fetch updated cart items to reflect changes
            await fetchCartItems();
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    const removeFromCart = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/${id}`);
            await fetchCartItems();
        } catch (error) {
            console.error('Error removing from cart', error);
        }
    };

    const updateQuantity = async (id, quantity) => {
        try {
            await axios.put(`http://localhost:8080/api/cart/${id}`, { quantity });
            await fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
