import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice';  // Persisted slice
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import { clarityApi } from '../services/clarity/clarityApi';

// Persist config for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'org', 'access', 'userID'],  // Persist only auth state
  timeout: 86400000, // 1 day in milliseconds (24 hours)
};

// Apply persistReducer to auth slice only
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: persistedAuthReducer,  // Use persisted auth reducer
    theme: themeReducer,  // Non-persisted theme slice
    user: userReducer,
    [clarityApi.reducerPath]: clarityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializable checks for Redux Persist
    }),
});

export const persistor = persistStore(store);
export default store;
