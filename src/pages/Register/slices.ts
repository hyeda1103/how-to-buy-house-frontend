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
      return rejectWithValue((error as AxiosError)?.response?.data.reason);
    }
  },
);

// slices
interface UserState {
  loading: boolean;
  userAuth: 'register' | 'login'
  registered: T.User
  appErr?: string
  serverErr?: any
}

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userAuth: 'login',
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = (action.payload as any);
      state.serverErr = action.payload;
    });
  },
});

export default usersSlice.reducer;
