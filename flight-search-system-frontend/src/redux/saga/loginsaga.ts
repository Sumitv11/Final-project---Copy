import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
import { loginFailure, loginSuccess, loginUser } from '../slice/loginSlice';
import Router from 'next/router';
import { showSnackbar } from '../slice/snackbarSlice';


export interface JwtResponse {
  jwtToken: string;
  username: string;
  roles: string;
}


function* loginUserSaga(action: PayloadAction<{ email: string, password: string }>) {
  try {
    const response: Response = yield call(async () => {
      return await fetch(`${process.env.AUTH_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload)
      })
    });

    const data: JwtResponse = yield response?.json();

    if (response.ok) {
      yield put(loginSuccess(data));
      yield put(showSnackbar({ message: 'Login successful!', severity: 'success' }));
      const userrole: string | null = localStorage.getItem("role");

      if (userrole !== null && userrole.match('ADMIN')) {
        Router.push("/adminhome");
      } else {
        Router.push("/flightSearchForm");
      }

    } else {
      Router.push("/login");
      yield put(showSnackbar({ message: 'Invalid email or password', severity: 'error' }));
      yield put(loginFailure('Invalid email or password'));
    }
  } catch (error: any) {
    yield put(showSnackbar({ message: 'An error occurred during login.', severity: 'error' }));
    yield put(loginFailure(error));
  }

}


export default function* loginSaga() {
  yield takeLatest(loginUser.type, loginUserSaga)

}




