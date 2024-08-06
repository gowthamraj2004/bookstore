import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export const getAllBooks = () => axios.get(`${BASE_URL}/books`);
export const getBookById = (id) => axios.get(`${BASE_URL}/books/${id}`);
export const addToCart = (bookId, quantity) => axios.post(`${BASE_URL}/cart/add`, { bookId, quantity });
export const updateCartItem = (id, quantity) => axios.put(`${BASE_URL}/cart/${id}`, { quantity });
export const deleteCartItem = (id) => axios.delete(`${BASE_URL}/cart/${id}`);
export const getCartItems = () => axios.get(`${BASE_URL}/cart`);
export const submitReview = (review) => axios.post(`${BASE_URL}/reviews`, review);
export const getReviewsByBookId = (bookId) => axios.get(`${BASE_URL}/reviews/book/${bookId}`);
