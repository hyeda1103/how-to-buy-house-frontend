import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { Category } from '../../types/category';

interface NewCategory {
  title: string
}

export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (category: NewCategory, { rejectWithValue, getState, dispatch }) => {
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

interface CategoryState {
  loading: boolean;
  category: NewCategory;
  categoryList: Array<Category>
  error?: string
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
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
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
  },
});

export default categorySlices.reducer;
