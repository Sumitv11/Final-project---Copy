import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JwtResponse } from '../saga/loginsaga';
interface User {
  email: string,
  password: string
}
interface LoginState {
  user: User | null;
  errors: string
  isLoading: boolean;
  isSuccess: boolean;
  token: string;
  roles: string;
}
const initialState: LoginState = {
  user: null,
  errors: '',
  isLoading: false,
  isSuccess: false,
  token: '',
  roles: ''
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state: LoginState, action: PayloadAction<{ email: string; password: string }>) => {
    },
    loginSuccess: (state, action: PayloadAction<JwtResponse>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.roles = action.payload.roles;
      state.errors ='';
      localStorage.setItem('authToken', action?.payload?.jwtToken);
      localStorage.setItem('username',action.payload.username);
      localStorage.setItem('role', action.payload.roles)
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, loginUser } = loginSlice.actions;
export default loginSlice.reducer;

