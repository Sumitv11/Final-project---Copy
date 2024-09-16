import { call, put, takeLatest } from "redux-saga/effects";
import {
  addAircraft,
  deleteAircraft,
  fetchAircraftFailure,
  fetchAircraftStart,
  fetchAircraftSuccess,
  updateAircraft,
} from "../slice/aircraftSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Aircraft } from "@/pages/api/types/aircraft";
import getHeader from "@/pages/api/getHeader";
import { showSnackbar } from "../slice/snackbarSlice";

function* fetchAircraftSaga() {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.API_URL}/aircraft/getAll`, {
        method: 'GET',
        headers: getHeader(),
      });
    });

    const data: Aircraft[] = yield response.json();
    yield put(fetchAircraftSuccess(data));
  } catch (error: any) {
    yield put(fetchAircraftFailure(error.message));
  }
}

function* updateAircraftSaga(action: PayloadAction<{ id: number, model: string, capacity: number }>) {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.API_URL}/aircraft/`, {
        method: 'PUT',
        headers: getHeader(),
        body: JSON.stringify(action.payload),
      });
    });

    const data: Aircraft[] = yield response.json();
    yield put(showSnackbar({ message: 'Updated successfully', severity: 'success' }));
    yield put(fetchAircraftSuccess(data));
  } catch (error: any) {
    yield put(fetchAircraftStart());
    yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
    yield put(fetchAircraftFailure(error.message));
  }
}

function* deleteAircraftSaga(action: PayloadAction<number>) {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.API_URL}/aircraft/${action.payload}`, {
        method: 'DELETE',
        headers: getHeader(),
      });
    });

    if (response.ok) {
      yield put(showSnackbar({ message: 'Deleted successfully', severity: 'success' }));
    } else {
      yield put(showSnackbar({ message: 'Cannot delete associated aircraft', severity: 'error' }));
    }
    yield put(fetchAircraftStart());
  } catch (error: any) {
    yield put(fetchAircraftStart());
    yield put(fetchAircraftFailure(error.message));
    yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
  }
}

function* addAircraftSaga(action: PayloadAction<Aircraft>) {
  try {
    const response: Response = yield call(async () => {
      const res = await fetch(`${process.env.API_URL}/aircraft/add`, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(action.payload),
      });
      return res.json();
    });

    yield put(showSnackbar({ message: 'Added new aircraft', severity: 'success' }));
    yield put(fetchAircraftStart());
  } catch (error: any) {
    yield put(fetchAircraftStart());
    yield put(fetchAircraftFailure(error.message));
    yield put(showSnackbar({ message: 'Duplicate entries ', severity: 'error' }))

  }
}

export default function* watchAircraftSaga() {
  yield takeLatest(fetchAircraftStart.type, fetchAircraftSaga);
  yield takeLatest(updateAircraft.type, updateAircraftSaga);
  yield takeLatest(deleteAircraft.type, deleteAircraftSaga);
  yield takeLatest(addAircraft.type, addAircraftSaga);
}