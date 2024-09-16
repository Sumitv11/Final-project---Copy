import { Aircraft } from "@/pages/api/types/aircraft";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AircraftState {
  aircraft: Aircraft[]; 
  loading: boolean;
  error: string | null;
}

const initialState: AircraftState = {
  aircraft: [],
  loading: false,
  error: null,
};

export const aircraftSlice = createSlice({
  name: 'aircrafts',
  initialState,
  reducers: {
    fetchAircraftStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAircraftSuccess: (state, action: PayloadAction<Aircraft[]>) => {
      state.aircraft = action.payload;
      state.loading = false;
    },
    fetchAircraftFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAircraft: (state, action: PayloadAction<Aircraft>) => {
    },

    deleteAircraft: (state, action: PayloadAction<number>) => {
      state.aircraft = state.aircraft.filter(aircraft => aircraft.id !== action.payload);
    },
    addAircraft: (state, action: PayloadAction<Aircraft>) => {
      state.aircraft.push(action.payload);
    },
  },
});
 
export const { fetchAircraftStart, fetchAircraftSuccess, fetchAircraftFailure,
     updateAircraft, deleteAircraft, addAircraft  } = aircraftSlice.actions;

export default aircraftSlice.reducer;