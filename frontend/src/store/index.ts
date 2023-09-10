import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import filterReducer from '@/store/filters';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
