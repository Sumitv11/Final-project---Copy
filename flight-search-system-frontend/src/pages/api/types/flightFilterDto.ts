import { FlightType } from "./flightType";
import { TravelClass } from "./travelclass";

export interface FlightFilterDto {
    originAirportId?: number | null;
    destinationAirportId?: number | null;
    deptDate?: string | null;
    returnDate?: string | null;
    flightType?: FlightType |string |null;
    travelClass?: TravelClass |null |string;
    aircrafts?: number[];
    airlines?: number[] |null;
    layovers?: number;
    maxPrice?: number;
    time?: number;
}