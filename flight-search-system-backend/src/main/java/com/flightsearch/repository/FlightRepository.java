package com.flightsearch.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flightsearch.entity.Flight;
import com.flightsearch.entity.TravelClass;

public interface FlightRepository extends JpaRepository<Flight, Integer> {

	@Query("SELECT f FROM Flight f " + "WHERE (:originAirportId IS NULL OR f.originAirport.id = :originAirportId) "
			+ "AND (:destinationAirportId IS NULL OR f.destinationAirport.id = :destinationAirportId) "
			+ "AND (:deptDate IS NULL OR f.departureTime >= :deptDate) " + "AND ((:returnDate IS NULL) "
			+ "     OR (:returnDate IS NULL OR f.departureTime <= :returnDate)) "
			+ "AND ((:flightType IS NULL) "
			+ "    OR (:flightType = 'ROUND_TRIP' AND "
			+ "        ((:originAirportId IS NULL OR :destinationAirportId IS NULL) "
			+ "         OR (f.originAirport.id = :originAirportId AND f.destinationAirport.id = :destinationAirportId) "
			+ "         OR (f.originAirport.id = :destinationAirportId AND f.destinationAirport.id = :originAirportId "
			+ "             AND f.departureTime >= :deptDate "
			+ "             AND (:returnDate IS NULL OR f.departureTime <= :returnDate)))) "
			+ "    OR (:flightType = 'ONE_WAY' AND "
			+ "        f.originAirport.id = :originAirportId AND f.destinationAirport.id = :destinationAirportId)) "
			+ "AND (:aircrafts IS NULL OR f.aircraftType.id IN :aircrafts) "
			+ "AND (:airlines IS NULL OR f.airline.id IN :airlines) "
			+ "AND (:layovers IS NULL OR f.layovers <= :layovers) " + "AND (:maxPrice IS NULL OR f.price <= :maxPrice) "
			+ "AND (:time IS NULL OR f.duration <= :time) "
			+ "AND (:travelClass IS NULL OR f.travelClass = :travelClass)")
	List<Flight> findFlightsWithFilters(@Param("originAirportId") Integer originAirportId,
			@Param("destinationAirportId") Integer destinationAirportId, @Param("deptDate") LocalDateTime deptDate,
			@Param("returnDate") LocalDateTime returnDate, @Param("flightType") String flightType,
			@Param("aircrafts") List<Integer> aircrafts, @Param("airlines") List<Integer> airlines,
			@Param("layovers") Integer layovers, @Param("maxPrice") Double maxPrice, @Param("time") Integer time,
			@Param("travelClass") TravelClass travelClass);

	@Query("SELECT f FROM Flight f ORDER BY f.id DESC")
	List<Flight> findAllFlightsSortedByIdDesc();

	@Query("SELECT f FROM Flight f "
			+ "WHERE ((:destinationAirportId IS NULL OR f.originAirport.id = :destinationAirportId)"
			+ "AND (:originAirportId IS NULL OR f.destinationAirport.id = :originAirportId))")
	List<Flight> findFlights(@Param("originAirportId") Integer originAirportId,
			@Param("destinationAirportId") Integer destinationAirportId);


}
