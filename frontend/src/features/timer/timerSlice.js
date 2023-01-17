import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionSeconds: 25 * 60,
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakFrequency: 4,
  workSessionCounter: 0,
  currentMode: 'work'
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    switchMode: ({ currentMode }) => {
      currentMode = currentMode === 'work' ? 'break' : 'work';
    },
    getTimerMinutes: ({
      currentMode,
      sessionSeconds,
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      workSessionCounter
    }) => {
      if (currentMode === 'work') sessionSeconds = workMinutes;
      else if (currentMode === 'break' && workSessionCounter < 4) {
        workSessionCounter++;
        sessionSeconds = shortBreakMinutes * 60;
      } else {
        workSessionCounter = 0;
        sessionSeconds = longBreakMinutes * 60;
      }
    }
  }
});

export const { switchMode, getTimerMinutes } = timerSlice.actions;
export default timerSlice.reducer;
