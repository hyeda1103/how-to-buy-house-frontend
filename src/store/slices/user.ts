import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import * as T from '../../types';

const resetUserAction = createAction('user/profile/reset');
const resetPasswordAction = createAction('password/reset');
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

// Profile
export const userProfileAction = createAsyncThunk(
  'user/profile',
  async (id: T.User['_id'], { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users/profile/${id}`,
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

// Follow
export const followUserAction = createAsyncThunk(
  'user/follow',
  async (userToFollowId: T.User['_id'], { rejectWithValue, getState, dispatch }) => {
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
        `${process.env.REACT_APP_BASE_URL}/api/users/follow`,
        { followId: userToFollowId },
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

// unFollow
export const unfollowUserAction = createAsyncThunk(
  'user/unfollow',
  async (unFollowId: T.User['_id'], { rejectWithValue, getState, dispatch }) => {
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
        `${process.env.REACT_APP_BASE_URL}/api/users/unfollow`,
        { unFollowId },
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

interface UserUpdate {
  name: T.User['name']
  email: T.User['email']
}

// Update action
export const updateUserAction = createAsyncThunk(
  'users/update',
  async (userInfo: UserUpdate, { rejectWithValue, getState, dispatch }) => {
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
        `${process.env.REACT_APP_BASE_URL}/api/users/${userAuth._id}`,
        {
          name: userInfo?.name,
          email: userInfo?.email,
        },
        config,
      );
      // dispatch
      dispatch(resetUserAction());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// Update Password
export const updatePasswordAction = createAsyncThunk(
  'password/update',
  async (password: T.User['password'], { rejectWithValue, getState, dispatch }) => {
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
        `${process.env.REACT_APP_BASE_URL}/api/users/password`,
        {
          password,
        },
        config,
      );
      // dispatch
      dispatch(resetPasswordAction());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// fetch User details
export const fetchUserDetailsAction = createAsyncThunk(
  'user/detail',
  async (id: T.User['_id'], { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`, config);
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// fetch all users
export const fetchUsersAction = createAsyncThunk(
  'user/list',
  async (id, { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`, config);
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// Block User
export const blockUserAction = createAsyncThunk(
  'user/block',
  async (id: T.User['_id'], { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/block/${id}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// unBlock User
export const unBlockUserAction = createAsyncThunk(
  'user/unblock',
  async (id: T.User['_id'], { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/unblock/${id}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem('userInfo');
      return null;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

interface UserProfile {
  image: any
}

// Upload Profile Photo
export const uploadProfilePhototAction = createAsyncThunk(
  'user/profile-photo',
  async (userImg: UserProfile, { rejectWithValue, getState, dispatch }) => {
    console.log(userImg);
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      // http call
      const formData = new FormData();

      formData.append('image', userImg?.image);

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/profile-photo`,
        formData,
        config,
      );
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// Password reset token generator
export const passwordResetTokenAction = createAsyncThunk(
  'password/token',
  async (email: T.User['email'], { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // http call
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/forget-password-token`,
        { email },
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

// Password reset
export const passwordResetAction = createAsyncThunk(
  'password/reset',
  async (user: Partial<T.User>, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // http call
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/reset-password`,
        { password: user?.password, token: user?.token },
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
  userAuth?: T.User;
  registered: T.UserRegister
  passwordToken: string
  passwordReset: any
  userDetails: any
  block: any
  unblock: any
  followed: any
  unFollowed: any
  unfollowLoading: boolean
  unFollowedError?: any
  usersList: Array<T.User>
  error?: string
  profileLoading: boolean
  profileError?: string
  isUpdated: boolean
  userUpdated: any
  isPasswordUpdated: boolean
  passwordUpdated: any
  profilePhoto: any
  profile: any
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
    // Password reset token generator
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordToken = action?.payload;
      state.error = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });

    // Password reset
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.error = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });

    // user details
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action?.error?.message;
    });

    // Block user
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.block = action?.payload;
      state.error = undefined;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action?.error?.message;
    });
    // unBlock user
    builder.addCase(unBlockUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unblock = action?.payload;
      state.error = undefined;
    });
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action?.error?.message;
    });
    // All Users
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action?.error?.message;
    });

    // user Follow
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.followed = action?.payload;
      state.unFollowed = undefined;
      state.error = undefined;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.loading = false;
      state.unFollowed = undefined;
      state.error = action?.error?.message;
    });

    // user unFollow
    builder.addCase(unfollowUserAction.pending, (state, action) => {
      state.unfollowLoading = true;
      state.unFollowedError = undefined;
    });
    builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowed = action?.payload;
      state.followed = undefined;
      state.unFollowedError = undefined;
    });
    builder.addCase(unfollowUserAction.rejected, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowedError = action?.error?.message;
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
      state.error = (action.payload as any).error || (action.payload as any).message;
    });
    // Profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.profileLoading = true;
      state.profileError = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.profileLoading = false;
      state.profileError = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.profileError = action?.error?.message;
      state.profileLoading = false;
    });

    // update
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(resetUserAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUpdated = action?.payload;
      state.isUpdated = false;
      state.error = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action?.error?.message;
    });
    // update password
    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(resetPasswordAction, (state, action) => {
      state.isPasswordUpdated = true;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordUpdated = action?.payload;
      state.isPasswordUpdated = false;
      state.error = undefined;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action?.error?.message;
    });

    // Upload Profile photo
    builder.addCase(uploadProfilePhototAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(uploadProfilePhototAction.fulfilled, (state, action) => {
      state.profilePhoto = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(uploadProfilePhototAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });
    // logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || (action.payload as any).message;
    });
  },
});

export default usersSlice.reducer;
