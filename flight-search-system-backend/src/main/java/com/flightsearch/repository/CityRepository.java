package com.flightsearch.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flightsearch.entity.City;

public interface CityRepository extends JpaRepository<City, Integer> {
	

	@Query("SELECT a FROM City a ORDER BY a.id DESC")
	List<City> findAllCitiesSortedByIdDesc();

}
