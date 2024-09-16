import { all } from 'redux-saga/effects'
import loginSaga from './loginsaga'
import { watchRegisterUser } from './registersaga'
import watchcitySaga from './citysaga'
import watchairlineSaga from './airlinesaga'
import watchAirportSaga from './airportsaga'
import watchAircraftSaga from './aircraftsaga'
import watchFlightSaga from './flightsaga'



export default function* rootSaga() {
  yield all([watchRegisterUser(),
  loginSaga(),
  watchcitySaga(),
  watchairlineSaga(),
  watchAirportSaga(),
  watchAircraftSaga(),
  watchFlightSaga(),
])
}

