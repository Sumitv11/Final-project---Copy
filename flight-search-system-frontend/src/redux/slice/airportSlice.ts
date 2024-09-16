import { Airport } from '@/pages/api/types/airport';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AirportState {
    airports: Airport[];
    loading: boolean;
    error: string | null;
}

const initialState: AirportState = {
    airports: [],
    loading: false,
    error: null,
};

const airportSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
        fetchAirportsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAirportsSuccess: (state, action: PayloadAction<Airport[]>) => {
            state.airports = action.payload;
            state.loading = false;
        },
        fetchAirportsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateAirport: (state, action: PayloadAction<Airport>) => {
        },
        deleteAirport: (state, action: PayloadAction<number>) => {
            state.airports = state.airports.filter(airport => airport.id !== action.payload)
        },
        addAirport: (state, action: PayloadAction<Airport>) => {
            state.airports.push(action.payload);
        },
    },
});

export const {
    fetchAirportsStart,
    fetchAirportsSuccess,
    fetchAirportsFailure,
    updateAirport,
    deleteAirport,
    addAirport,
} = airportSlice.actions;

export default airportSlice.reducer;
