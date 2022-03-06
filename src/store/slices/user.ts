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

// unfollow
export const unfollowUserAction = createAsyncThunk(
  'user/unfollow',
  async (unfollowId: T.User['_id'], { rejectWithValue, getState, dispatch }) => {
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
        { unfollowId },
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
        `${process.env.REACT_APP_BASE_URL}/api/users/generate-forgot-password-token`,
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
  async (newPassword: { password: string, token: string }, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // http call
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/reset-password`,
        newPassword,
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
  // common
  userAuth?: T.User;
  // register
  loadingRegister: boolean;
  errorRegister: string | undefined;
  registered: T.UserRegister
  // password reset token
  loadingPasswordResetToken: boolean;
  errorPasswordResetToken: string | undefined;
  passwordToken: string
  // password reset
  loadingPasswordReset: boolean;
  errorPasswordReset: string | undefined;
  passwordReset: any
  // user details
  loadingUserDetails: boolean;
  errorUserDetails: string | undefined;
  userDetails: T.User
  // block user
  loadingBlockUser: boolean;
  errorBlockUser: string | undefined;
  block: any
  // unblock user
  loadingUnblockUser: boolean;
  errorUnblockUser: string | undefined;
  unblock: any
  // all users
  loadingAllUsers: boolean;
  errorAllUsers: string | undefined;
  usersList: Array<T.User>
  // user follow & unfollow
  loadingFollow: boolean;
  errorFollow: string | undefined;
  loadingUnfollow: boolean;
  errorUnfollow: string | undefined;
  follow: any
  unfollow: any
  // login
  loadingLogin: boolean;
  errorLogin: string | undefined
  // profile
  loadingProfile: boolean;
  errorProfile: string | undefined;
  profile: any
  // update profile
  loadingUpdateUser: boolean;
  errorUpdateUser: string | undefined;
  isUpdated: boolean;
  userUpdated: T.User;
  // update password
  loadingUpdatePassword: boolean;
  errorUpdatePassword: string | undefined;
  isPasswordUpdated: boolean
  passwordUpdated: any
  // upload profile photo
  loadingUploadProfilePhoto: boolean;
  errorUploadProfilePhoto: string | undefined;
  profilePhoto: any
  // logout
  loadingLogout: boolean;
  errorLogout: string | undefined;
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
      state.loadingRegister = true;
      state.errorRegister = undefined;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loadingRegister = false;
      state.registered = action.payload;
      state.errorRegister = undefined;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loadingRegister = false;
      state.errorRegister = (action.payload as any).error;
    });
    // Password reset token generator
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loadingPasswordResetToken = true;
      state.errorPasswordResetToken = undefined;
    });
    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.loadingPasswordResetToken = false;
      state.passwordToken = action?.payload;
      state.errorPasswordResetToken = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loadingPasswordResetToken = false;
      state.errorPasswordResetToken = (action.payload as any).error;
    });
    // Password reset
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loadingPasswordReset = true;
      state.errorPasswordReset = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      console.log(`passwordReset: ${action.payload}`);
      state.loadingPasswordReset = false;
      state.passwordReset = action?.payload;
      state.errorPasswordReset = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loadingPasswordReset = false;
      state.errorPasswordReset = (action.payload as any).error;
    });
    // user details
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
      state.loadingUserDetails = true;
      state.errorUserDetails = undefined;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.loadingUserDetails = false;
      state.userDetails = action?.payload;
      state.errorUserDetails = undefined;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      state.loadingUserDetails = false;
      state.errorUserDetails = (action.payload as any).error;
    });
    // Block user
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loadingBlockUser = true;
      state.errorBlockUser = undefined;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.loadingBlockUser = false;
      state.block = action?.payload;
      state.errorBlockUser = undefined;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loadingBlockUser = false;
      state.errorBlockUser = action?.error?.message;
    });
    // unBlock user
    builder.addCase(unBlockUserAction.pending, (state, action) => {
      state.loadingUnblockUser = true;
      state.errorUnblockUser = undefined;
    });
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.loadingUnblockUser = false;
      state.unblock = action?.payload;
      state.errorUnblockUser = undefined;
    });
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loadingUnblockUser = false;
      state.errorUnblockUser = action?.error?.message;
    });
    // All Users
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.loadingAllUsers = true;
      state.errorAllUsers = undefined;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loadingAllUsers = false;
      state.usersList = action?.payload;
      state.errorAllUsers = undefined;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loadingAllUsers = false;
      state.errorAllUsers = action?.error?.message;
    });
    // user Follow
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loadingFollow = true;
      state.errorFollow = undefined;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.loadingFollow = false;
      state.follow = action?.payload;
      state.unfollow = undefined;
      state.errorFollow = undefined;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.loadingFollow = false;
      state.unfollow = undefined;
      state.errorFollow = action?.error?.message;
    });
    // user unfollow
    builder.addCase(unfollowUserAction.pending, (state, action) => {
      state.loadingUnfollow = true;
      state.errorUnfollow = undefined;
    });
    builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
      state.loadingUnfollow = false;
      state.unfollow = action?.payload;
      state.follow = undefined;
      state.errorUnfollow = undefined;
    });
    builder.addCase(unfollowUserAction.rejected, (state, action) => {
      state.loadingUnfollow = false;
      state.errorUnfollow = action?.error?.message;
    });
    // login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loadingLogin = true;
      state.errorLogin = undefined;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loadingLogin = false;
      state.errorLogin = undefined;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loadingLogin = false;
      state.errorLogin = (action.payload as any).error;
    });
    // Profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loadingProfile = true;
      state.errorProfile = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loadingProfile = false;
      state.errorProfile = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.loadingProfile = false;
      state.errorProfile = action?.error?.message;
    });
    // update profile
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loadingUpdateUser = true;
      state.errorUpdateUser = undefined;
    });
    builder.addCase(resetUserAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loadingUpdateUser = false;
      state.userUpdated = action?.payload;
      state.isUpdated = false;
      state.errorUpdateUser = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loadingUpdateUser = false;
      state.errorUpdateUser = action?.error?.message;
    });
    // update password
    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loadingUpdatePassword = true;
      state.errorUpdatePassword = undefined;
    });
    builder.addCase(resetPasswordAction, (state, action) => {
      state.isPasswordUpdated = true;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loadingUpdatePassword = false;
      state.passwordUpdated = action?.payload;
      state.isPasswordUpdated = false;
      state.errorUpdatePassword = undefined;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loadingUpdatePassword = false;
      state.errorUpdatePassword = action?.error?.message;
    });
    // Upload Profile photo
    builder.addCase(uploadProfilePhototAction.pending, (state, action) => {
      state.loadingUploadProfilePhoto = true;
      state.errorUploadProfilePhoto = undefined;
    });
    builder.addCase(uploadProfilePhototAction.fulfilled, (state, action) => {
      console.log(`profile photo: ${action.payload}`);
      state.loadingUploadProfilePhoto = false;
      state.errorUploadProfilePhoto = undefined;
      state.profilePhoto = action?.payload;
    });
    builder.addCase(uploadProfilePhototAction.rejected, (state, action) => {
      state.loadingUploadProfilePhoto = false;
      state.errorUploadProfilePhoto = action?.error?.message;
    });
    // logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loadingLogout = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loadingLogout = false;
      state.errorLogout = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loadingLogout = false;
      state.errorLogout = (action.payload as any).error || (action.payload as any).message;
    });
  },
});

export default usersSlice.reducer;
