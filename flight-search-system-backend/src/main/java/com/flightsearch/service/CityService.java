package com.flightsearch.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightsearch.entity.City;
import com.flightsearch.exceptionhandler.ResourceNotFoundException;
import com.flightsearch.repository.CityRepository;

@Service
public class CityService {

	@Autowired
	CityRepository cityRepository;

	public List<City> getAllCities() {
		return cityRepository.findAllCitiesSortedByIdDesc();
	}

	public City getCityById(int id) {
		return cityRepository.findById(id).orElse(null);
	}

	public City createCity(City city) {
		return cityRepository.save(city);
	}

	public List<City> updateCity(City cityDetails) {
		City city = cityRepository.findById(cityDetails.getId()).orElse(null);
		if (city != null) {
			city.setName(cityDetails.getName());
			city.setCode(cityDetails.getCode());
			city.setCountry(cityDetails.getCountry());
			cityRepository.save(city);
			return cityRepository.findAll();
		}
		return null;
	}

	public boolean deleteCity(int id) {
		if (cityRepository.existsById(id)) {
			cityRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}
}
