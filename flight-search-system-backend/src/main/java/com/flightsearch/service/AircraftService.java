package com.flightsearch.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightsearch.entity.Aircraft;
import com.flightsearch.exceptionhandler.ResourceNotFoundException;
import com.flightsearch.repository.AircraftRepository;

@Service
public class AircraftService {

	@Autowired
	private AircraftRepository aircraftRepository;

	public List<Aircraft> getAllAircrafts() {
		return aircraftRepository.findAllAircraftsSortedByIdDesc();
	}

	public Aircraft getAircraftById(Integer id) {
		return aircraftRepository.findById(id).orElse(null);
	}

	public Aircraft createAircraft(Aircraft aircraft) {
		return aircraftRepository.save(aircraft);
	}

	public List <Aircraft> updateAircraft(Aircraft aircraftDetails) {
		if (aircraftRepository.existsById(aircraftDetails.getId())) {
			 aircraftRepository.save(aircraftDetails);
			 return aircraftRepository.findAll();
		} else {
			return null;
		}
	}

	public boolean deleteAircraft(Integer id) {
		if (aircraftRepository.existsById(id)) {
			aircraftRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}
	public List<Integer> getAircraftIdList()
	{
		return aircraftRepository.getAllIds();
	}
}
