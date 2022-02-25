import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import * as T from '^/types';

// action for redirect
const resetAccountVerification = createAction('account/verify-reset');

// create verification token
export const accountVerificationSendTokenAction = createAsyncThunk(
  'account/token',
  async (email, { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // http call
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/generate-verification-token`,
        {},
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

// Verify Account
export const verifyAccountAction = createAsyncThunk(
  'account/verify',
  async (token: T.User['token'], { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // http call
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/verify-account`,
        { token },
        config,
      );
      // dispatch
      dispatch(resetAccountVerification());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

interface AccountVerificationState {
  loading: boolean;
  token: string;
  error?: string;
  verified: any;
  isVerified: boolean;
}

const accountVericationSlices = createSlice({
  name: 'account',
  initialState: {} as AccountVerificationState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(accountVerificationSendTokenAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      accountVerificationSendTokenAction.fulfilled,
      (state, action) => {
        state.token = action?.payload;
        state.loading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      accountVerificationSendTokenAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      },
    );

    // Verify account
    builder.addCase(verifyAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetAccountVerification, (state, action) => {
      state.isVerified = true;
    });
    builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
      state.verified = action?.payload;
      state.loading = false;
      state.isVerified = false;
      state.error = undefined;
    });
    builder.addCase(verifyAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });
  },
});

export default accountVericationSlices.reducer;
