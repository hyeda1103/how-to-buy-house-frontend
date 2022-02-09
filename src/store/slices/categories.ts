import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '..';

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

interface CategoryState {
  loading: boolean;
  category: NewCategory;
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
  },
});

export default categorySlices.reducer;
