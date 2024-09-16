package com.flightsearch.entity;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageResponse {
	  private String message;
	  private HttpStatus status;

	  public MessageResponse(String message ,HttpStatus status) {
	    this.message = message;
	    this.status =status;
	  }

	}