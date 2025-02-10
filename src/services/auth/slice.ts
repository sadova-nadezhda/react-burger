import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthError } from '../../types/UserTypes';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: AuthError;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthChecked: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<AuthError>) {
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.isAuthChecked = true;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthChecked = true;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { setLoading, setError, setUser, logout, setAuthChecked } = authSlice.actions;

export default authSlice.reducer;
