import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import * as T from '../../types';

// Register Action

interface Register {
    name: string
    email: string
    password: string
}

export const registerAction = createAsyncThunk(
  'users/register',
  async (user: Register, { rejectWithValue, getState, dispatch }) => {
    try {
      // HTTP call
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/register`,
        user,
        config,
      );
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

interface Login {
  email: string
  password: string
}

export const loginAction = createAsyncThunk(
  'user/login',
  async (user: Login, { rejectWithValue, getState, dispatch }) => {
    try {
      // HTTP call
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/login`,
        user,
        config,
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// slices
interface UserState {
  loading: boolean;
  userAuth: any
  registered: T.User
  error?: string
}

// get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(`${localStorage.getItem('userInfo')}`)
  : null;

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userAuth: userLoginFromStorage,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action.payload;
      state.error = undefined;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error;
    });
    // login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error;
    });
  },
});

export default usersSlice.reducer;
