import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './slices/users';

const store = configureStore({
  reducer: {
    auth: usersReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
