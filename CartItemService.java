package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.CartItem;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Book;
import com.example.demo.Repository.CartItemRepository;
import com.example.demo.Utils.PriceConverter; // Import the PriceConverter

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private BookService bookService;  // Inject BookService
    
    @Autowired
    private UserService userService;

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem addToCart(int bookId, int userId) {
        Optional<Book> bookOpt = bookService.getBookById(bookId);
        Optional<User> userOpt = userService.getUserById(userId); // Ensure you have UserService to fetch user

        if (bookOpt.isPresent() && userOpt.isPresent()) {
            Book book = bookOpt.get();
            User user = userOpt.get();
            CartItem cartItem = new CartItem();
            cartItem.setBookId(bookId);
            cartItem.setTitle(book.getTitle());

            // Convert the price from String to double using PriceConverter
            double price = PriceConverter.convertPriceToDouble(book.getPrice());
            cartItem.setPrice(price);

            cartItem.setQuantity(1); // Default quantity
            cartItem.setUser(user);  // Associate the cart item with the user

            return cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("Book or User not found with given IDs");
        }
    }

    public void deleteCartItem(int id) {
        cartItemRepository.deleteById(id);
    }

    public CartItem updateCartItem(CartItem cartItem) {
        if (cartItemRepository.existsById(cartItem.getId())) {
            return cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("Cart item with ID " + cartItem.getId() + " does not exist");
        }
    }

	public List<CartItem> getCartItemsByUserId(int userId) {
		// TODO Auto-generated method stub
		return cartItemRepository.findByUserId(userId);
	}
	// In CartItemService
	public long getCartItemCountForUser(int userId) {
	    return cartItemRepository.countByUserId(userId);
	}

}
