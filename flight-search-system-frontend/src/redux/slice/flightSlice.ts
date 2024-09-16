import { Flight } from '@/pages/api/types/flight';
import { FlightFilterDto } from '@/pages/api/types/flightFilterDto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightState {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  searchCriteria: FlightFilterDto;
}

const initialState: FlightState = {
  flights: [],
  loading: false,
  error: null,
  searchCriteria :{},
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    fetchFlightStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFlightSuccess: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload;
      state.loading = false;
    },
    fetchFlightFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addFlight(state, action: PayloadAction<Flight>) {
      state.flights.push(action.payload);
    },
    updateFlight(state, action: PayloadAction<Flight>) {
    },
    deleteFlight(state, action: PayloadAction<number>) {
      state.flights = state.flights.filter(flight => flight.id !== action.payload);
    },
    filterFlightStart(state, action: PayloadAction<any>) {
      state.searchCriteria = action.payload; 
      state.loading = true;
      state.error = null;
    },
    
  }
});

export const { fetchFlightStart, addFlight, updateFlight, deleteFlight ,fetchFlightSuccess,
  fetchFlightFailure,filterFlightStart} = flightSlice.actions;

export default flightSlice.reducer;
