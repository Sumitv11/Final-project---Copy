package com.flightsearch.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "airports")
@Data
public class Airport {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, unique = true)
	private String name;

	@Column(name = "iata_code", nullable = false, unique = true)
	private String iataCode;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "city_id", nullable = false)
	private City city;
}
