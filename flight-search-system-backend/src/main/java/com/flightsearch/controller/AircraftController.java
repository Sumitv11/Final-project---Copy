//package com.flightsearch.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import com.flightsearch.entity.Aircraft;
//import com.flightsearch.entity.MessageResponse;
//import com.flightsearch.service.AircraftService;
//
//@RestController
//@RequestMapping("/api/admin/aircraft")
//public class AircraftController {
//
//	@Autowired
//	private AircraftService aircraftService;
//
//	@GetMapping("/getAll")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<List<Aircraft>> getAllAircrafts() {
//		List<Aircraft> aircrafts = aircraftService.getAllAircrafts();
//		return ResponseEntity.ok(aircrafts);
//	}
//
//	@GetMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<Aircraft> getAircraftById(@PathVariable Integer id) {
//		Aircraft aircraft = aircraftService.getAircraftById(id);
//		if (aircraft != null) {
//			return ResponseEntity.ok(aircraft);
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 
//		}
//	}
//
//	@PostMapping("/add")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<Aircraft> createAircraft(@RequestBody Aircraft aircraft) {
//		if (aircraft == null) {
//			return ResponseEntity.badRequest().build();
//		}
//		Aircraft createdAircraft = aircraftService.createAircraft(aircraft);
//		return ResponseEntity.status(HttpStatus.CREATED).body(createdAircraft);
//	}
//
//	@PutMapping("/")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity <List <Aircraft>> updateAircraft(@RequestBody Aircraft aircraftDetails) {
//		List <Aircraft> updatedAircraft = aircraftService.updateAircraft(aircraftDetails);
//		if (updatedAircraft != null) {
//			return ResponseEntity.ok(updatedAircraft);
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//	}
//
//	@DeleteMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<MessageResponse> deleteAircraft(@PathVariable Integer id) {
//		boolean isDeleted = aircraftService.deleteAircraft(id);
//		 if (isDeleted) {
//	            return  ResponseEntity.ok(new MessageResponse("Deleted Successfully", HttpStatus.OK));
//	        } else {
//	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//	        }
//	}
//}



package com.flightsearch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.flightsearch.entity.Aircraft;
import com.flightsearch.entity.MessageResponse;
import com.flightsearch.service.AircraftService;

@RestController
@RequestMapping("/api/aircraft")
public class AircraftController {

    @Autowired
    private AircraftService aircraftService;

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Aircraft>> getAllAircrafts() {
        List<Aircraft> aircrafts = aircraftService.getAllAircrafts();
        return ResponseEntity.ok(aircrafts);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Aircraft> getAircraftById(@PathVariable Integer id) {
        Aircraft aircraft = aircraftService.getAircraftById(id);
        if (aircraft != null) {
            return ResponseEntity.ok(aircraft);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Aircraft> createAircraft(@RequestBody Aircraft aircraft) {
        if (aircraft == null) {
            return ResponseEntity.badRequest().build();
        }
        Aircraft createdAircraft = aircraftService.createAircraft(aircraft);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAircraft);
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Aircraft>> updateAircraft(@RequestBody Aircraft aircraftDetails) {
        List<Aircraft> updatedAircraft = aircraftService.updateAircraft(aircraftDetails);
        if (updatedAircraft != null) {
            return ResponseEntity.ok(updatedAircraft);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteAircraft(@PathVariable Integer id) {
        boolean isDeleted = aircraftService.deleteAircraft(id);
        if (isDeleted) {
            return ResponseEntity.ok(new MessageResponse("Deleted Successfully", HttpStatus.OK));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
