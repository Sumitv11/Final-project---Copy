//package com.flightsearch.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.flightsearch.entity.Flight;
//import com.flightsearch.entity.MessageResponse;
//import com.flightsearch.service.FlightService;
//
//@RestController
//@RequestMapping("/api/admin/flight")
//public class FlightController {
//
//	@Autowired
//	private FlightService flightService;
//
//	@GetMapping("/getAll")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<List<Flight>> getAllFlights() {
//		List<Flight> flights = flightService.getAllFlights();
//		return ResponseEntity.ok(flights);
//	}
//
//	@GetMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<Flight> getFlightById(@PathVariable Integer id) {
//		Flight flight = flightService.getFlightById(id);
//		if (flight != null) {
//			return ResponseEntity.ok(flight);
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//	}
//
//	@PostMapping("/add")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<String> createFlight(@RequestBody Flight flight) {
//		if (flight == null) {
//			return ResponseEntity.badRequest().body("Flight details must be provided.");
//		}
//
//		Flight createdFlight = flightService.createFlight(flight);
//		if (createdFlight != null) {
//			return ResponseEntity.status(HttpStatus.CREATED).body("Flight created successfully.");
//		} else {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//					.body("Failed to create flight. One or more associated entities were not found.");
//		}
//	}
//
//	@PutMapping
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity <List<Flight>> updateFlight(@RequestBody Flight flightDetails) {
//		if (flightDetails == null) {
//			return ResponseEntity.badRequest().build();
//		}
//
//		List <Flight> updatedFlight = flightService.updateFlight(flightDetails);
//		if (updatedFlight != null) {
//			return ResponseEntity.ok(updatedFlight);
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//	}
//
//	@DeleteMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<MessageResponse> deleteFlight(@PathVariable Integer id) {
//		boolean isRemoved = flightService.deleteFlight(id);
//		 if (isRemoved) {
//	            return  ResponseEntity.ok(new MessageResponse("Deleted Successfully", HttpStatus.OK));
//	        } else {
//	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//	        }
//	}
//
//	
//
//}




package com.flightsearch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.flightsearch.entity.Flight;
import com.flightsearch.entity.FlightFilterDto;
import com.flightsearch.entity.MessageResponse;
import com.flightsearch.service.FlightService;

@RestController
@RequestMapping("/api/flight")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Flight>> getAllFlights() {
        List<Flight> flights = flightService.getAllFlights();
        return ResponseEntity.ok(flights);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Flight> getFlightById(@PathVariable Integer id) {
        Flight flight = flightService.getFlightById(id);
        if (flight != null) {
            return ResponseEntity.ok(flight);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createFlight(@RequestBody Flight flight) {
        if (flight == null) {
            return ResponseEntity.badRequest().body("Flight details must be provided.");
        }

        Flight createdFlight = flightService.createFlight(flight);
        if (createdFlight != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Flight created successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to create flight. One or more associated entities were not found.");
        }
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Flight>> updateFlight(@RequestBody Flight flightDetails) {
        if (flightDetails == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Flight> updatedFlight = flightService.updateFlight(flightDetails);
        if (updatedFlight != null) {
            return ResponseEntity.ok(updatedFlight);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteFlight(@PathVariable Integer id) {
        boolean isRemoved = flightService.deleteFlight(id);
        if (isRemoved) {
            return ResponseEntity.ok(new MessageResponse("Deleted Successfully", HttpStatus.OK));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/search")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Flight> searchFlights(@RequestBody FlightFilterDto filterDto) {
        return flightService.searchFlights(
            filterDto.getDestinationAirportId(), filterDto.getOriginAirportId(), 
            filterDto.getDeptDate(), filterDto.getReturnDate(), 
            filterDto.getFlightType(), filterDto.getAircrafts(), 
            filterDto.getAirlines(), filterDto.getLayovers(), 
            filterDto.getMaxPrice(), filterDto.getTime(),
            filterDto.getTravelClass()
        );
    }
}
