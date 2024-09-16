import { call, put, takeLatest } from "redux-saga/effects";
import {
  addFlight,
  deleteFlight,
  fetchFlightFailure,
  fetchFlightStart,
  fetchFlightSuccess,
  filterFlightStart,
  updateFlight,
} from "../slice/flightSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "@/pages/api/types/flight";
import getHeader from "@/pages/api/getHeader";
import { showSnackbar } from "../slice/snackbarSlice";
import { FlightFilterDto } from "@/pages/api/types/flightFilterDto";

function* fetchFlightSaga() {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.API_URL}/flight/getAll`, {
        method: 'GET',
        headers: getHeader(),
      });
    });

    const data: Flight[] = yield response.json();
    yield put(fetchFlightSuccess(data));
  } catch (error: any) {
    yield put(fetchFlightFailure(error.message));
  }
}


function* updateFlightSaga(action: PayloadAction<Flight>) {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.API_URL}/flight`, {
        method: 'PUT',
        headers: getHeader(),
        body: JSON.stringify(action.payload),
      });
    });

    const data: Flight[] = yield response.json();
    yield put(fetchFlightSuccess(data));
    yield put(showSnackbar({ message: 'Updated successfully', severity: 'success' }));
  } catch (error: any) {
    yield put(fetchFlightFailure(error.message));
    yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
  }
}

function* deleteFlightSaga(action: PayloadAction<number>) {
  try {
    yield call(async () => {
      await fetch(`${process.env.API_URL}/flight/${action.payload}`, {
        method: 'DELETE',
        headers: getHeader(),
      });
    });

    yield put(fetchFlightStart());
    yield put(showSnackbar({ message: 'Deleted successfully', severity: 'success' }));
  } catch (error: any) {
    yield put(fetchFlightStart());
    yield put(fetchFlightFailure(error.message));
    yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
  }
}

function* addFlightSaga(action: PayloadAction<Flight>) {
  try {
    const response: Response = yield call(async () => {
      const res = await fetch(`${process.env.API_URL}/flight/add`, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(action.payload),
      });
      return res;
    });
    if (response.ok) {
      yield put(showSnackbar({ message: 'Added successfully', severity: 'success' }));
      yield put(fetchFlightStart());
    }
    yield put(fetchFlightStart());
    
  } catch (error: any) {
    yield put(fetchFlightFailure(error.message));
    yield put(fetchFlightStart());
  
    yield put(showSnackbar({ message: 'Something went wrong' + error, severity: 'error' }));
  }
}


function* filterFlightsSaga(action: PayloadAction<FlightFilterDto>) {
  try { 
    
    const response:Response = yield call(async () => {
      const res = await fetch(`${process.env.API_URL}/flight/search`, {
        method: 'POST', 
        headers: getHeader(),
        body: JSON.stringify(action.payload), 
      });
      return res;
    });
    if (response.ok) {
      yield put(showSnackbar({ message: 'fetch successfully', severity: 'success' }));
      const data: Flight[] = yield response.json()
      yield put(fetchFlightSuccess(data));
    }
  } catch (error: any) {
    yield put(showSnackbar({ message: 'Something went wrong'+error, severity: 'error' }));
    yield put(fetchFlightFailure(error.message));
    yield put(fetchFlightStart());
  }
}


export default function* watchFlightSaga() {
  yield takeLatest(fetchFlightStart.type, fetchFlightSaga);
  yield takeLatest(updateFlight.type, updateFlightSaga);
  yield takeLatest(deleteFlight.type, deleteFlightSaga);
  yield takeLatest(addFlight.type, addFlightSaga);
  yield takeLatest(filterFlightStart.type, filterFlightsSaga);
}
