package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
	long countByUserId(int userId);
    List<CartItem> findByUserId(int userId);
}

