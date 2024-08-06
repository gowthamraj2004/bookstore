import { getCartItems, addToCart, updateCartItem, deleteCartItem } from './apiService';

// Action to load cart items
export const loadCartItems = async (dispatch) => {
    try {
        const response = await getCartItems();
        dispatch({ type: 'LOAD_CART_ITEMS', payload: response.data });
    } catch (error) {
        console.error('Error loading cart items:', error);
    }
};

// Action to add an item to the cart
export const addItemToCart = async (dispatch, bookId, quantity) => {
    try {
        const response = await addToCart(bookId, quantity);
        dispatch({ type: 'ADD_ITEM_TO_CART', payload: response.data });
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};

// Action to update item quantity in the cart
export const updateCartItemQuantity = async (dispatch, id, quantity) => {
    try {
        await updateCartItem(id, quantity);
        dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, quantity } });
    } catch (error) {
        console.error('Error updating cart item:', error);
    }
};

// Action to remove an item from the cart
export const removeItemFromCart = async (dispatch, id) => {
    try {
        await deleteCartItem(id);
        dispatch({ type: 'REMOVE_CART_ITEM', payload: id });
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};
