import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyCart.module.css";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if(!userId){
          const response = await axios.get("http://localhost:8080/api/cart");
          setCartItems(response.data);
        }
        const response = await axios.get(`http://localhost:8080/api/cart/user/${userId}`);
        setCartItems(response.data);
      } 
      
      catch (error) {
        setError("Error fetching cart items");
        console.error("Error fetching cart items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return; // Ensure quantity does not go below 1

    const updatedItem = { ...item, quantity: newQuantity };

    try {
      await axios.put(`http://localhost:8080/api/cart/${id}`, updatedItem);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleRemoveItem = async (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        await axios.delete(`http://localhost:8080/api/cart/${id}`);
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error removing item", error);
      }
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cartContainer}>
        <h1 style={{ color: "black" }}>My Cart</h1>
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemDetails}>
                <img
                  src={`https://via.placeholder.com/50?text=${item.name}`}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div>
                  <span className={styles.itemName}>{item.title}</span>
                  <span className={styles.itemPrice}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className={styles.itemActions}>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cartSummary}>
          <div className={styles.totalPrice}>
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className={styles.placeOrderButton}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
