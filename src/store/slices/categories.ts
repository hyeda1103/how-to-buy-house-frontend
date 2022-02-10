import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import * as T from '../../types';

// action to redirect
const resetEditAction = createAction('category/reset');
const resetDeleteAction = createAction('category/delete-reset');
const resetCategoryAction = createAction('category/created-reset');

export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (category: { title: T.Category['title'] }, { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/category`,
        {
          title: category?.title,
        },
        config,
      );
      // disoatch action
      dispatch(resetCategoryAction());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

export const fetchCategoriesAction = createAsyncThunk(
  'category/fetch',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // get user token
    const user = (getState() as any)?.auth;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/category`,
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

// Update
export const updateCategoriesAction = createAsyncThunk(
  'category/update',
  async (
    category: { _id: T.Category['_id'], title: T.Category['title'] },
    { rejectWithValue, getState, dispatch },
  ) => {
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
        `${process.env.REACT_APP_BASE_URL}/api/category/${category?._id}`,
        { title: category?.title },
        config,
      );
      // dispatch ation to reset the updated data
      dispatch(resetEditAction());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// delete
export const deleteCategoriesAction = createAsyncThunk(
  'category/delete',
  async (id: string, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/category/${id}`,
        config,
      );
      // dispatch action
      dispatch(resetDeleteAction());
      return data;
    } catch (error) {
      if (!(error as AxiosError).response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

// fetch details
export const fetchCategoryAction = createAsyncThunk(
  'category/details',
  async (id: string, { rejectWithValue, getState, dispatch }) => {
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
        `${process.env.REACT_APP_BASE_URL}/api/category/${id}`,
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

interface CategoryState {
  loading: boolean;
  category: T.Category;
  categoryList: Array<T.Category>;
  error?: string;
  isCreated: boolean;
  isEdited: boolean;
  updateCategory: T.Category;
  isDeleted: boolean;
  deletedCategory: T.Category;
}

// slices
const categorySlices = createSlice({
  name: 'category',
  initialState: {} as CategoryState,
  reducers: {},
  extraReducers: (builder) => {
    // add new category
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    // dispatch action to redirect
    builder.addCase(resetCategoryAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = false;
      state.category = action.payload;
      state.error = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error;
    });
    // fetch all
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });
    // update
    builder.addCase(updateCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true;
    });
    builder.addCase(updateCategoriesAction.fulfilled, (state, action) => {
      state.updateCategory = action?.payload;
      state.isEdited = false;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(updateCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });
    // delete
    builder.addCase(deleteCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    // dispatch for redirect
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteCategoriesAction.fulfilled, (state, action) => {
      state.deletedCategory = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(deleteCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });
    // fetch details
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any).error || action?.error?.message;
    });
  },
});

export default categorySlices.reducer;
