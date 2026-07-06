import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginApi,
  registerApi,
} from "../../api/authApi";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../../types/authTypes";
import axios from "axios";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  {
    rejectValue: string;
  }
>(
  "auth/loginUser",

  async (request, thunkAPI) => {
    try {
      return await loginApi(request);
    } catch {
      return thunkAPI.rejectWithValue(
        "Invalid email or password."
      );
    }
  }
);

export const registerUser = createAsyncThunk<
  void,
  RegisterRequest,
  {
    rejectValue: string;
  }
>(
  "auth/registerUser",

  async (request, thunkAPI) => {
    try {
      await registerApi(request);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          typeof error.response?.data === "string"
            ? error.response.data
            : "Registration failed."
        );
      }

      return thunkAPI.rejectWithValue(
        "Registration failed."
      );
    }
  }
);