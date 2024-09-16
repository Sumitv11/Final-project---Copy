//package com.flightsearch.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.ResponseEntity.BodyBuilder;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import com.flightsearch.entity.Airport;
//import com.flightsearch.entity.MessageResponse;
//import com.flightsearch.service.AirportService;
//
//@RestController
//@RequestMapping("/api/admin/airport")
//public class AirportController {
//
//    @Autowired
//    private AirportService airportService;
//
//    @GetMapping("/getAll")
//	@PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<List<Airport>> getAllAirports() {
//        List<Airport> airports = airportService.getAllAirports();
//        return ResponseEntity.ok(airports);
//    }
//
//    @GetMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Airport> getAirportById(@PathVariable int id) {
//        Airport airport = airportService.getAirportById(id);
//        if (airport != null) {
//            return ResponseEntity.ok(airport);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(null); 
//        }
//    }
//
//    @PostMapping("/add")
//	@PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Airport> createAirport(@RequestBody Airport airport) {
//        if (airport == null) {
//            return ResponseEntity.badRequest().build();
//        }
//        Airport createdAirport = airportService.createAirport(airport);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdAirport);
//    }
//
//    @PutMapping("/")
//	@PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity <List<Airport>> updateAirport(@RequestBody Airport airportDetails) {
//       List< Airport> updatedAirport = airportService.updateAirport(airportDetails);
//        if (updatedAirport != null) {
//            return ResponseEntity.ok(updatedAirport);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(null); 
//        }
//    }
//
//    @DeleteMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity <MessageResponse> deleteAirport(@PathVariable int id) {
//        boolean isDeleted = airportService.deleteAirport(id);
//        if (isDeleted) {
//            return  new ResponseEntity <> ( new MessageResponse("Deleted Successfully", HttpStatus.OK) ,new HttpHeaders() ,HttpStatus.OK);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }
//}



package com.flightsearch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.flightsearch.entity.Airport;
import com.flightsearch.entity.MessageResponse;
import com.flightsearch.service.AirportService;

@RestController
@RequestMapping("/api/airport")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Airport>> getAllAirports() {
        List<Airport> airports = airportService.getAllAirports();
        return ResponseEntity.ok(airports);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Airport> getAirportById(@PathVariable int id) {
        Airport airport = airportService.getAirportById(id);
        if (airport != null) {
            return ResponseEntity.ok(airport);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Airport> createAirport(@RequestBody Airport airport) {
        if (airport == null) {
            return ResponseEntity.badRequest().build();
        }
        Airport createdAirport = airportService.createAirport(airport);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAirport);
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Airport>> updateAirport(@RequestBody Airport airportDetails) {
        List<Airport> updatedAirport = airportService.updateAirport(airportDetails);
        if (updatedAirport != null) {
            return ResponseEntity.ok(updatedAirport);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteAirport(@PathVariable int id) {
        boolean isDeleted = airportService.deleteAirport(id);
        if (isDeleted) {
            return ResponseEntity.ok(new MessageResponse("Deleted Successfully", HttpStatus.OK));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
