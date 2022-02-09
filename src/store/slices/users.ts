import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import * as T from '../../types';

// Register Action

interface User {
    name: string
    email: string
    password: string
}

export const registerAction = createAsyncThunk(
  'users/register',
  async (user: User, { rejectWithValue, getState, dispatch }) => {
    try {
      // HTTP call
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/users/register',
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

// slices
interface UserState {
  loading: boolean;
  userAuth: 'register' | 'login'
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
  },
});

export default usersSlice.reducer;
