package com.flightsearch.entity;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightFilterDto {

    private Integer originAirportId;
    private Integer destinationAirportId;
    private LocalDateTime deptDate;
    private LocalDateTime returnDate;
    private FlightType flightType;
    private TravelClass travelClass;
    private List<Integer> aircrafts;
    private List<Integer> airlines;
    private Integer layovers;
    private Double maxPrice;
    private Integer time;
}

