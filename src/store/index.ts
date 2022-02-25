import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './slices/user';
import accountVerificationReducer from './slices/accountVerification';
import categoriesReducer from './slices/category';
import postsReducer from './slices/post';
import commentsReducer from './slices/comment';

const store = configureStore({
  reducer: {
    auth: usersReducer,
    category: categoriesReducer,
    post: postsReducer,
    comment: commentsReducer,
    accountVerification: accountVerificationReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
