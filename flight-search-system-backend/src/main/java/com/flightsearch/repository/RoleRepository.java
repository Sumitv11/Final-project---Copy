package com.flightsearch.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flightsearch.entity.ERole;
import com.flightsearch.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	Optional<Role> findByName(ERole name);
}
