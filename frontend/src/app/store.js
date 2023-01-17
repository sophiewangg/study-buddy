import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import timerReducer from '../features/timer/timerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    timer: timerReducer
  }
});
