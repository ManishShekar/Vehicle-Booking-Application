import axiosClient from "./axiosClient";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/authTypes";

export const loginApi = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response =
    await axiosClient.post<LoginResponse>(
      "/Auth/login",
      request
    );

  return response.data;
};

export const registerApi = async (
  request: RegisterRequest
): Promise<void> => {
  await axiosClient.post(
    "/Auth/register",
    request
  );
};