import { configureStore } from '@reduxjs/toolkit';

import sportReducer from './slices/sports';

export const store = configureStore({
  reducer: { sports: sportReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
