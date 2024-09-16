import { combineReducers } from 'redux';
import registerReducer from './slice/registerSlice'
import loginReducer from './slice/loginSlice'
import cityReducer from './slice/citySlice'
import airlineSlice from './slice/airlineSlice';
import airportSlice from './slice/airportSlice';
import  aircraftSlice  from './slice/aircraftSlice';
import flightSlice from './slice/flightSlice';
import snackbarSlice from './slice/snackbarSlice';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  city: cityReducer,
  airline: airlineSlice,
  airport: airportSlice,
  aircraft: aircraftSlice,
  flight :flightSlice,
  snackbar:snackbarSlice,
});

export default rootReducer;
