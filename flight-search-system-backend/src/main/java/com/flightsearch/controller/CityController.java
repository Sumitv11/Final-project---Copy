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
//import com.flightsearch.entity.City;
//import com.flightsearch.entity.MessageResponse;
//import com.flightsearch.service.CityService;
//
//@RestController
//@RequestMapping("/api/admin/city")
//public class CityController {
//
//	@Autowired
//	private CityService cityService;
//
//	@GetMapping("/getAll")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<List<City>> getAllCities() {
//		List<City> cities = cityService.getAllCities();
//		return ResponseEntity.ok(cities);
//	}
//
//	@GetMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<City> getCityById(@PathVariable int id) {
//		City city = cityService.getCityById(id);
//		if (city != null) {
//			return ResponseEntity.ok(city);
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//	}
//
//	@PostMapping("/add")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<City> createCity(@RequestBody City city) {
//		if (city == null) {
//			return ResponseEntity.badRequest().build();
//		}
//		City createdCity = cityService.createCity(city);
//		return ResponseEntity.status(HttpStatus.CREATED).body(createdCity);
//	}
//
//	@PutMapping("/")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<List<City>> updateCity(@RequestBody City cityDetails) {
//		List<City> updatedCity = cityService.updateCity(cityDetails);
//		if (updatedCity != null) {
//			return ResponseEntity.ok(updatedCity);
//		} else {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//	}
//
//	@DeleteMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<MessageResponse> deleteCity(@PathVariable int id) {
//		boolean isDeleted = cityService.deleteCity(id);
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

import com.flightsearch.entity.City;
import com.flightsearch.entity.MessageResponse;
import com.flightsearch.service.CityService;

@RestController
@RequestMapping("/api/city")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<City>> getAllCities() {
        List<City> cities = cityService.getAllCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<City> getCityById(@PathVariable int id) {
        City city = cityService.getCityById(id);
        if (city != null) {
            return ResponseEntity.ok(city);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<City> createCity(@RequestBody City city) {
        if (city == null) {
            return ResponseEntity.badRequest().build();
        }
        City createdCity = cityService.createCity(city);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCity);
    }

    @PutMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<City>> updateCity(@RequestBody City cityDetails) {
        List<City> updatedCity = cityService.updateCity(cityDetails);
        if (updatedCity != null) {
            return ResponseEntity.ok(updatedCity);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteCity(@PathVariable int id) {
        boolean isDeleted = cityService.deleteCity(id);
        if (isDeleted) {
            return ResponseEntity.ok(new MessageResponse("Deleted Successfully", HttpStatus.OK));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
