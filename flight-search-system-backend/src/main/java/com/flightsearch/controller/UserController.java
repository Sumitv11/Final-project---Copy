package com.flightsearch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.entity.Flight;
import com.flightsearch.entity.FlightFilterDto;
import com.flightsearch.service.FlightService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	
	@Autowired
	FlightService flightService;
	

    @PostMapping("/flights")
    public List<Flight> getFlights(@RequestBody FlightFilterDto filterDto ) {
    	
    	
        return flightService.searchFlights(filterDto.getDestinationAirportId(),filterDto.getOriginAirportId(), 
        		filterDto.getDeptDate(),
        		filterDto.getReturnDate(),
        		filterDto.getFlightType(), filterDto.getAircrafts(), 
        		filterDto.getAirlines(), filterDto.getLayovers(), 
        		filterDto.getMaxPrice(),filterDto.getTime(),
        		filterDto.getTravelClass()
        );
    }

}
