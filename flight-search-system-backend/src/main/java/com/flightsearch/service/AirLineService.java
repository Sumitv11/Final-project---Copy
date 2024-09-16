package com.flightsearch.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightsearch.entity.AirLine;
import com.flightsearch.exceptionhandler.ResourceNotFoundException;
import com.flightsearch.repository.AirLineRepository;

@Service
public class AirLineService {
     
	@Autowired
	AirLineRepository airlineRepository;

	public List<AirLine> getAllAirlines() {
		return airlineRepository.findAllAirlinesSortedByIdDesc();
	}

	public AirLine getAirLineById(int id) {
		return airlineRepository.findById(id)
				.orElse(null);
	}

	public AirLine createAirLine(AirLine airline) {
		return airlineRepository.save(airline);
	}

	public List <AirLine> updateAirLine(AirLine airlineDetails) {
		AirLine airline = airlineRepository.findById(airlineDetails.getId()).orElse(null);
		if (airline != null) {
			airline.setName(airlineDetails.getName());
			 airlineRepository.save(airline);
			 return airlineRepository.findAll();
		}
		else return null;
	}

	public boolean deleteAirLine(int id) {
		if (airlineRepository.existsById(id)) {
			airlineRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}
	
	public List<Integer> getAirlineIdList()
	{
		return airlineRepository.getAllIds();
	}
}
