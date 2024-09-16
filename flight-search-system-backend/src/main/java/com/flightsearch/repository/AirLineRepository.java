package com.flightsearch.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flightsearch.entity.AirLine;

public interface AirLineRepository extends JpaRepository<AirLine, Integer> {

	@Query("SELECT a.id FROM Aircraft a")
	List<Integer> getAllIds();

	@Query("SELECT a FROM AirLine a ORDER BY a.id DESC")
	List<AirLine> findAllAirlinesSortedByIdDesc();

}
