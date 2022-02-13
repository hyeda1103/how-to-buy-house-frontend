import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import * as T from '../../types';

// Create Post action

// action to redirect
const resetPost = createAction('category/reset');
const resetPostEdit = createAction('post/reset');
const resetPostDelete = createAction('post/delete');

// Create
export const createPostAction = createAsyncThunk(
  'post/created',
  async (post: T.PostCreate, { rejectWithValue, getState, dispatch }) => {
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
      formData.append('title', post?.title);
      formData.append('description', post?.description);
      formData.append('category', post?.category);
      formData.append('image', post?.image);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/posts`,
        formData,
        config,
      );
      // dispatch action
      dispatch(resetPost());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// Update
export const updatePostAction = createAsyncThunk(
  'post/updated',
  async (post: T.PostCreate, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/posts/${post?._id}`,
        post,
        config,
      );
      // dispatch
      dispatch(resetPostEdit());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// Delete
export const deletePostAction = createAsyncThunk(
  'post/delete',
  async (postId: T.Post['_id'], { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/posts/${postId}`,
        config,
      );
      // dispatch
      dispatch(resetPostDelete());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// fetch all posts
export const fetchPostsAction = createAsyncThunk(
  'post/list',
  async (category: T.Category['title'], { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/posts?category=${category}`,
      );
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);
// fetch Post details
export const fetchPostDetailsAction = createAsyncThunk(
  'post/detail',
  async (id: T.Post['_id'], { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/posts/${id}`);
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// Add Likes to post
export const toggleAddLikesToPost = createAsyncThunk(
  'post/like',
  async (postId: T.Post['_id'], { rejectWithValue, getState, dispatch }) => {
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
        `${process.env.REACT_APP_BASE_URL}/api/posts/likes`,
        { postId },
        config,
      );

      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// Add DisLikes to post
export const toggleAddDisLikesToPost = createAsyncThunk(
  'post/dislike',
  async (postId: T.Post['_id'], { rejectWithValue, getState, dispatch }) => {
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
        `${process.env.REACT_APP_BASE_URL}/api/posts/dislikes`,
        { postId },
        config,
      );

      return data;
    } catch (error) {
      if (!(error as AxiosError).response) throw error;
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

interface PostState {
  loading: boolean;
  isCreated: boolean;
  postCreated: any;
  error?: string;
  isUpdated: boolean;
  postUpdated: boolean;
  isDeleted: boolean;
  postList: Array<T.Post>;
  postDetails: T.Post;
  likes: Array<string>;
  dislikes: Array<string>;
}

// slice
const postSlice = createSlice({
  name: 'post',
  initialState: {} as PostState,
  reducers: {},
  extraReducers: (builder) => {
    // create post
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload;
      state.loading = false;
      state.isCreated = false;
      state.error = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });

    // Update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostEdit, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.loading = false;
      state.error = undefined;
      state.isUpdated = false;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });

    // Delete post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostDelete, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });

    // fetch posts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postList = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });

    // fetch post Details
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });
    // Likes
    builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
      state.likes = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });
    // DisLikes
    builder.addCase(toggleAddDisLikesToPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action) => {
      state.dislikes = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(toggleAddDisLikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });
  },
});

export default postSlice.reducer;
