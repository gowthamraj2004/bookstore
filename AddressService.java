package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Address;
import com.example.demo.Repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    public Address getAddress(Long id) {
        return addressRepository.findById(id).orElse(null);
    }

    // Additional methods for updating and deleting addresses
}
