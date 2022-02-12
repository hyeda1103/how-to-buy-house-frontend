import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './slices/users';
import categoriesReducer from './slices/categories';
import postsReducer from './slices/posts';

const store = configureStore({
  reducer: {
    auth: usersReducer,
    category: categoriesReducer,
    post: postsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
