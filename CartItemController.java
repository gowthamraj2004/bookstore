package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Entity.CartItem;
import com.example.demo.Service.CartItemService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }
    
    @GetMapping("/user/{userId}")
    public List<CartItem> getCartItemsByUserId(@PathVariable int userId) {
        return cartItemService.getCartItemsByUserId(userId);
    }
    
    @GetMapping("/count/{userId}")
    public ResponseEntity<Map<String, Long>> getCartItemCount(@PathVariable("userId") int userId) {
        long count = cartItemService.getCartItemCountForUser(userId);
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    @SuppressWarnings("unused")
	@PostMapping("/add")
    public CartItem addToCart(@RequestBody Map<String, String> request) {
        // Extract the fields from the request body
        Integer bookId = Integer.parseInt(request.get("bookId"));
        Integer userId = Integer.parseInt(request.get("userId"));

        // Ensure the userId is provided in the request
        if (userId == null) {
            throw new RuntimeException("User ID must be provided in the request");
        }
        
        return cartItemService.addToCart(bookId, userId);
    }




    
    @PutMapping("/{id}")
    public CartItem updateCartItem(@PathVariable int id, @RequestBody CartItem cartItem) {
        cartItem.setId(id);
        return cartItemService.updateCartItem(cartItem);
    }

    @DeleteMapping("/{id}")
    public void deleteCartItem(@PathVariable int id) {
        cartItemService.deleteCartItem(id);
    }
}
