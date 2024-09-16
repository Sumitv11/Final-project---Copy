package com.flightsearch.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightsearch.entity.AirLine;
import com.flightsearch.entity.Aircraft;
import com.flightsearch.entity.Airport;
import com.flightsearch.entity.Flight;
import com.flightsearch.entity.FlightType;
import com.flightsearch.entity.TravelClass;
import com.flightsearch.exceptionhandler.ResourceNotFoundException;
import com.flightsearch.repository.AirLineRepository;
import com.flightsearch.repository.AircraftRepository;
import com.flightsearch.repository.AirportRepository;
import com.flightsearch.repository.FlightRepository;

import jakarta.transaction.Transactional;

@Service
public class FlightService {

	@Autowired
	private FlightRepository flightRepository;

	@Autowired
	private AirLineRepository airlineRepository;

	@Autowired
	private AircraftRepository aircraftRepository;

	@Autowired
	private AirportRepository airportRepository;

	public List<Flight> getAllFlights() {
		return flightRepository.findAllFlightsSortedByIdDesc();
	}

	public Flight getFlightById(Integer id) {
		Optional<Flight> flight = flightRepository.findById(id);
		return flight.orElse(null);
	}

	public Flight createFlight(Flight flight) {

		AirLine airline = airlineRepository.findById(flight.getAirline().getId()).orElse(null);
		Aircraft aircraft = aircraftRepository.findById(flight.getAircraftType().getId()).orElse(null);
		Airport originAirport = airportRepository.findById(flight.getOriginAirport().getId()).orElse(null);
		Airport destinationlAirport = airportRepository.findById(flight.getDestinationAirport().getId()).orElse(null);

		if (airline == null || aircraft == null || destinationlAirport == null || originAirport == null) {
			return null;
		}

		flight.setAirline(airline);
		flight.setAircraftType(aircraft);
		flight.setOriginAirport(originAirport);
		flight.setDestinationAirport(destinationlAirport);

		return flightRepository.save(flight);
	}

	@Transactional
	public List<Flight> updateFlight(Flight flightDetails) {
		Flight existingFlight = flightRepository.findById(flightDetails.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Flight not found with id " + flightDetails.getId()));

		if (flightDetails.getAircraftType() != null && flightDetails.getAircraftType().getId() != null) {
			existingFlight.setAircraftType(aircraftRepository.findById(flightDetails.getAircraftType().getId())
					.orElseThrow(() -> new ResourceNotFoundException(
							"Aircraft not found with id " + flightDetails.getAircraftType().getId())));
		}

		if (flightDetails.getAirline() != null && flightDetails.getAirline().getId() != null) {
			existingFlight.setAirline(airlineRepository.findById(flightDetails.getAirline().getId())
					.orElseThrow(() -> new ResourceNotFoundException(
							"Airline not found with id " + flightDetails.getAirline().getId())));
		}

		if (flightDetails.getOriginAirport() != null && flightDetails.getOriginAirport().getId() != null) {
			existingFlight.setOriginAirport(airportRepository.findById(flightDetails.getOriginAirport().getId())
					.orElseThrow(() -> new ResourceNotFoundException(
							"Arrival Airport not found with id " + flightDetails.getOriginAirport().getId())));
		}

		if (flightDetails.getDestinationAirport() != null && flightDetails.getDestinationAirport().getId() != null) {
			existingFlight.setDestinationAirport(airportRepository
					.findById(flightDetails.getDestinationAirport().getId())
					.orElseThrow(() -> new ResourceNotFoundException(
							"Departure Airport not found with id " + flightDetails.getDestinationAirport().getId())));
		}

		existingFlight.setArrivalTime(flightDetails.getArrivalTime());
		existingFlight.setDepartureTime(flightDetails.getDepartureTime());
		existingFlight.setDuration(flightDetails.getDuration());
		existingFlight.setCapacity(flightDetails.getCapacity());
		existingFlight.setFlightNumber(flightDetails.getFlightNumber());
		existingFlight.setFlightType(flightDetails.getFlightType());
		existingFlight.setLayovers(flightDetails.getLayovers());
		existingFlight.setPrice(flightDetails.getPrice());
		existingFlight.setTravelClass(flightDetails.getTravelClass());

		flightRepository.save(existingFlight);

		return flightRepository.findAll();
	}

	public boolean deleteFlight(Integer id) {
		if (flightRepository.existsById(id)) {
			flightRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public List<Flight> getOutBoundFlights(Integer destinationAirportId, Integer originAirportId) {
		return flightRepository.findFlights(destinationAirportId, originAirportId);
	}

	public List<Flight> searchFlights(Integer destinationAirportId, Integer originAirportId, LocalDateTime deptDate,
			LocalDateTime returnDate, FlightType flightType, List<Integer> aircrafts, List<Integer> airlines,
			Integer layovers, Double maxPrice, Integer time, TravelClass travelClass) {
		String newflightType = null;
		List<Flight> newFlights = null;

		if (aircrafts != null && aircrafts.size() == 0) {
			aircrafts = aircraftRepository.getAllIds();
		}
		if (airlines != null && airlines.size() == 0) {
			airlines = airlineRepository.getAllIds();
		}
		if (flightType != null) {
			newflightType = flightType.toString();
			if (flightType == FlightType.ROUND_TRIP && originAirportId != 0 && destinationAirportId != 0) {
				newFlights = flightRepository.findFlights(originAirportId, destinationAirportId);
			}
		}

		List<Flight> allFlights = flightRepository.findFlightsWithFilters(originAirportId, destinationAirportId,
				deptDate, returnDate, newflightType, aircrafts, airlines, layovers, maxPrice, time, travelClass);
		if (newFlights != null) {
			allFlights.addAll(newFlights);
		}
		return allFlights;
	}
}
