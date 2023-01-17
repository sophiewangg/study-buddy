import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

//create new goal
export const createGoalDB = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.createGoalDB(goalData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//get user goals
export const getGoalsDB = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoalsDB(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//update user goal
export const updateGoalDB = createAsyncThunk(
  'goals/update',
  async ({ goalId, goalData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.updateGoalDB(goalId, goalData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete a goal
export const deleteGoalDB = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.deleteGoalDB(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoalDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoalDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoalDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoalsDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoalsDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoalsDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGoalDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoalDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.map((goal) =>
          goal.id === action.payload.id ? { ...goal, text: action.payload } : goal
        );
      })
      .addCase(updateGoalDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoalDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoalDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
      })
      .addCase(deleteGoalDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
