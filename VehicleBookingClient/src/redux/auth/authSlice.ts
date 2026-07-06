import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { loginUser } from "./authThunk";

import type {
  AuthState,
  LoginResponse,
} from "../../types/authTypes";

const initialState: AuthState = {
  token: localStorage.getItem("token"),

  userId: localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId"))
    : null,

  name: localStorage.getItem("name"),

  email: localStorage.getItem("email"),

  role: (localStorage.getItem("role") as
    | "Admin"
    | "Customer"
    | null),

  isAuthenticated: !!localStorage.getItem("token"),

  loading: false,

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
   logout(state) {
    state.token = null;
    state.userId = null;
    state.name = null;
    state.email = null;
    state.role = null;
    state.isAuthenticated = false;

    localStorage.clear();
},
  },

  extraReducers(builder) {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

     .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;

    state.token = action.payload.token;
    state.userId = action.payload.userId;
    state.name = action.payload.name;
    state.email = action.payload.email;
    state.role = action.payload.role;

    state.isAuthenticated = true;

    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("userId", action.payload.userId.toString());
    localStorage.setItem("name", action.payload.name);
    localStorage.setItem("email", action.payload.email);
    localStorage.setItem("role", action.payload.role);
})

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ??
            "Login failed.";
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;