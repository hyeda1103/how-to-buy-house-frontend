import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './slices/user';
import categoriesReducer from './slices/category';
import postsReducer from './slices/post';
import commentsReducer from './slices/comment';

const store = configureStore({
  reducer: {
    auth: usersReducer,
    category: categoriesReducer,
    post: postsReducer,
    comment: commentsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
