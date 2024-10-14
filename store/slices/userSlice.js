import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clarityApi } from '@/services/clarity/clarityApi';

export const fetchUser = createAsyncThunk('user/fetchUser', async ({ userID, token }, { rejectWithValue, dispatch }) => {
  try {
    console.log("fetchUser called...",userID,token)
    // Call the RTK Query service directly
    const result = await dispatch(
      clarityApi.endpoints.findUser.initiate({ userID, token })
    ).unwrap(); // Unwraps the result to handle success/error

    return result; // Return the fetched user data to be stored in state
  } catch (error) {
    return rejectWithValue(error.message || 'Error fetching user data');
  }
});

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
