export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
  role: "Admin" | "Customer";
}

export interface AuthState {
  token: string | null;
  userId: number | null;
  name: string | null;
  email: string | null;
  role: "Admin" | "Customer" | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}