import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import forecastReducer from './forecastSlice';

export const store: EnhancedStore = configureStore( {
  reducer: {
    forecast: forecastReducer,
  },
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
