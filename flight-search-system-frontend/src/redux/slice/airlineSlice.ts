import { Airline } from "@/pages/api/types/airline";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

  
  interface AirlinesState {
    airlines: Airline[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: AirlinesState = {
    airlines: [],
    loading: false,
    error: null,
  };
  
  export const airlineSlice = createSlice({
    name: 'airlines',
    initialState,
    reducers: {
      fetchAirlinesStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchAirlinesSuccess: (state, action: PayloadAction<Airline[]>) => {
        state.airlines =action.payload;
        state.loading = false;
        state.airlines = action.payload;
      },
      fetchAirlinesFailure: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateAirline: (state, action: PayloadAction<Airline>) => {
       
      },
      deleteAirline: (state, action: PayloadAction<number>) => {
        state.airlines = state.airlines.filter(airline => airline.id !== action.payload);
      },
      addAirline: (state, action: PayloadAction<Airline>) => {
        state.airlines.push(action.payload);
      },
    },
  });
  
  export const { fetchAirlinesStart, fetchAirlinesSuccess, fetchAirlinesFailure 
    ,updateAirline ,deleteAirline ,addAirline} = airlineSlice.actions;
  
  export default airlineSlice.reducer;
  
  