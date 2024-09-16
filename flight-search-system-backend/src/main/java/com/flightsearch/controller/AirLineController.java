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
//import com.flightsearch.entity.AirLine;
//import com.flightsearch.entity.MessageResponse;
//import com.flightsearch.service.AirLineService;
//
//@RestController
//@RequestMapping("/api/admin/airline")
//public class AirLineController {
//
//	@Autowired
//	private AirLineService airLineService;
//
//	@GetMapping("/getAll")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<List<AirLine>> getAllAirLines() {
//		List<AirLine> airlines = airLineService.getAllAirlines();
//		return ResponseEntity.ok(airlines);
//	}
//
//	@GetMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<AirLine> getAirLineById(@PathVariable int id) {
//		AirLine airLine = airLineService.getAirLineById(id);
//		if (airLine != null) {
//			return ResponseEntity.ok(airLine);
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 
//		}
//	}
//
//	@PostMapping("/add")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<AirLine> createAirLine(@RequestBody AirLine airline) {
//		if (airline == null) {
//			return ResponseEntity.badRequest().build();
//		}
//		AirLine createdAirLine = airLineService.createAirLine(airline);
//		return ResponseEntity.status(HttpStatus.CREATED).body(createdAirLine);
//	}
//
//	@PutMapping("/")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<List<AirLine>>  updateAirLine( @RequestBody AirLine airlineDetails) {
//		List <AirLine> updatedAirLine = airLineService.updateAirLine(airlineDetails);
//		if (updatedAirLine != null) {
//			return ResponseEntity.ok(updatedAirLine);
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//	}
//
//	@DeleteMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<MessageResponse> deleteAirLine(@PathVariable int id) {
//		boolean isDeleted = airLineService.deleteAirLine(id);
//		if (isDeleted) {
//            return  ResponseEntity.ok(new MessageResponse("Deleted Successfully", HttpStatus.OK));
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//	}
//}


package com.flightsearch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.flightsearch.entity.AirLine;
import com.flightsearch.entity.MessageResponse;
import com.flightsearch.service.AirLineService;

@RestController
@RequestMapping("/api/airline")
public class AirLineController {

    @Autowired
    private AirLineService airLineService;

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<AirLine>> getAllAirLines() {
        List<AirLine> airlines = airLineService.getAllAirlines();
        return ResponseEntity.ok(airlines);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<AirLine> getAirLineById(@PathVariable int id) {
        AirLine airLine = airLineService.getAirLineById(id);
        if (airLine != null) {
            return ResponseEntity.ok(airLine);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AirLine> createAirLine(@RequestBody AirLine airline) {
        if (airline == null) {
            return ResponseEntity.badRequest().build();
        }
        AirLine createdAirLine = airLineService.createAirLine(airline);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAirLine);
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AirLine>> updateAirLine(@RequestBody AirLine airlineDetails) {
        List<AirLine> updatedAirLine = airLineService.updateAirLine(airlineDetails);
        if (updatedAirLine != null) {
            return ResponseEntity.ok(updatedAirLine);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteAirLine(@PathVariable int id) {
        boolean isDeleted = airLineService.deleteAirLine(id);
        if (isDeleted) {
            return ResponseEntity.ok(new MessageResponse("Deleted Successfully", HttpStatus.OK));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
