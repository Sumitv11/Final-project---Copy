package com.flightsearch.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flightsearch.entity.AirLine;
import com.flightsearch.entity.Aircraft;

public interface AircraftRepository extends JpaRepository<Aircraft, Integer> {
	
	@Query("select a.id from Aircraft a")
	List<Integer> getAllIds();
	

	@Query("SELECT a FROM Aircraft a ORDER BY a.id DESC")
	List<Aircraft> findAllAircraftsSortedByIdDesc();

}
