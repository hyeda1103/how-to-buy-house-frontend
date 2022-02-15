import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import * as T from '../../types';

// action to redirect
const resetCommentAction = createAction('comment/reset');
// create
export const createCommentAction = createAsyncThunk(
  'comment/create',
  async (comment: T.CreateComment, { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = ((getState() as any) as any)?.auth;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // http call
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/comments`,
        {
          description: comment?.description,
          postId: comment?.postId,
        },
        config,
      );
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// delete
export const deleteCommentAction = createAsyncThunk(
  'comment/delete',
  async (commentId: T.Comment['id'], { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // http call
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/comments/${commentId}`,
        config,
      );
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// Update
export const updateCommentAction = createAsyncThunk(
  'comment/update',
  async (comment: T.Comment, { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // http call
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/comments/${comment?.id}`,
        { description: comment?.description },
        config,
      );
      // dispatch
      dispatch(resetCommentAction());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// fetch comment details
export const fetchCommentAction = createAsyncThunk(
  'comment/fetch-details',
  async (id: T.Comment['id'], { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // http call
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/comments/${id}`, config);
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

interface CommentState {
  loading: boolean
  commentCreated: any
  error?: string
  commentDeleted: any
  isUpdate: boolean
  commentUpdated: any
  commentDetails: any
}

const commentSlices = createSlice({
  name: 'comment',
  initialState: {} as CommentState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentCreated = action?.payload;
      state.error = undefined;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.error = (action.payload as any).error || (action.payload as any).message;
    });

    // delete
    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDeleted = action?.payload;
      state.error = undefined;
    });
    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.error = (action.payload as any).error || (action.payload as any).message;
    });

    // update
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetCommentAction, (state, action) => {
      state.isUpdate = true;
    });
    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentUpdated = action?.payload;
      state.isUpdate = false;
      state.error = undefined;
    });
    builder.addCase(updateCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.error = (action.payload as any).error || (action.payload as any).message;
    });

    // fetch details
    builder.addCase(fetchCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDetails = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.error = (action.payload as any).error || (action.payload as any).message;
    });
  },
});

export default commentSlices.reducer;
