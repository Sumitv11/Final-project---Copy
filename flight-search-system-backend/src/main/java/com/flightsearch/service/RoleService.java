package com.flightsearch.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightsearch.entity.ERole;
import com.flightsearch.entity.Role;
import com.flightsearch.repository.RoleRepository;

@Service
public class RoleService {
	
	@Autowired
	RoleRepository roleRepository;

	public Optional<Role> getRole(ERole role) {
		return roleRepository.findByName(role);
	}


}
