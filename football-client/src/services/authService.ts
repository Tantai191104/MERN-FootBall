import api from "../apiClient";
import type { ApiResponse } from "../model/ApiResponse";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  GoogleLoginPayload,
} from "../model/AuthTypes";

export const login = async (
  data: LoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  const res = await api.post("/auth/signIn", data);
  return res.data;
};

export const register = async (
  data: RegisterPayload
): Promise<ApiResponse<null>> => {
  const res = await api.post<ApiResponse<null>>("/auth/signUp", data);
  return res.data;
};

export const loginGoogle = async (
  data: GoogleLoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  const res = await api.post("/auth/google", data);
  return res.data;
};
