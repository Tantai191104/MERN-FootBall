import api from "../apiClient";
import type { ApiResponse } from "../model/ApiResponse";
import type {User} from "../stores/useAuthStore"
export type ChangePasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type editValues = {
  name: string | undefined;
  YOB: number | undefined;
};

export const changePassword = async (
  values: ChangePasswordValues
): Promise<ApiResponse<null>> => {
  const res = await api.post("/member/changePassword", values);
  return res.data;
};
export const changeProfile = async (
  values: editValues
): Promise<ApiResponse<User>> => {
  const res = await api.post("/member/changeProfile", values);
  return res.data;
};
