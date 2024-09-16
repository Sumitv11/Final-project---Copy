import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { registerSuccess, registerFailure, registerUser } from '../slice/registerSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import Router from 'next/router';
import { showSnackbar } from '../slice/snackbarSlice';

function* registerUserSaga(action: PayloadAction<{ fullName: string, email: string, password: string }>) {
  interface MessageResponse {
    message: string,
  }
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.AUTH_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.payload)
      })

    });

    if (response.ok) {
      yield put(registerSuccess("Success"));
      yield put(showSnackbar({ message: 'Registration successful!', severity: 'success' }));
      Router.push("/login");

    } else {
      yield put(showSnackbar({ message: 'Email already in use !!', severity: 'error' }));
      yield put(registerFailure({ message: 'Email already in use !!' }));
    }
  } catch (error: any) {
    yield put(showSnackbar({ message: error, severity: 'error' }));
    yield put(registerFailure({ message: error }));
  }

}


export function* watchRegisterUser() {
  yield takeLatest(registerUser, registerUserSaga)
}
