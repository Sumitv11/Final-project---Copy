package com.flightsearch.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightsearch.entity.User;
import com.flightsearch.repository.FlightRepository;
import com.flightsearch.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	FlightRepository flightRepository;

	public List<User> getAll() {
		return userRepository.findAll();
	}

	public boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}
	
	public User createUser(User newUser)
	{
		return userRepository.save(newUser);
	}
}
