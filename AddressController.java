package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Address;
import com.example.demo.Service.AddressService;

@RestController
@RequestMapping("/addresses")
public class AddressController {
	    @Autowired
	    private AddressService addressService;

	    @PostMapping
	    public Address createAddress(@RequestBody Address address) {
	        return addressService.createAddress(address);
	    }

	    @GetMapping("/user/{id}")
	    public Address getAddress(@PathVariable Long id) {
	        return addressService.getAddress(id);
	    }

	    // Additional endpoints for updating and deleting addresses
	}


