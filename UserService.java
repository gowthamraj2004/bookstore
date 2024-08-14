package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // New method to find a user by ID
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

	public Optional<User> getUserById(int userId) {
		// TODO Auto-generated method stub
		return Optional.of(userRepository.findById((long) userId).orElse(null));
	}
}
