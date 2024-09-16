import { call, put, takeLatest } from "redux-saga/effects";
import { addCity, deleteCity, fetchCitiesFailure, fetchCitiesStart, fetchCitiesSuccess, updateCity } from "../slice/citySlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { addAirline, deleteAirline, fetchAirlinesFailure, fetchAirlinesStart, fetchAirlinesSuccess, updateAirline } from "../slice/airlineSlice";
import { Airline } from "@/pages/api/types/airline";
import getHeader from "@/pages/api/getHeader";
import { showSnackbar } from "../slice/snackbarSlice";


function* fetchAirlinesSaga() {
    try {
        const response: Response = yield call(async () => {
            return await fetch(`${process.env.API_URL}/airline/getAll`, {
                method: 'GET',
                headers: getHeader(),
            });
        });


        const data: Airline[] = yield response.json();
        yield put(fetchAirlinesSuccess(data));
    } catch (error: any) {
        yield put(fetchCitiesFailure(error.message));
    }
}


function* updateAirlinesSaga(action: PayloadAction<{ id: number, name: string, code: string, country: string }>) {
    try {
        const response: Response = yield call(async () => {
            return await fetch(`${process.env.API_URL}/airline/`, {
                method: 'PUT',
                headers: getHeader(),
                body: JSON.stringify(action.payload),
            });
        });

        const data: Airline[] = yield response.json();
        yield put(showSnackbar({ message: 'Updated successfully', severity: 'success' }));
        yield put(fetchAirlinesSuccess(data));
    } catch (error: any) {
        yield put(fetchAirlinesStart());
        yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
        yield put(fetchAirlinesFailure(error.message));
    }
}

function* deleteAirlinesSaga(action: PayloadAction<number>) {
    try {
        const response:  Response =   yield call(async () => {
        //    return await fetch(`http://localhost:8081/api/admin/airline/${action.payload}`, {
           return await fetch(`${process.env.API_URL}/airline/${action.payload}`, {
                method: 'DELETE',
                headers: getHeader(),
            });
        });
        if(response.ok){
        yield put(showSnackbar({ message: 'Deleted successfully', severity: 'success' }));
        }else{
            yield put(showSnackbar({ message: 'Cannot delete associated airline', severity: 'error' }));
        }
        yield put(fetchAirlinesStart());
    } catch (error: any) {
        yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
        yield put(fetchAirlinesStart());
        yield put(fetchAirlinesFailure(error.message));
    }
}


function* addAirlineSaga(action: PayloadAction<Airline>) {
    try {
        const response: Response = yield call(async () => {
            const res = await fetch(`${process.env.API_URL}/airline/add`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(action.payload),
            });
            return res.json();
        });
        yield put(showSnackbar({ message: 'Added successfully', severity: 'success' }));
        yield put(fetchAirlinesStart());
    } catch (error: any) {
        yield put(showSnackbar({ message: 'Something went wrong', severity: 'error' }));
        yield put(fetchAirlinesStart());
        yield put(fetchAirlinesFailure(error.message));
    }
}

export default function* watchairlineSaga() {
    yield takeLatest(fetchAirlinesStart.type, fetchAirlinesSaga);
    yield takeLatest(updateAirline.type, updateAirlinesSaga);
    yield takeLatest(deleteAirline.type, deleteAirlinesSaga);
    yield takeLatest(addAirline.type, addAirlineSaga);
}


