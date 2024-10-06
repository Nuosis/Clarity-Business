import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice';  // Persisted slice
import themeReducer from './slices/themeSlice';
import { clarityApi } from '../pages/api/clarityApi';

// Persist config for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'username', 'userAccess', 'filemakerId'],  // Persist only auth state
  timeout: 86400000, // 1 day in milliseconds (24 hours)
};

// Apply persistReducer to auth slice only
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,  // Use persisted auth reducer
    theme: themeReducer,  // Non-persisted theme slice
    [clarityApi.reducerPath]: clarityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializable checks for Redux Persist
    }),
});

export const persistor = persistStore(store);
export default store;
