import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  org: null,
  token:  null,
  access: null,
  userID: null,
  status: 'idle',
  error: null,
};

// Thunk to handle login
export const loginUser = createAsyncThunk('user/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, loginData);
    return response.data;  // token, username, userAccess, filemakerId
  } catch (error) {
    // Ensure we capture meaningful error messages
    let errorMessage;
    if (error.response && error.response.data) {
      // This captures server-side errors
      errorMessage = error.response.data.message || "An unknown error occurred";
    } else {
      // This captures client-side errors like network issues
      errorMessage = error.message || "Something went wrong";
    }
    return rejectWithValue(errorMessage);  // Return the error as a string
  }
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.org = null || "";
      state.token = null || "";
      state.access = null || "";
      state.error = null || "";
      state.userID = null || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.org = action.payload.companyName;
        state.token = action.payload.token;
        state.access = action.payload.userAccess;
        state.userID = action.payload.filemakerId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
