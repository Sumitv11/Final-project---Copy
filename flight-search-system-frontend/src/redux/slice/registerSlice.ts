import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface User {
  fullname: string
  email: string,
  password: string
}
interface RegisterState {
  user: User | null;
  errors: { [key: string]: string }
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: RegisterState = {
  user: null,
  errors: {},
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
      state.user = null;
      state.errors = {};
    },
    registerUser: (state: RegisterState, action: PayloadAction<{ fullName: string, email: string; password: string }>) => {
    },
    registerSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    },
    registerFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload;
      state.message = action.payload.message;
    },
  },
});

export const { reset, registerSuccess, registerFailure, registerUser } = registerSlice.actions;
export default registerSlice.reducer;

