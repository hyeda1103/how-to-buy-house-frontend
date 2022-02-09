import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './slices/users';
import categoriesReducer from './slices/categories';

const store = configureStore({
  reducer: {
    auth: usersReducer,
    category: categoriesReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
