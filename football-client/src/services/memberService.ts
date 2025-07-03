import api from "../apiClient";
import type { ApiResponse } from "../model/ApiResponse";

export type ChangePasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const changePassword = async (values : ChangePasswordValues): Promise<ApiResponse<null>> =>{
    const res = await api.post("/member/changePassword",values)
    return res.data;
}