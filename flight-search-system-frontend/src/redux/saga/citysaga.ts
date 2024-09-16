import { call, put, takeLatest } from "redux-saga/effects";
import { addCity, deleteCity, fetchCitiesFailure, fetchCitiesStart, fetchCitiesSuccess, updateCity } from "../slice/citySlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { City } from "@/pages/api/types/city";
import getHeader from "@/pages/api/getHeader";
import { showSnackbar } from "../slice/snackbarSlice";



function* fetchCitiesSaga() {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.API_URL}/city/getAll`, {
        method: 'GET',
        headers: getHeader(),
      });
    });


    const data: City[] = yield response.json();
    yield put(fetchCitiesSuccess(data));
  } catch (error: any) {
    yield put(fetchCitiesFailure(error.message));
  }
}


function* updateCitySaga(action: PayloadAction<{ id: number, name: string, code: string, country: string }>) {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.API_URL}/city/`, {
        method: 'PUT',
        headers: getHeader(),
        body: JSON.stringify(action.payload),
      });
    });


    const data: City[] = yield response.json();
    yield put(fetchCitiesSuccess(data));
    yield put(showSnackbar({ message: 'Updated successfully', severity: 'success' }));
    yield put(fetchCitiesStart());
  } catch (error: any) {
    yield put(fetchCitiesStart());
    yield put(fetchCitiesFailure(error.message));
    yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
  }
}

function* deleteCitySaga(action: PayloadAction<number>) {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.API_URL}/city/${action.payload}`, {
        method: 'DELETE',
        headers: getHeader(),
      });
    });
    if (response.ok) {
      yield put(showSnackbar({ message: 'Deleted successfully', severity: 'success' }));
    } else {
      yield put(showSnackbar({ message: 'Cannot delete associated city', severity: 'error' }));
    }
    yield put(fetchCitiesStart());
  } catch (error: any) {
    yield put(fetchCitiesStart());
    yield put(fetchCitiesFailure(error.message));
    yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
  }
}


function* addCitySaga(action: PayloadAction<City>) {
  try {
    const response: Response = yield call(async () => {
      const res = await fetch(`${process.env.API_URL}/city/add`, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(action.payload),
      });
      return res;
    });
    if (response.ok) {
      yield put(showSnackbar({ message: 'Added successfully', severity: 'success' }));
    } else {
      yield put(showSnackbar({ message: 'Error in city', severity: 'warning' }));
    }
    yield put(fetchCitiesStart());
  } 
  catch (error: any) {
    yield put(fetchCitiesFailure(error.message));
    yield put(fetchCitiesStart());
    yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
  }
}

export default function* watchcitySaga() {
  yield takeLatest(fetchCitiesStart.type, fetchCitiesSaga);
  yield takeLatest(updateCity.type, updateCitySaga);
  yield takeLatest(deleteCity.type, deleteCitySaga);
  yield takeLatest(addCity.type, addCitySaga);
}


