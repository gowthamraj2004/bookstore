package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Order;
import com.example.demo.Repository.OrdersRepository;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    public Order createOrder(Order order) {
        return ordersRepository.save(order);
    }

    public Order getOrder(Long id) {
        return ordersRepository.findById(id).orElse(null);
    }

    // Additional methods for updating and deleting orders
}
