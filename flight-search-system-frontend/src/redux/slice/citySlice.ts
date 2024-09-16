import { City } from "@/pages/api/types/city";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CitiesState {
  cities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: null,
};

export const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    fetchCitiesStart: (state) => {
      state.error = null;
    },
    fetchCitiesSuccess: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
      state.loading = false;
    },
    fetchCitiesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCity: (state, action: PayloadAction<City>) => {
    },
    deleteCity: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
    },
    addCity: (state, action: PayloadAction<City>) => {
      state.cities.push(action.payload);
    },
  },
});

export const { fetchCitiesStart, fetchCitiesSuccess, fetchCitiesFailure
  , updateCity, deleteCity, addCity } = citySlice.actions;

export default citySlice.reducer;

