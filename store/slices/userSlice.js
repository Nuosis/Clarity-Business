import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clarityApi } from '@/services/clarity/clarityApi';

// AsyncThunk for fetching user data
export const fetchUser = createAsyncThunk('user/fetchUser', async ({ userID }, { rejectWithValue, dispatch }) => {
  try {
    // Directly use the findUser query from RTK Query
    const result = await dispatch(
      clarityApi.endpoints.findUser.initiate({ userID })
    ).unwrap();

    return result; // Return the fetched user data to be stored in state
  } catch (error) {
    return rejectWithValue(error.message || 'Error fetching user data');
  }
});

// Create a user slice for managing the user state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
