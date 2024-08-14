package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
	List<Address> findByUserId(Long userId);
}