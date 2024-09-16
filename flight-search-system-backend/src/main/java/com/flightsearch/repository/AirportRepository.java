package com.flightsearch.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flightsearch.entity.Airport;

public interface AirportRepository extends JpaRepository<Airport, Integer> {
	

	@Query("SELECT a FROM Airport a ORDER BY a.id DESC")
	List<Airport> findAllAirportsSortedByIdDesc();

}
