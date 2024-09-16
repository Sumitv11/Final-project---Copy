import { Aircraft } from "./aircraft";
import { Airline } from "./airline";
import { Airport } from "./airport";
import { FlightType } from "./flightType";
import { TravelClass } from "./travelclass";

export interface Flight {
    id: number;
    airline: Airline;
    flightNumber: string;
    destinationAirport: Airport;
    originAirport: Airport;
    departureTime: string;
    arrivalTime: string;
    duration: number;
    price: number;
    travelClass: TravelClass;
    flightType: FlightType;
    aircraftType: Aircraft;
    capacity: number;
    layovers: number;
}
