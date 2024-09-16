package com.flightsearch.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightsearch.entity.AirLine;
import com.flightsearch.entity.Airport;
import com.flightsearch.exceptionhandler.ResourceNotFoundException;
import com.flightsearch.repository.AirportRepository;

@Service
public class AirportService {

	@Autowired
	AirportRepository airportRepository;

	public List<Airport> getAllAirports() {
		return airportRepository.findAllAirportsSortedByIdDesc();
	}

	public Airport createAirport(Airport airport) {
		return airportRepository.save(airport);
	}

	public List <Airport> updateAirport(Airport airportDetails) {
		Airport airport = airportRepository.findById(airportDetails.getId()).orElse(null);
		if (airport != null) {
			airport.setName(airportDetails.getName());
			airport.setIataCode(airportDetails.getIataCode());
			airport.setCity(airportDetails.getCity());
			 airportRepository.save(airport);
			 return airportRepository.findAll();
		}
		else {
			return null;
		}
	}

	public boolean deleteAirport(int id) {
		if (airportRepository.existsById(id)) {
			airportRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public Airport getAirportById(int id) {
		return airportRepository.findById(id).orElse(null);
	}
}
