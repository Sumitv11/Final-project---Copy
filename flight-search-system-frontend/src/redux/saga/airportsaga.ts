import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAirportsFailure,
    fetchAirportsStart,
    fetchAirportsSuccess,
    updateAirport,
    deleteAirport,
    addAirport
} from '../slice/airportSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Airport } from '@/pages/api/types/airport';
import getHeader from '@/pages/api/getHeader';
import { showSnackbar } from '../slice/snackbarSlice';
export interface MessageResponse {
    message: string,
    status: number,
}

function* fetchAirportsSaga() {
    try {
        const response: Response = yield call(async () => {
            return await fetch(`${process.env.API_URL}/airport/getAll`, {
                method: 'GET',
                headers: getHeader(),
            });
        });

        const data: Airport[] = yield response.json();
        yield put(fetchAirportsSuccess(data));
    } catch (error: any) {
        yield put(fetchAirportsFailure(error.message));
    }
}

function* updateAirportSaga(action: PayloadAction<Airport>) {
    try {
        const response: Response = yield call(async () => {
            return await fetch(`${process.env.API_URL}/airport/`, {
                method: 'PUT',
                headers: getHeader(),
                body: JSON.stringify(action.payload),
            });
        });

        const data: Airport[] = yield response.json();
        yield put(showSnackbar({ message: 'Updated successfully', severity: 'success' }));
        yield put(fetchAirportsSuccess(data));
    } catch (error: any) {
        yield put(fetchAirportsStart());
        yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
        yield put(fetchAirportsFailure(error.message));
    }
}

function* deleteAirportSaga(action: PayloadAction<number>) {
    try {
        const response: Response = yield call(async () => {
            const response = await fetch(`${process.env.API_URL}/airport/${action.payload}`, {
                method: 'DELETE',
                headers: getHeader(),
            });
            return response;
        });

        if (response.ok) {
            yield put(showSnackbar({ message: 'Deleted successfully', severity: 'success' }));
        }
        else {
            yield put(showSnackbar({ message: 'Cannot delete associated airports', severity: 'error' }));
        }
        yield put(fetchAirportsStart());
    } catch (error: any) {
        yield put(fetchAirportsStart());
        yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
        yield put(fetchAirportsFailure(error.message));
    }
}

function* addAirportSaga(action: PayloadAction<Airport>) {
    try {
        console.log(action.payload);
        const response: Response = yield call(async () => {
            const res = await fetch(`${process.env.API_URL}/airport/add`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(action.payload),
            });
            return res.json();
        });
       
        console.log(response);
        if (response) {
            yield put(showSnackbar({ message: 'Added successfully', severity: 'success' }));
        }
        else {
            yield put(showSnackbar({ message: 'Error in airports', severity: 'info' }));
        }
        yield put(fetchAirportsStart());
    } catch (error: any) {
        yield put(fetchAirportsStart());
        yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
        yield put(fetchAirportsFailure(error.message));
    }
}

export default function* watchAirportSaga() {
    yield takeLatest(fetchAirportsStart.type, fetchAirportsSaga);
    yield takeLatest(updateAirport.type, updateAirportSaga);
    yield takeLatest(deleteAirport.type, deleteAirportSaga);
    yield takeLatest(addAirport.type, addAirportSaga);
}
