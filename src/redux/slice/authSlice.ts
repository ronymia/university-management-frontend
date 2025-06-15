import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    permission: [],
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.userLogin.matchFulfilled,
      (state, action) => {
        console.log({ payload: action.payload });
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.permission = action.payload.permission;
      }
    );
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
